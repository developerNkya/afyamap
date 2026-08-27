<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Facility extends Model
{
    use SoftDeletes;

    protected $table      = 'tbl_facilities';
    protected $primaryKey = 'facility_id';
    public    $timestamps = false;
    protected $guarded    = [];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    // ── Scopes ──────────────────────────────────────────────────────────────

    /**
     * Scope a query to only include active (non-deleted) facilities.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 1)->whereNull('deleted_at');
    }

    // ── Relationships ─────────────────────────────────────────────────────

    /**
     * Get the category that owns the facility.
     */
    public function category()
    {
        return $this->belongsTo(FacilityCategory::class, 'category_id', 'category_id');
    }

    /**
     * Get the region that owns the facility.
     */
    public function region()
    {
        return $this->belongsTo(Region::class, 'region_id', 'region_id');
    }

    /**
     * Get the district that owns the facility.
     */
    public function district()
    {
        return $this->belongsTo(District::class, 'district_id', 'district_id');
    }

    /**
     * Get the services for the facility.
     */
    public function facilityServices()
    {
        return $this->hasMany(FacilityService::class, 'facility_id', 'facility_id');
    }

    /**
     * Get the insurances for the facility.
     */
    public function facilityInsurances()
    {
        return $this->hasMany(FacilityInsurance::class, 'facility_id', 'facility_id');
    }

    /**
     * Get the images for the facility.
     */
    public function images()
    {
        return $this->hasMany(FacilityImage::class, 'facility_id', 'facility_id')
                    ->where('status', 1)
                    ->orderBy('sort_order');
    }

    /**
     * Get the payment methods for the facility.
     */
    public function paymentMethods()
    {
        return $this->belongsToMany(
            PaymentMethod::class,
            'tbl_facility_payment_methods',
            'facility_id',
            'payment_method_id'
        )
        ->wherePivot('status', 1)
        ->where('status', 1)
        ->orderBy('sort_order', 'asc');
    }
}