<?php

namespace App\Models;

use CodeIgniter\Model;

class RatingCriteriaModel extends Model
{
    protected $table = 'tbl_rating_criteria';
    protected $primaryKey = 'criteria_id';

    protected $allowedFields = [
        'name',
        'description',
        'max_score',
        'status'
    ];

    protected $useTimestamps = false;
}