<?php

namespace App\Models;

use CodeIgniter\Model;

class ServiceModel extends Model
{
    protected $table = 'tbl_services';
    protected $primaryKey = 'service_id';

    protected $allowedFields = [
        'category_id',
        'name',
        'description',
        'status',
        'created_at',
        'updated_at'
    ];

    protected $useTimestamps = true;

    public function getAllWithCategory()
    {
        return $this->select('tbl_services.*, tbl_service_categories.name as category_name')
            ->join('tbl_service_categories', 'tbl_service_categories.category_id = tbl_services.category_id')
            ->orderBy('service_id', 'DESC')
            ->findAll();
    }
}