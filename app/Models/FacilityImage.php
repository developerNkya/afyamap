<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacilityImage extends Model
{
    protected $table      = 'tbl_facility_images';
    protected $primaryKey = 'image_id';
    public    $timestamps = false;
    protected $guarded    = [];
}
