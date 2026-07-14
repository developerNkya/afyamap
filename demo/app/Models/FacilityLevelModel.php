<?php

namespace App\Models;

use CodeIgniter\Model;

class FacilityLevelModel extends Model
{
    protected $table = 'tbl_facility_levels';
    protected $primaryKey = 'level_id';

    protected $allowedFields = [
        'name',
        'description',
        'rank_order',
        'status'
    ];

    public function getAll()
    {
        return $this->orderBy('rank_order', 'ASC')->findAll();
    }
}