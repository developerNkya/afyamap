<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\RoleModel;

class UserController extends BaseController
{
    protected $userModel;
    protected $roleModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
        $this->roleModel = new RoleModel();
    }

    // ================= LIST =================
    public function index()
    {
        $users = $this->userModel
            ->select('tbl_users.*, tbl_roles.name as role_name')
            ->join('tbl_roles', 'tbl_roles.role_id = tbl_users.role_id', 'left')
            ->orderBy('tbl_users.user_id', 'DESC')
            ->findAll();

        return view('site/users/index', compact('users'));
    }

    // ================= CREATE =================
    public function create()
    {
        $roles = $this->roleModel
            ->where('status', 1)
            ->orderBy('name', 'ASC')
            ->findAll();

        return view('site/users/create', compact('roles'));
    }

    // ================= STORE =================
    public function store()
    {
        $data = $this->request->getPost();

        // BASIC VALIDATION
        if (empty($data['name']) || empty($data['email']) || empty($data['password']) || empty($data['role_id'])) {
            return redirect()->back()->withInput()->with('error', 'All required fields must be filled');
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return redirect()->back()->withInput()->with('error', 'Invalid email format');
        }

        // PASSWORD STRENGTH
        if (strlen($data['password']) < 8) {
            return redirect()->back()->withInput()->with('error', 'Password must be at least 8 characters');
        }

        // UNIQUE EMAIL
        if ($this->userModel->where('email', $data['email'])->first()) {
            return redirect()->back()->withInput()->with('error', 'Email already exists');
        }

        $newId = $this->userModel->insert([
            'username'   => strtolower(trim($data['email'])),
            'name'       => trim($data['name']),
            'email'      => trim($data['email']),
            'phone'      => $data['phone'] ?? null,
            'password'   => password_hash($data['password'], PASSWORD_DEFAULT),
            'role_id'    => (int) $data['role_id'],
            'is_active'  => 1,
            'created_by' => session('user_id'),
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        audit_log('CREATE', 'users', 'Created user: ' . trim($data['email']), $newId, null, [
            'name'    => $data['name'],
            'email'   => $data['email'],
            'phone'   => $data['phone'] ?? null,
            'role_id' => $data['role_id'],
        ]);

        return redirect()->to('users')->with('success', 'User created successfully');
    }

    // ================= EDIT =================
    public function edit($id)
    {
        $user = $this->userModel
            ->select('tbl_users.*, tbl_roles.name as role_name')
            ->join('tbl_roles', 'tbl_roles.role_id = tbl_users.role_id', 'left')
            ->find($id);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $roles = $this->roleModel
            ->where('status', 1)
            ->orderBy('name', 'ASC')
            ->findAll();

        return view('site/users/edit', compact('user', 'roles'));
    }

    // ================= UPDATE =================
    public function update($id)
    {
        $user = $this->userModel->find($id);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $data = $this->request->getPost();

        if (empty($data['name']) || empty($data['email']) || empty($data['role_id'])) {
            return redirect()->back()->withInput()->with('error', 'Required fields are missing');
        }

        // CHECK EMAIL CHANGE
        $exists = $this->userModel
            ->where('email', $data['email'])
            ->where('user_id !=', $id)
            ->first();

        if ($exists) {
            return redirect()->back()->withInput()->with('error', 'Email already exists');
        }

        $update = [
            'name'       => trim($data['name']),
            'email'      => trim($data['email']),
            'phone'      => $data['phone'] ?? null,
            'role_id'    => (int) $data['role_id'],
            'updated_by' => session('user_id'),
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        // PASSWORD OPTIONAL
        if (!empty($data['password'])) {
            if (strlen($data['password']) < 8) {
                return redirect()->back()->withInput()->with('error', 'Password must be at least 8 characters');
            }
            $update['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        }

        $this->userModel->update($id, $update);

        audit_log(
            'UPDATE',
            'users',
            'Updated user: ' . $user['email'] . (!empty($data['password']) ? ' (password changed)' : ''),
            $id,
            ['name' => $user['name'], 'email' => $user['email'], 'phone' => $user['phone'], 'role_id' => $user['role_id']],
            ['name' => $data['name'], 'email' => $data['email'], 'phone' => $data['phone'] ?? null, 'role_id' => $data['role_id']]
        );

        return redirect()->to('users')->with('success', 'User updated successfully');
    }

    // ================= TOGGLE =================
    public function toggle($id)
    {
        $user = $this->userModel->find($id);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $newStatus = $user['is_active'] ? 0 : 1;

        $this->userModel->update($id, ['is_active' => $newStatus]);

        audit_log(
            'TOGGLE',
            'users',
            ($newStatus ? 'Activated' : 'Deactivated') . ' user: ' . $user['email'],
            $id
        );

        return redirect()->back()->with('success', 'User status updated');
    }

    // ================= RESET 2FA (ADMIN) =================
    // Use this when a user loses their phone / authenticator app.
    public function resetTwoFa($id)
    {
        $user = $this->userModel->find($id);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        $this->userModel->update($id, [
            'twofa_secret'  => null,
            'twofa_enabled' => 0,
        ]);

        audit_log('2FA_RESET', 'users', 'Admin reset 2FA for user: ' . $user['email'], $id);

        return redirect()->back()->with('success', '2FA has been reset. The user can set it up again from Security settings.');
    }
}
