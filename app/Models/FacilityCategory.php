<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacilityCategory extends Model
{
    protected $table      = 'tbl_facility_categories';
    protected $primaryKey = 'category_id';
    public    $timestamps = false;
    protected $guarded    = [];
}
