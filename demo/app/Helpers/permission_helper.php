<?php

/**
 * ============================================================
 * PERMISSION HELPER (RBAC + USER OVERRIDES)
 * ============================================================
 *
 * Priority:
 * 1. User override (allow / deny)
 * 2. Role permission
 * 3. Default = deny
 *
 * Session structure expected:
 *
 * 'role_permissions' => ['view_users', 'create_user']
 * 'user_permissions' => [ permission_id => 'allow' | 'deny' ]
 * 'permission_map'   => [ 'view_users' => 1, 'create_user' => 2 ]
 *
 */


/**
 * ============================================================
 * MAIN CHECK
 * ============================================================
 */
if (!function_exists('hasPermission')) {

    function hasPermission(string $permissionKey): bool
    {
        $session = session();

        // Not logged in
        if (!$session->get('user_id')) {
            return false;
        }

        // Get session data safely
        $rolePermissions = (array) $session->get('role_permissions');
        $userPermissions = (array) $session->get('user_permissions');
        $permissionMap   = (array) $session->get('permission_map');

        // Permission not defined in system
        if (!isset($permissionMap[$permissionKey])) {
            return false;
        }

        $permissionId = $permissionMap[$permissionKey];

        // ---------------------------------------------------
        // PRIORITY 1: USER OVERRIDE
        // ---------------------------------------------------
        if (array_key_exists($permissionId, $userPermissions)) {

            if ($userPermissions[$permissionId] === 'deny') {
                return false;
            }

            if ($userPermissions[$permissionId] === 'allow') {
                return true;
            }
        }

        // ---------------------------------------------------
        // PRIORITY 2: ROLE PERMISSION
        // ---------------------------------------------------
        if (in_array($permissionKey, $rolePermissions, true)) {
            return true;
        }

        // ---------------------------------------------------
        // DEFAULT: DENY
        // ---------------------------------------------------
        return false;
    }
}


/**
 * ============================================================
 * ALIAS (cleaner usage)
 * ============================================================
 */
if (!function_exists('can')) {
    function can(string $permissionKey): bool
    {
        return hasPermission($permissionKey);
    }
}


/**
 * ============================================================
 * NEGATION
 * ============================================================
 */
if (!function_exists('cannot')) {
    function cannot(string $permissionKey): bool
    {
        return !hasPermission($permissionKey);
    }
}


/**
 * ============================================================
 * CHECK ANY PERMISSION
 * ============================================================
 */
if (!function_exists('hasAnyPermission')) {

    function hasAnyPermission(array $permissions): bool
    {
        foreach ($permissions as $perm) {
            if (hasPermission($perm)) {
                return true;
            }
        }
        return false;
    }
}


/**
 * ============================================================
 * CHECK ALL PERMISSIONS
 * ============================================================
 */
if (!function_exists('hasAllPermissions')) {

    function hasAllPermissions(array $permissions): bool
    {
        foreach ($permissions as $perm) {
            if (!hasPermission($perm)) {
                return false;
            }
        }
        return true;
    }
}


/**
 * ============================================================
 * DEBUG HELPER (optional)
 * ============================================================
 */
if (!function_exists('debugPermissions')) {

    function debugPermissions(): array
    {
        $session = session();

        return [
            'user_id'          => $session->get('user_id'),
            'role_permissions' => $session->get('role_permissions'),
            'user_permissions' => $session->get('user_permissions'),
            'permission_map'   => $session->get('permission_map'),
        ];
    }
}