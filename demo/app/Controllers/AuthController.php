<?php

namespace App\Controllers;

use App\Libraries\GoogleAuthenticator;
use App\Services\PermissionService;

class AuthController extends BaseController
{
    // How many wrong passwords before lockout, and for how long
    protected int $maxAttempts     = 500;
    protected int $lockoutMinutes  = 150;

    // How many wrong 2FA codes before0 we cancel the login
    protected int $max2faAttempts  = 5;

    // ================= LOGIN PAGE =================
    public function login()
    {
        if (session()->get('logged_in')) {
            return redirect()->to('/dashboard');
        }

        return view('site/auth/login');
    }

    // ================= ATTEMPT LOGIN =================
    public function attempt()
    {
        $email    = trim((string) $this->request->getPost('email'));
        $password = (string) $this->request->getPost('password');

        // ================= VALIDATION =================
        if (empty($email) || empty($password)) {
            return redirect()->back()->withInput()->with('error', 'Email and password are required');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return redirect()->back()->withInput()->with('error', 'Invalid email format');
        }

        $db = db_connect();

        // ================= USER + ROLE =================
        $user = $db->table('tbl_users u')
            ->select('u.*, r.name as role_name')
            ->join('tbl_roles r', 'r.role_id = u.role_id', 'left')
            ->where('u.email', $email)
            ->get()
            ->getRowArray();

        if (!$user) {
            audit_log('LOGIN_FAILED', 'auth', 'Login failed (unknown email): ' . $email);
            return redirect()->back()->withInput()->with('error', 'Invalid credentials');
        }

        // ================= LOCKOUT CHECK =================
        if (!empty($user['locked_until']) && strtotime($user['locked_until']) > time()) {
            $minutes = (int) ceil((strtotime($user['locked_until']) - time()) / 60);
            audit_log('LOGIN_BLOCKED', 'auth', 'Login blocked (account locked): ' . $email, $user['user_id']);
            return redirect()->back()->withInput()
                ->with('error', "Account temporarily locked. Try again in {$minutes} minute(s).");
        }

        // ================= PASSWORD =================
        if (!password_verify($password, (string) $user['password'])) {

            $attempts = (int) $user['failed_attempts'] + 1;
            $update   = ['failed_attempts' => $attempts];

            if ($attempts >= $this->maxAttempts) {
                $update['locked_until']    = date('Y-m-d H:i:s', time() + ($this->lockoutMinutes * 60));
                $update['failed_attempts'] = 0;
            }

            $db->table('tbl_users')->where('user_id', $user['user_id'])->update($update);

            audit_log('LOGIN_FAILED', 'auth', "Wrong password for {$email} (attempt {$attempts})", $user['user_id']);

            return redirect()->back()->withInput()->with('error', 'Invalid credentials');
        }

        // ================= STATUS =================
        if (!$user['is_active']) {
            audit_log('LOGIN_BLOCKED', 'auth', 'Login blocked (inactive account): ' . $email, $user['user_id']);
            return redirect()->back()->with('error', 'Account is inactive');
        }

        // ================= RESET FAILED ATTEMPTS =================
        $db->table('tbl_users')->where('user_id', $user['user_id'])->update([
            'failed_attempts' => 0,
            'locked_until'    => null,
        ]);

        // ================= 2FA STEP =================
        if (!empty($user['twofa_enabled']) && !empty($user['twofa_secret'])) {
            session()->set([
                '2fa_pending_user' => $user['user_id'],
                '2fa_attempts'     => 0,
            ]);

            return redirect()->to('/2fa');
        }

        // ================= NO 2FA → LOGIN COMPLETE =================
        return $this->completeLogin($user);
    }

    // ================= 2FA CODE PAGE =================
    public function twoFa()
    {
        if (!session()->get('2fa_pending_user')) {
            return redirect()->to('/login');
        }

        return view('site/auth/twofa');
    }

    // ================= 2FA VERIFY =================
    public function twoFaVerify()
    {
        $pendingUserId = session()->get('2fa_pending_user');

        if (!$pendingUserId) {
            return redirect()->to('/login');
        }

        $code = trim((string) $this->request->getPost('code'));

        $db   = db_connect();
        $user = $db->table('tbl_users u')
            ->select('u.*, r.name as role_name')
            ->join('tbl_roles r', 'r.role_id = u.role_id', 'left')
            ->where('u.user_id', $pendingUserId)
            ->get()
            ->getRowArray();

        if (!$user || empty($user['twofa_secret'])) {
            session()->remove(['2fa_pending_user', '2fa_attempts']);
            return redirect()->to('/login')->with('error', 'Session expired. Please login again.');
        }

        $ga = new GoogleAuthenticator();

        if (!$ga->verifyCode($user['twofa_secret'], $code)) {

            $attempts = (int) session()->get('2fa_attempts') + 1;
            session()->set('2fa_attempts', $attempts);

            audit_log('2FA_FAILED', 'auth', "Wrong 2FA code for {$user['email']} (attempt {$attempts})", $user['user_id']);

            if ($attempts >= $this->max2faAttempts) {
                session()->remove(['2fa_pending_user', '2fa_attempts']);
                return redirect()->to('/login')->with('error', 'Too many wrong codes. Please login again.');
            }

            return redirect()->back()->with('error', 'Invalid code. Please try again.');
        }

        // ================= 2FA OK =================
        session()->remove(['2fa_pending_user', '2fa_attempts']);

        return $this->completeLogin($user);
    }

    // ================= COMPLETE LOGIN (shared) =================
    protected function completeLogin(array $user)
    {
        session()->regenerate();

        PermissionService::buildSession($user);

        // Track last login
        db_connect()->table('tbl_users')->where('user_id', $user['user_id'])->update([
            'last_login'    => date('Y-m-d H:i:s'),
            'last_login_ip' => $this->request->getIPAddress(),
        ]);

        audit_log('LOGIN', 'auth', 'User logged in: ' . $user['email'], $user['user_id']);

        return redirect()->to('/dashboard')->with('success', 'Welcome back');
    }

    // ================= LOGOUT =================
    public function logout()
    {
        if (session()->get('user_id')) {
            audit_log('LOGOUT', 'auth', 'User logged out: ' . session()->get('email'), session()->get('user_id'));
        }

        session()->destroy();
        return redirect()->to('/login')->with('success', 'Logged out successfully');
    }

    // ================================================================
    //  2FA SETUP (for the logged-in user: /security/2fa)
    // ================================================================

    // ================= SETUP PAGE =================
    public function twoFaSetup()
    {
        $db   = db_connect();
        $user = $db->table('tbl_users')->where('user_id', session('user_id'))->get()->getRowArray();

        if (!$user) {
            return redirect()->to('/dashboard');
        }

        // Already enabled → show status / disable option
        if (!empty($user['twofa_enabled'])) {
            return view('site/auth/twofa_setup', [
                'enabled' => true,
                'secret'  => null,
                'qrUri'   => null,
            ]);
        }

        // Generate a fresh secret (kept in session until confirmed)
        $ga     = new GoogleAuthenticator();
        $secret = session()->get('2fa_setup_secret');

        if (!$secret) {
            $secret = $ga->createSecret();
            session()->set('2fa_setup_secret', $secret);
        }

        return view('site/auth/twofa_setup', [
            'enabled' => false,
            'secret'  => $secret,
            'qrUri'   => $ga->getQrUri($user['email'], $secret, 'AfyaMap'),
        ]);
    }

    // ================= ENABLE 2FA =================
    public function twoFaEnable()
    {
        $secret = session()->get('2fa_setup_secret');
        $code   = trim((string) $this->request->getPost('code'));

        if (!$secret) {
            return redirect()->to('/security/2fa')->with('error', 'Setup expired. Please try again.');
        }

        $ga = new GoogleAuthenticator();

        if (!$ga->verifyCode($secret, $code)) {
            return redirect()->back()->with('error', 'Invalid code. Scan the QR again and enter the current code.');
        }

        db_connect()->table('tbl_users')->where('user_id', session('user_id'))->update([
            'twofa_secret'  => $secret,
            'twofa_enabled' => 1,
        ]);

        session()->remove('2fa_setup_secret');

        audit_log('2FA_ENABLED', 'auth', 'User enabled Google Authenticator', session('user_id'));

        return redirect()->to('/security/2fa')->with('success', 'Two-factor authentication enabled successfully');
    }

    // ================= DISABLE 2FA =================
    public function twoFaDisable()
    {
        $password = (string) $this->request->getPost('password');

        $db   = db_connect();
        $user = $db->table('tbl_users')->where('user_id', session('user_id'))->get()->getRowArray();

        if (!$user || !password_verify($password, (string) $user['password'])) {
            return redirect()->back()->with('error', 'Wrong password. 2FA was NOT disabled.');
        }

        $db->table('tbl_users')->where('user_id', session('user_id'))->update([
            'twofa_secret'  => null,
            'twofa_enabled' => 0,
        ]);

        audit_log('2FA_DISABLED', 'auth', 'User disabled Google Authenticator', session('user_id'));

        return redirect()->to('/security/2fa')->with('success', 'Two-factor authentication disabled');
    }

    // ================= LIVE PERMISSION REFRESH =================
    public function refreshPermissions()
    {
        if (!session()->get('logged_in')) {
            return $this->response->setJSON(['status' => 'unauthorized']);
        }

        $db = db_connect();

        $user = $db->table('tbl_users u')
            ->select('u.*, r.name as role_name')
            ->join('tbl_roles r', 'r.role_id = u.role_id', 'left')
            ->where('u.user_id', session('user_id'))
            ->get()
            ->getRowArray();

        if (!$user) {
            return $this->response->setJSON(['status' => 'error']);
        }

        PermissionService::buildSession($user);

        return $this->response->setJSON(['status' => 'ok']);
    }
}
