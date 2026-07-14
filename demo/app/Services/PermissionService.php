<?php

namespace App\Services;

class PermissionService
{
    public static function buildSession($user)
    {
        $db = db_connect();

        // ================= ROLE PERMISSIONS =================
        $rolePermissions = $db->table('tbl_role_permissions rp')
            ->select('p.slug')
            ->join('tbl_permissions p', 'p.permission_id = rp.permission_id')
            ->where('rp.role_id', $user['role_id'])
            ->where('p.status', 1)
            ->get()
            ->getResultArray();

        $rolePermissions = array_column($rolePermissions, 'slug');


        // ================= USER OVERRIDES =================
        $userOverrides = $db->table('tbl_user_permissions')
            ->where('user_id', $user['user_id'])
            ->get()
            ->getResultArray();

        $userPermissions = [];

        foreach ($userOverrides as $row) {
            $userPermissions[$row['permission_id']] = $row['action'];
        }


        // ================= PERMISSION MAP =================
        $permissions = $db->table('tbl_permissions')
            ->select('permission_id, slug')
            ->where('status', 1)
            ->get()
            ->getResultArray();

        $permissionMap = [];

        foreach ($permissions as $p) {
            $permissionMap[$p['slug']] = $p['permission_id'];
        }


        // ================= SAVE SESSION =================
        session()->set([
            'user_id'          => $user['user_id'],
            'name'             => $user['name'],
            'email'            => $user['email'],
            'role_id'          => $user['role_id'],
            'role_name'        => $user['role_name'] ?? '',
            'logged_in'        => true,

            'role_permissions' => $rolePermissions,
            'user_permissions' => $userPermissions,
            'permission_map'   => $permissionMap
        ]);
    }
}