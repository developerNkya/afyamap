<?php

namespace App\Models;

use CodeIgniter\Model;

class FacilityCriteriaScoreModel extends Model
{
    protected $table = 'tbl_facility_criteria_scores';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'facility_id',
        'criteria_id',
        'score',
        'max_score',
        'inspector_id',
        'inspection_date',
        'notes',
        'status',
        'created_at',
        'updated_at'
    ];

    protected $useTimestamps = true;

    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    // ================= GET BY FACILITY =================
    public function getByFacility($facility_id)
    {
        return $this->where('facility_id', $facility_id)
            ->findAll();
    }

    // ================= CHECK EXIST =================
    public function exists($facility_id, $criteria_id)
    {
        return $this->where([
            'facility_id' => $facility_id,
            'criteria_id' => $criteria_id
        ])->first();
    }

    // ================= SAVE OR UPDATE =================
    public function saveScore($data)
    {
        $existing = $this->exists($data['facility_id'], $data['criteria_id']);

        if ($existing) {
            return $this->update($existing['id'], $data);
        }

        return $this->insert($data);
    }

    // ================= CALCULATE RATING =================
    public function calculateRating($facility_id)
    {
        $result = $this->select('SUM(score) as total_score, SUM(max_score) as total_max')
            ->where('facility_id', $facility_id)
            ->first();

        if (!$result || $result['total_max'] == 0) {
            return 0;
        }

        return round(($result['total_score'] / $result['total_max']) * 100, 2);
    }
}