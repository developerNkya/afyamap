<?php

namespace App\Models;

use CodeIgniter\Model;

class FacilityModel extends Model
{
    protected $table      = 'tbl_facilities';
    protected $primaryKey = 'facility_id';

    protected $allowedFields = [
        'name',
        'category_id',
        'level_id',
        'ownership_id',
        'country_id',
        'region_id',
        'district_id',
        'street',
        'address',
        'latitude',
        'longitude',
        'phone',
        'email',
        'website',
        'opening_hours',
        'logo',
        'status',
        'service_level_rating',
        'is_accredited',
        'safecare_level',
        'average_rating',
        'is_emergency',
        'opening_days',
        'close_time',
        'open_time'
    ];

    protected $useTimestamps = true;

    /*
    |--------------------------------------------------------------------------
    | GET ALL WITH RELATIONS
    |--------------------------------------------------------------------------
    */
    public function getAll()
    {
        return $this->select('
            tbl_facilities.*,
            tbl_facility_categories.name as category_name,
            tbl_countries.name as country_name,
            tbl_regions.name as region_name
        ')
            ->join('tbl_facility_categories', 'tbl_facility_categories.category_id = tbl_facilities.category_id', 'left')
            ->join('tbl_countries', 'tbl_countries.country_id = tbl_facilities.country_id', 'left')
            ->join('tbl_regions', 'tbl_regions.region_id = tbl_facilities.region_id', 'left')
            ->orderBy('tbl_facilities.facility_id', 'DESC')
            ->findAll();
    }

    /*
    |--------------------------------------------------------------------------
    | GET SINGLE
    |--------------------------------------------------------------------------
    */
    public function getById($id)
    {
        return $this->where('facility_id', $id)->first();
    }
}