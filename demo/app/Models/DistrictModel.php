<?php

namespace App\Models;

use CodeIgniter\Model;

class DistrictModel extends Model
{
    protected $table      = 'tbl_districts';
    protected $primaryKey = 'district_id';

    protected $allowedFields = [
        'region_id',
        'name',
        'status'
    ];

    protected $useTimestamps = false;

    public function getByRegion($region_id)
    {
        return $this->where('region_id', $region_id)
            ->where('status', 1)
            ->orderBy('name', 'ASC')
            ->findAll();
    }
}