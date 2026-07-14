<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'services' => 'array',
            'insurances' => 'array',
            'gallery' => 'array',
            'languages' => 'array',
            'jciAccredited' => 'boolean',
            'emergency247' => 'boolean',
            'rating' => 'float',
            'safeCareLevel' => 'integer',
            'reviewCount' => 'integer',
            'lat' => 'float',
            'lng' => 'float',
        ];
    }
}
