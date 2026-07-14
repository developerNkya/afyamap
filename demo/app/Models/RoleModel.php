<?php

namespace App\Models;

use CodeIgniter\Model;

class RoleModel extends Model
{
    protected $table      = 'tbl_roles';
    protected $primaryKey = 'role_id';

    protected $allowedFields = [
        'name',
        'status'
    ];

    protected $useTimestamps = false;

    // ================= GET ALL =================
    public function getAll()
    {
        return $this->orderBy('role_id', 'DESC')->findAll();
    }

    // ================= GET ACTIVE =================
    public function getActive()
    {
        return $this->where('status', 1)
            ->orderBy('name', 'ASC')
            ->findAll();
    }

    // ================= CHECK EXIST =================
    public function existsByName($name)
    {
        return $this->where('name', $name)->first();
    }

    // ================= SAFE DELETE =================
    public function safeDelete($id)
    {
        // OPTIONAL: prevent deleting roles assigned to users
        // You can enable this when user-role relation exists

        // Example:
        // $userExists = db_connect()->table('tbl_users')
        //     ->where('role_id', $id)
        //     ->countAllResults();

        // if ($userExists > 0) {
        //     return false;
        // }

        return $this->delete($id);
    }

    // ================= TOGGLE STATUS =================
    public function toggleStatus($id)
    {
        $role = $this->find($id);

        if (!$role) {
            return false;
        }

        return $this->update($id, [
            'status' => $role['status'] ? 0 : 1
        ]);
    }
}