<?php

namespace App\Models;

use CodeIgniter\Model;

class PermissionModel extends Model
{
    protected $table      = 'tbl_permissions';
    protected $primaryKey = 'permission_id';

    protected $allowedFields = [
        'block_id',
        'name',
        'slug',
        'description',
        'status'
    ];

    protected $useTimestamps = false;

    // ================= GROUPED (USED BY UI) =================
    public function getGrouped()
    {
        $db = db_connect();

        // Get all blocks
        $blocks = $db->table('tbl_permission_blocks')
            ->orderBy('block_id', 'ASC')
            ->get()
            ->getResultArray();

        // Attach permissions to each block
        foreach ($blocks as &$block) {
            $block['permissions'] = $this->where('block_id', $block['block_id'])
                ->orderBy('permission_id', 'ASC')
                ->findAll();
        }

        return $blocks;
    }

    // ================= CHECK SLUG =================
    public function existsBySlug($slug)
    {
        return $this->where('slug', $slug)->first();
    }

    // ================= GET BY BLOCK =================
    public function getByBlock($block_id)
    {
        return $this->where('block_id', $block_id)
            ->findAll();
    }
}