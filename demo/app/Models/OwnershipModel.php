<?php

namespace App\Models;

use CodeIgniter\Model;

class OwnershipModel extends Model
{
    protected $table      = 'tbl_ownership_types';
    protected $primaryKey = 'ownership_id';

    protected $returnType     = 'array';
    protected $useSoftDeletes = false;

    protected $allowedFields = [
        'name',
        'description',
        'status'
    ];

    protected $useTimestamps = false;

    // ================= CUSTOM METHODS =================

    /**
     * Get all active ownership types
     */
    public function getActive()
    {
        return $this->where('status', 1)
            ->orderBy('name', 'ASC')
            ->findAll();
    }

    /**
     * Get all ownership types
     */
    public function getAll()
    {
        return $this->orderBy('ownership_id', 'DESC')
            ->findAll();
    }

    /**
     * Toggle status (Active/Inactive)
     */
    public function toggleStatus($id)
    {
        $item = $this->find($id);

        if (!$item) {
            return false;
        }

        return $this->update($id, [
            'status' => $item['status'] ? 0 : 1
        ]);
    }
}