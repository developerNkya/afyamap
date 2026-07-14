<?php

namespace App\Controllers;

use App\Models\FacilityModel;
use App\Models\InsuranceModel;
use Config\Database;

class FacilityInsuranceController extends BaseController
{
    protected $facilityModel;
    protected $insuranceModel;
    protected $db;

    public function __construct()
    {
        $this->facilityModel  = new FacilityModel();
        $this->insuranceModel = new InsuranceModel();
        $this->db             = Database::connect();
    }

    // ===============================
    // INDEX: VIEW PAGE
    // ===============================
    public function index($facility_id)
    {
        // Facility
        $data['facility'] = $this->facilityModel->find($facility_id);

        if (!$data['facility']) {
            return redirect()->back()->with('error', 'Facility not found');
        }

        // Get assigned insurance IDs
        $assignedIds = $this->db->table('tbl_facility_insurances')
            ->select('insurance_id')
            ->where('facility_id', $facility_id)
            ->get()
            ->getResultArray();

        $assignedIds = array_column($assignedIds, 'insurance_id');

        // Available insurances (exclude assigned)
        $data['insurances'] = $this->insuranceModel
            ->where('status', 1)
            ->whereNotIn('insurance_id', $assignedIds ?: [0])
            ->orderBy('name', 'ASC')
            ->findAll();

        // Assigned insurances
        $data['assigned'] = $this->db->table('tbl_facility_insurances fi')
            ->select('fi.id, fi.status, i.name')
            ->join('tbl_insurances i', 'i.insurance_id = fi.insurance_id', 'left')
            ->where('fi.facility_id', $facility_id)
            ->orderBy('i.name', 'ASC')
            ->get()
            ->getResultArray();

        return view('site/facilities/insurances', $data);
    }


    // ===============================
    // STORE: ASSIGN INSURANCES
    // ===============================
    public function store($facility_id)
    {
        $insurances = $this->request->getPost('insurances');

        if (empty($insurances)) {
            return redirect()->back()->with('error', 'No insurance selected');
        }

        foreach ($insurances as $insurance_id) {

            // Check duplicate
            $exists = $this->db->table('tbl_facility_insurances')
                ->where([
                    'facility_id'  => $facility_id,
                    'insurance_id' => $insurance_id
                ])
                ->countAllResults();

            if (!$exists) {
                $this->db->table('tbl_facility_insurances')->insert([
                    'facility_id'  => $facility_id,
                    'insurance_id' => $insurance_id,
                    'status'       => 1,
                    'created_at'   => date('Y-m-d H:i:s')
                ]);
            }
        }

        return redirect()->back()->with('success', 'Insurance assigned successfully');
    }


    // ===============================
    // DELETE: REMOVE INSURANCE
    // ===============================
    public function delete($id)
    {
        $row = $this->db->table('tbl_facility_insurances')
            ->where('id', $id)
            ->get()
            ->getRowArray();

        if (!$row) {
            return redirect()->back()->with('error', 'Record not found');
        }

        $this->db->table('tbl_facility_insurances')
            ->where('id', $id)
            ->delete();

        return redirect()->back()->with('success', 'Insurance removed');
    }


    // ===============================
    // TOGGLE: ENABLE / DISABLE
    // ===============================
    public function toggle($id)
    {
        $row = $this->db->table('tbl_facility_insurances')
            ->where('id', $id)
            ->get()
            ->getRowArray();

        if (!$row) {
            return redirect()->back()->with('error', 'Record not found');
        }

        $newStatus = $row['status'] ? 0 : 1;

        $this->db->table('tbl_facility_insurances')
            ->where('id', $id)
            ->update([
                'status' => $newStatus
            ]);

        return redirect()->back()->with('success', 'Status updated');
    }
}