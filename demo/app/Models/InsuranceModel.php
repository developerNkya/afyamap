<?php

namespace App\Models;

use CodeIgniter\Model;

class InsuranceModel extends Model
{
    protected $table = 'tbl_insurances';
    protected $primaryKey = 'insurance_id';

    protected $allowedFields = [
        'name',
        'short_code',
        'icon',
        'description',
        'status'
    ];

    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    protected $returnType = 'array';

    /**
     * Get all
     */
    public function getAll()
    {
        return $this->orderBy('insurance_id', 'DESC')->findAll();
    }

    /**
     * Active only (status = 1)
     */
    public function getActive()
    {
        return $this->where('status', 1)
            ->orderBy('name', 'ASC')
            ->findAll();
    }

    /**
     * Inactive only (status = 0)
     */
    public function getInactive()
    {
        return $this->where('status', 0)->findAll();
    }

    /**
     * Toggle status (clean and reusable)
     */
    public function toggleStatus($id)
    {
        $insurance = $this->find($id);

        if (!$insurance) return false;

        $newStatus = ($insurance['status'] == 1) ? 0 : 1;

        return $this->update($id, ['status' => $newStatus]);
    }
}