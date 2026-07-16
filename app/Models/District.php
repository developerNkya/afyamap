<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    protected $table      = 'tbl_districts';
    protected $primaryKey = 'district_id';
    public    $timestamps = false;
    protected $guarded    = [];
}
