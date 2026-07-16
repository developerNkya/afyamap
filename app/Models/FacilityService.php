<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacilityService extends Model
{
    protected $table      = 'tbl_facility_services';
    protected $primaryKey = 'id';
    public    $timestamps = false;
    protected $guarded    = [];

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'service_id');
    }
}
