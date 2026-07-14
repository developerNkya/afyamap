<?php

namespace App\Models;

use CodeIgniter\Model;

class PermissionBlockModel extends Model
{
    protected $table      = 'tbl_permission_blocks';
    protected $primaryKey = 'block_id';

    protected $allowedFields = [
        'name',
        'block_key',
        'description',
        'status'
    ];

    protected $useTimestamps = false;

    // ================= GET ALL =================
    public function getAll()
    {
        return $this->orderBy('block_id', 'ASC')->findAll();
    }

    // ================= GET ACTIVE =================
    public function getActive()
    {
        return $this->where('status', 1)
            ->orderBy('block_id', 'ASC')
            ->findAll();
    }

    // ================= FIND BY KEY =================
    public function findByKey($key)
    {
        return $this->where('block_key', $key)->first();
    }

    // ================= CHECK KEY EXISTS =================
    public function existsByKey($key)
    {
        return $this->where('block_key', $key)->first();
    }

    // ================= SAFE DELETE =================
    public function safeDelete($id)
    {
        // Prevent deleting block if it has permissions
        $db = db_connect();

        $hasPermissions = $db->table('tbl_permissions')
            ->where('block_id', $id)
            ->countAllResults();

        if ($hasPermissions > 0) {
            return false;
        }

        return $this->delete($id);
    }

    // ================= TOGGLE STATUS =================
    public function toggleStatus($id)
    {
        $block = $this->find($id);

        if (!$block) {
            return false;
        }

        return $this->update($id, [
            'status' => $block['status'] ? 0 : 1
        ]);
    }
}