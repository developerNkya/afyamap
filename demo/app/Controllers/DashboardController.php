<?php

namespace App\Controllers;

use App\Models\FacilityModel;

class DashboardController extends BaseController
{
    protected $facilityModel;
    protected $db;
	public function __construct(){
		$this->facilityModel = new FacilityModel();
		$this->db = \Config\Database::connect();
	}
	
	public function index()
	{
		$data = [];
		
		// =====================================================
		// TOTAL COUNTS
		// =====================================================
		
		$data['totalFacilities'] = $this->facilityModel
			->countAll();
		
		$data['activeFacilities'] = $this->facilityModel
			->where('status', 1)
			->countAllResults();
		
		$data['inactiveFacilities'] = $this->facilityModel
			->where('status', 0)
			->countAllResults();
		
		$data['totalServices'] = $this->db
			->table('tbl_services')
			->countAllResults();
		
		// =====================================================
		// FACILITIES BY CATEGORY
		// =====================================================
		
		$data['byCategory'] = $this->db
			->table('tbl_facilities f')
			->select('
            c.name as category,
            COUNT(f.facility_id) as total
        ')
			->join(
				'tbl_facility_categories c',
				'c.category_id = f.category_id'
			)
			->groupBy('c.category_id')
			->orderBy('total', 'DESC')
			->get()
			->getResultArray();
		
		// =====================================================
		// FACILITIES BY REGION
		// =====================================================
		
		$data['byRegion'] = $this->db
			->table('tbl_facilities f')
			->select('
            r.name as region,
            COUNT(f.facility_id) as total
        ')
			->join(
				'tbl_regions r',
				'r.region_id = f.region_id'
			)
			->groupBy('r.region_id')
			->orderBy('total', 'DESC')
			->get()
			->getResultArray();
		
		// =====================================================
		// FACILITIES BY OWNERSHIP
		// =====================================================
		
		$data['byOwnership'] = $this->db
			->table('tbl_facilities f')
			->select('
            o.name as ownership,
            COUNT(f.facility_id) as total
        ')
			->join(
				'tbl_ownership_types o',
				'o.ownership_id = f.ownership_id'
			)
			->groupBy('o.ownership_id')
			->orderBy('total', 'DESC')
			->get()
			->getResultArray();
		
		// =====================================================
		// FACILITIES BY SERVICE
		// =====================================================
		
		$data['byService'] = $this->db
			->table('tbl_facility_services fs')
			->select('
            s.name as service,
            COUNT(DISTINCT fs.facility_id) as total
        ')
			->join(
				'tbl_services s',
				's.service_id = fs.service_id'
			)
			->groupBy('s.service_id')
			->orderBy('total', 'DESC')
			->get()
			->getResultArray();
		
		// =====================================================
		// FACILITIES BY INSURANCE
		// =====================================================
		
		$data['byInsurance'] = $this->db
			->table('tbl_facility_insurances fi')
			->select('
            i.name as insurance,
            COUNT(DISTINCT fi.facility_id) as total
        ')
			->join(
				'tbl_insurances i',
				'i.insurance_id = fi.insurance_id'
			)
			->groupBy('i.insurance_id')
			->orderBy('total', 'DESC')
			->get()
			->getResultArray();
		
		// =====================================================
		// TOP REGIONS
		// =====================================================
		
		$data['topRegions'] = $this->db
			->table('tbl_facilities f')
			->select('
            r.name as region,
            COUNT(f.facility_id) as total
        ')
			->join(
				'tbl_regions r',
				'r.region_id = f.region_id'
			)
			->groupBy('r.region_id')
			->orderBy('total', 'DESC')
			->limit(10)
			->get()
			->getResultArray();
		
		// =====================================================
		// RECENT FACILITIES
		// =====================================================
		
		$data['recentFacilities'] = $this->db
			->table('tbl_facilities f')
			->select('
            f.*,
            c.name as category_name,
            r.name as region_name
        ')
			->join(
				'tbl_facility_categories c',
				'c.category_id = f.category_id',
				'left'
			)
			->join(
				'tbl_regions r',
				'r.region_id = f.region_id',
				'left'
			)
			->orderBy('f.facility_id', 'DESC')
			->limit(10)
			->get()
			->getResultArray();
		
		// =====================================================
		// RETURN VIEW
		// =====================================================
		
		return view(
			'site/dashboard/index',
			$data
		);
	}
}