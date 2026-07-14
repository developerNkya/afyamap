<?php

namespace App\Controllers;

use App\Models\FacilityModel;
use App\Models\ServiceModel;
use Config\Database;

class FacilityServiceController extends BaseController
{
    protected $facilityModel;
    protected $serviceModel;
    protected $db;

    public function __construct()
    {
        $this->facilityModel = new FacilityModel();
        $this->serviceModel  = new ServiceModel();
        $this->db            = Database::connect();
    }

    // ================= LIST PAGE =================
    public function index($facility_id)
    {
        $data['facility'] = $this->facilityModel->find($facility_id);

        // all services
        $assignedIds = $this->db->table('tbl_facility_services')

            ->select('service_id')

            ->where('facility_id', $facility_id)

            ->get()->getResultArray();

        $assignedIds = array_column($assignedIds, 'service_id');

// GET available services (exclude assigned)

        $data['services'] = $this->serviceModel

            ->where('status', 1)

            ->whereNotIn('service_id', $assignedIds ?: [0]) // avoid empty error

            ->findAll();

        // assigned services
        $data['assigned'] = $this->db->table('tbl_facility_services fs')
            ->select('fs.id, fs.status, s.name as service_name')
            ->join('tbl_services s', 's.service_id = fs.service_id')
            ->where('fs.facility_id', $facility_id)
            ->get()->getResultArray();

        return view('site/facilities/services', $data);
    }

    // ================= ASSIGN =================
    public function store($facility_id)
    {
        $services = $this->request->getPost('services');

        if (!empty($services)) {

            foreach ($services as $service_id) {

                $exists = $this->db->table('tbl_facility_services')
                    ->where([
                        'facility_id' => $facility_id,
                        'service_id'  => $service_id
                    ])->countAllResults();

                if (!$exists) {
                    $this->db->table('tbl_facility_services')->insert([
                        'facility_id' => $facility_id,
                        'service_id'  => $service_id,
                        'status'      => 1
                    ]);
                }
            }
        }

        return redirect()->back()->with('success', 'Services assigned successfully');
    }

    // ================= DELETE =================
    public function delete($id)
    {
        $this->db->table('tbl_facility_services')
            ->where('id', $id)
            ->delete();

        return redirect()->back()->with('success', 'Service removed');
    }

    // ================= TOGGLE =================
    public function toggle($id)
    {
        $row = $this->db->table('tbl_facility_services')
            ->where('id', $id)
            ->get()->getRowArray();

        if ($row) {
            $newStatus = $row['status'] ? 0 : 1;

            $this->db->table('tbl_facility_services')
                ->where('id', $id)
                ->update(['status' => $newStatus]);
        }

        return redirect()->back()->with('success', 'Service updated');
    }
}