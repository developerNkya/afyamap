<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table      = 'tbl_services';
    protected $primaryKey = 'service_id';
    public    $timestamps = false;
    protected $guarded    = [];
}
