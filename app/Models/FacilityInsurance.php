<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacilityInsurance extends Model
{
    protected $table      = 'tbl_facility_insurances';
    protected $primaryKey = 'id';
    public    $timestamps = false;
    protected $guarded    = [];

    public function insurance()
    {
        return $this->belongsTo(Insurance::class, 'insurance_id', 'insurance_id');
    }
}
