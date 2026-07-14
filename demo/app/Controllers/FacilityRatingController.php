<?php

namespace App\Controllers;

use App\Models\FacilityModel;
use App\Models\RatingCriteriaModel;
use App\Models\FacilityCriteriaScoreModel;

class FacilityRatingController extends BaseController
{
    protected $facilityModel;
    protected $criteriaModel;
    protected $scoreModel;

    public function __construct()
    {
        $this->facilityModel = new FacilityModel();
        $this->criteriaModel = new RatingCriteriaModel();
        $this->scoreModel    = new FacilityCriteriaScoreModel();
    }

    // ================= LOAD PAGE =================
    public function index($facility_id)
    {
        $facility = $this->facilityModel->find($facility_id);

        if (!$facility) {
            return redirect()->back()->with('error', 'Facility not found');
        }

        $criteria = $this->criteriaModel
            ->where('status', 1)
            ->orderBy('criteria_id', 'ASC')
            ->findAll();

        // Existing scores
        $existing = $this->scoreModel->getByFacility($facility_id);
        $ratings  = array_column($existing, null, 'criteria_id');

        return view('site/facilities/rating', [
            'facility' => $facility,
            'criteria' => $criteria,
            'ratings'  => $ratings
        ]);
    }

    // ================= STORE (1–5 SCALE) =================
    public function store($facility_id)
    {
        $scores = $this->request->getPost('scores');
        $notes  = $this->request->getPost('notes');

        if (!is_array($scores) || empty($scores)) {
            return redirect()->back()->with('error', 'No scores submitted');
        }

        $totalScore = 0;
        $validCount = 0;

        foreach ($scores as $criteria_id => $score) {

            // 🚫 Reject empty / non-numeric
            if ($score === '' || $score === null || !is_numeric($score)) {
                continue;
            }

            $score = (float)$score;

            // 🚫 Strict 1–5 validation
            if ($score < 1 || $score > 5) {
                continue;
            }

            $data = [
                'facility_id'     => (int)$facility_id,
                'criteria_id'     => (int)$criteria_id,
                'score'           => $score,
                'max_score'       => 5, // fixed scale
                'inspector_id'    => session()->get('user_id') ?? null,
                'inspection_date' => date('Y-m-d'),
                'notes'           => $notes[$criteria_id] ?? null,
                'status'          => 1
            ];

            $this->scoreModel->saveScore($data);

            $totalScore += $score;
            $validCount++;
        }

        if ($validCount === 0) {
            return redirect()->back()->with('error', 'No valid scores (must be between 1 and 5)');
        }

        // ✅ FINAL AVERAGE (1–5 SCALE)
        $average = round($totalScore / $validCount, 2);

        // Safety clamp
        if ($average > 5) {
            $average = 5;
        }

        // ✅ UPDATE FACILITY
        $this->facilityModel->update($facility_id, [
            'average_rating' => $average
        ]);

        return redirect()->back()->with('success', 'Facility rating saved successfully');
    }

    // ================= SELECT FACILITY =================
    public function select()
    {
        $data['facilities'] = $this->facilityModel
            ->orderBy('name', 'ASC')
            ->findAll();

        return view('site/facilities/select_rating', $data);
    }
}