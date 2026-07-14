<?php

namespace App\Services;

/**
 * ============================================================
 * AUDIT SERVICE
 * ============================================================
 * Central place to write audit logs.
 *
 * Two ways logs get written:
 * 1. Explicitly: audit_log('LOGIN', 'auth', 'User logged in')
 * 2. Automatically: AuditFilter logs every state-changing
 *    request (POST / PUT / DELETE / delete / toggle URLs)
 *    unless an explicit log was already written this request.
 */
class AuditService
{
    /** Set to true when an explicit log was written this request */
    public static bool $alreadyLogged = false;

    /** Keys stripped from logged payloads */
    protected const SENSITIVE_KEYS = [
        'password', 'password_confirm', 'confirm_password',
        'current_password', 'new_password', 'twofa_secret', 'code',
    ];

    // ================= WRITE LOG =================
    public static function log(
        string $action,
        ?string $module = null,
        ?string $description = null,
        $recordId = null,
        $oldData = null,
        $newData = null
    ): void {
        try {
            $request = service('request');
            $session = session();

            $db = db_connect();
            $db->table('tbl_audit_logs')->insert([
                'user_id'     => $session->get('user_id') ?: null,
                'user_name'   => $session->get('name') ?: null,
                'action'      => strtoupper($action),
                'table_name'  => $module,
                'record_id'   => is_numeric($recordId) ? (int) $recordId : null,
                'description' => $description,
                'old_data'    => self::encode($oldData),
                'new_data'    => self::encode($newData),
                'method'      => $request->getMethod() ? strtoupper($request->getMethod()) : null,
                'url'         => substr((string) current_url(), 0, 255),
                'ip_address'  => $request->getIPAddress(),
                'user_agent'  => substr((string) $request->getUserAgent(), 0, 255),
                'created_at'  => date('Y-m-d H:i:s'),
            ]);

            self::$alreadyLogged = true;
        } catch (\Throwable $e) {
            // Audit failures must NEVER break the app
            log_message('error', 'Audit log failed: ' . $e->getMessage());
        }
    }

    // ================= SANITIZE PAYLOAD =================
    public static function sanitize($data): ?array
    {
        if (!is_array($data) || empty($data)) {
            return null;
        }

        foreach ($data as $key => $value) {
            $lower = strtolower((string) $key);

            if (in_array($lower, self::SENSITIVE_KEYS, true)
                || str_contains($lower, 'password')
                || str_contains($lower, 'csrf')
                || str_contains($lower, 'token')
            ) {
                $data[$key] = '******';
            }
        }

        return $data;
    }

    // ================= ENCODE =================
    protected static function encode($data): ?string
    {
        if ($data === null || $data === '' || $data === []) {
            return null;
        }

        if (is_array($data)) {
            return json_encode(self::sanitize($data), JSON_UNESCAPED_UNICODE);
        }

        return (string) $data;
    }
}
