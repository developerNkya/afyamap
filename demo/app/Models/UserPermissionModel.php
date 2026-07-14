<?php

namespace App\Models;

use CodeIgniter\Model;

class UserPermissionModel extends Model
{
    protected $table = 'tbl_user_permissions';

    protected $allowedFields = [
        'user_id',
        'permission_id',
        'action'
    ];

    public function syncPermissions($user_id, $permissions)
    {
        $db = db_connect();
        $db->transStart();

        // Clear existing
        $this->where('user_id', $user_id)->delete();

        if (!empty($permissions)) {
            foreach ($permissions as $permission_id => $action) {
                $this->insert([
                    'user_id'       => $user_id,
                    'permission_id' => $permission_id,
                    'action'        => $action
                ]);
            }
        }

        $db->transComplete();
    }
}