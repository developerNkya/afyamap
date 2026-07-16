<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    protected $table      = 'tbl_facilities';
    protected $primaryKey = 'facility_id';
    public    $timestamps = false;   // demo table uses created_at only (no updated_at)
    protected $guarded    = [];

    // ── Relationships ─────────────────────────────────────────────────────
    public function category()
    {
        return $this->belongsTo(FacilityCategory::class, 'category_id', 'category_id');
    }

    public function region()
    {
        return $this->belongsTo(Region::class, 'region_id', 'region_id');
    }

    public function district()
    {
        return $this->belongsTo(District::class, 'district_id', 'district_id');
    }

    public function facilityServices()
    {
        return $this->hasMany(FacilityService::class, 'facility_id', 'facility_id');
    }

    public function facilityInsurances()
    {
        return $this->hasMany(FacilityInsurance::class, 'facility_id', 'facility_id');
    }

    public function images()
    {
        return $this->hasMany(FacilityImage::class, 'facility_id', 'facility_id')
                    ->where('status', 1)
                    ->orderBy('sort_order');
    }
}
