<?php

use App\Services\AuditService;

/**
 * ============================================================
 * AUDIT HELPER
 * ============================================================
 * Usage anywhere in the app:
 *
 *   audit_log('CREATE', 'users', 'Created user John', $userId, null, $postData);
 *   audit_log('DELETE', 'facilities', 'Deleted facility XYZ', $id, $oldRow);
 *   audit_log('LOGIN',  'auth', 'User logged in');
 */
if (!function_exists('audit_log')) {

    function audit_log(
        string $action,
        ?string $module = null,
        ?string $description = null,
        $recordId = null,
        $oldData = null,
        $newData = null
    ): void {
        AuditService::log($action, $module, $description, $recordId, $oldData, $newData);
    }
}
