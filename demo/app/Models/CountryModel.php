<?php

namespace App\Models;

use CodeIgniter\Model;

class CountryModel extends Model
{
    protected $table      = 'tbl_countries';
    protected $primaryKey = 'country_id';

    protected $allowedFields = [
        'name',
        'code',
        'status'
    ];

    protected $useTimestamps = false;

    public function getActive()
    {
        return $this->where('status', 1)->orderBy('name', 'ASC')->findAll();
    }
}