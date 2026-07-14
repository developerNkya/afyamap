<?php

namespace App\Models;

use CodeIgniter\Model;

class RolePermissionModel extends Model
{
    protected $table      = 'tbl_role_permissions';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'role_id',
        'permission_id'
    ];

    protected $useTimestamps = false;

    // ================= GET RAW =================
    public function getByRole($role_id)
    {
        return $this->where('role_id', $role_id)->findAll();
    }

    // ================= GET IDS (USED IN CHECKBOX UI) =================
    public function getPermissionIds($role_id)
    {
        $rows = $this->where('role_id', $role_id)
            ->select('permission_id')
            ->findAll();

        if (empty($rows)) {
            return [];
        }

        return array_column($rows, 'permission_id');
    }

    // ================= SYNC (IMPORTANT) =================
    public function syncPermissions($role_id, $permissions)
    {
        $db = db_connect();
        $db->transStart();

        // Delete old
        $this->where('role_id', $role_id)->delete();

        // Insert new
        if (!empty($permissions)) {
            foreach ($permissions as $permission_id) {
                $this->insert([
                    'role_id'       => $role_id,
                    'permission_id' => $permission_id
                ]);
            }
        }

        $db->transComplete();

        return $db->transStatus();
    }
}