<?php

namespace App\Models;

use CodeIgniter\Model;

class RegionModel extends Model
{
    protected $table      = 'tbl_regions';
    protected $primaryKey = 'region_id';

    protected $allowedFields = [
        'country_id',
        'name',
        'status'
    ];

    protected $useTimestamps = false;

    public function getByCountry($country_id)
    {
        return $this->where('country_id', $country_id)
            ->where('status', 1)
            ->orderBy('name', 'ASC')
            ->findAll();
    }
}