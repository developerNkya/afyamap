<?php

namespace App\Models;

use CodeIgniter\Model;

class ServiceCategoryModel extends Model
{
    protected $table = 'tbl_service_categories';
    protected $primaryKey = 'category_id';

    protected $allowedFields = [
        'name',
        'description',
        'icon',
        'status',
        'created_at',
        'updated_at'
    ];

    protected $useTimestamps = true;
}