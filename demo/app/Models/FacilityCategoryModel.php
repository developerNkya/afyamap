<?php

namespace App\Models;

use CodeIgniter\Model;

class FacilityCategoryModel extends Model
{
    protected $table = 'tbl_facility_categories';
    protected $primaryKey = 'category_id';

    protected $allowedFields = [
        'name',
        'description',
        'icon',
        'status',
        'created_at',
        'updated_at'
    ];

    protected $useTimestamps = true;

    public function getAll()
    {
        return $this->orderBy('category_id', 'DESC')->findAll();
    }
}