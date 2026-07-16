<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Insurance extends Model
{
    protected $table      = 'tbl_insurances';
    protected $primaryKey = 'insurance_id';
    public    $timestamps = false;
    protected $guarded    = [];
}
