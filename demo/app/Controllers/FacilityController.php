<?php

namespace App\Controllers;

use App\Models\FacilityModel;
use App\Models\FacilityCategoryModel;
use App\Models\FacilityLevelModel;
use App\Models\CountryModel;
use App\Models\RegionModel;
use App\Models\DistrictModel;
use App\Models\OwnershipModel;
use Config\Database;

class FacilityController extends BaseController
{
    protected $facilityModel;
    protected $categoryModel;

    protected $countryModel;
    protected $regionModel;
    protected $districtModel;
    protected $db;
    protected $ownershipModel;
    public function __construct()
    {
        $this->facilityModel = new FacilityModel();
        $this->categoryModel = new FacilityCategoryModel();
        $this->levelModel    = new FacilityLevelModel();
        $this->countryModel  = new CountryModel();
        $this->ownershipModel = new OwnershipModel();
        $this->regionModel   = new RegionModel();
        $this->db = Database::connect();
        $this->districtModel = new DistrictModel();
    }

    /*
    |--------------------------------------------------------------------------
    | INDEX
    |--------------------------------------------------------------------------
    */
	public function index()
	{
		// =====================================================
		// FILTER VALUES
		// =====================================================
		
		$keyword   = trim($this->request->getGet('keyword') ?? '');
		$category  = trim($this->request->getGet('category') ?? '');
		$region    = trim($this->request->getGet('region') ?? '');
		$district  = trim($this->request->getGet('district') ?? '');
		$service   = trim($this->request->getGet('service') ?? '');
		$insurance = trim($this->request->getGet('insurance') ?? '');
		$status    = trim($this->request->getGet('status') ?? '');
		
		// =====================================================
		// MAIN QUERY
		// =====================================================
		
		$builder = $this->db->table('tbl_facilities f');
		
		$builder->select('
        f.*,
        c.name as category_name,
        co.name as country_name,
        r.name as region_name,
        d.name as district_name
    ');
		
		// =====================================================
		// JOINS
		// =====================================================
		
		$builder->join(
			'tbl_facility_categories c',
			'c.category_id = f.category_id',
			'left'
		);
		
		$builder->join(
			'tbl_countries co',
			'co.country_id = f.country_id',
			'left'
		);
		
		$builder->join(
			'tbl_regions r',
			'r.region_id = f.region_id',
			'left'
		);
		
		$builder->join(
			'tbl_districts d',
			'd.district_id = f.district_id',
			'left'
		);
		
		// =====================================================
		// SERVICE FILTER JOIN
		// =====================================================
		
		if (!empty($service)) {
			
			$builder->join(
				'tbl_facility_services fs',
				'fs.facility_id = f.facility_id',
				'left'
			);
			
			$builder->where(
				'fs.service_id',
				$service
			);
		}
		
		// =====================================================
		// INSURANCE FILTER JOIN
		// =====================================================
		
		if (!empty($insurance)) {
			
			$builder->join(
				'tbl_facility_insurances fi',
				'fi.facility_id = f.facility_id',
				'left'
			);
			
			$builder->where(
				'fi.insurance_id',
				$insurance
			);
		}
		
		// =====================================================
		// FULL SEARCH
		// =====================================================
		
		if (!empty($keyword)) {
			
			$builder->groupStart();
			
			$builder->like('f.name', $keyword);
			
			$builder->orLike('f.phone', $keyword);
			
			$builder->orLike('f.email', $keyword);
			
			$builder->orLike('f.website', $keyword);
			
			$builder->orLike('f.address', $keyword);
			
			$builder->orLike('f.street', $keyword);
			
			$builder->groupEnd();
		}
		
		// =====================================================
		// CATEGORY FILTER
		// =====================================================
		
		if (!empty($category)) {
			
			$builder->where(
				'f.category_id',
				$category
			);
		}
		
		// =====================================================
		// REGION FILTER
		// =====================================================
		
		if (!empty($region)) {
			
			$builder->where(
				'f.region_id',
				$region
			);
		}
		
		// =====================================================
		// DISTRICT FILTER
		// =====================================================
		
		if (!empty($district)) {
			
			$builder->where(
				'f.district_id',
				$district
			);
		}
		
		// =====================================================
		// STATUS FILTER
		// =====================================================
		
		if ($status !== '') {
			
			$builder->where(
				'f.status',
				$status
			);
		}
		
		// =====================================================
		// REMOVE DUPLICATES
		// =====================================================
		
		$builder->groupBy('f.facility_id');
		
		// =====================================================
		// ORDER
		// =====================================================
		
		$builder->orderBy(
			'f.name',
			'ASC'
		);
		
		// =====================================================
		// GET FACILITIES
		// =====================================================
		
		$facilities = $builder
			->get()
			->getResultArray();
		
		// =====================================================
		// LOAD SERVICES
		// =====================================================
		
		$serviceRows = $this->db
			->table('tbl_facility_services fs')
			->select('
            fs.facility_id,
            s.name
        ')
			->join(
				'tbl_services s',
				's.service_id = fs.service_id'
			)
			->get()
			->getResultArray();
		
		$facilityServices = [];
		
		foreach ($serviceRows as $srv) {
			
			$facilityServices[
			$srv['facility_id']
			][] = $srv['name'];
		}
		
		// =====================================================
		// LOAD INSURANCES
		// =====================================================
		
		$insuranceRows = $this->db
			->table('tbl_facility_insurances fi')
			->select('
            fi.facility_id,
            i.name
        ')
			->join(
				'tbl_insurances i',
				'i.insurance_id = fi.insurance_id'
			)
			->get()
			->getResultArray();
		
		$facilityInsurances = [];
		
		foreach ($insuranceRows as $ins) {
			
			$facilityInsurances[
			$ins['facility_id']
			][] = $ins['name'];
		}
		
		// =====================================================
		// FILTER DROPDOWNS
		// =====================================================
		
		$categories = $this->db
			->table('tbl_facility_categories')
			->orderBy('name', 'ASC')
			->get()
			->getResultArray();
		
		$regions = $this->db
			->table('tbl_regions')
			->orderBy('name', 'ASC')
			->get()
			->getResultArray();
		
		$districts = $this->db
			->table('tbl_districts')
			->orderBy('name', 'ASC')
			->get()
			->getResultArray();
		
		$services = $this->db
			->table('tbl_services')
			->orderBy('name', 'ASC')
			->get()
			->getResultArray();
		
		$insurances = $this->db
			->table('tbl_insurances')
			->orderBy('name', 'ASC')
			->get()
			->getResultArray();
		
		// =====================================================
		// VIEW
		// =====================================================
		
		return view('site/facilities/index', [
			
			'facilities'           => $facilities,
			
			'facilityServices'     => $facilityServices,
			
			'facilityInsurances'   => $facilityInsurances,
			
			'categories'           => $categories,
			
			'regions'              => $regions,
			
			'districts'            => $districts,
			
			'services'             => $services,
			
			'insurances'           => $insurances
		
		]);
	}

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */
    public function create()

    {

        $data['categories'] = $this->categoryModel->findAll();



        $data['facilities'] = $this->facilityModel->getAll();
        $data['ownerships'] = $this->ownershipModel->getActive();
        // LOCATION DATA

        $data['countries']  = $this->countryModel->where('status', 1)->findAll();

        // initially empty (will be loaded dynamically later)

        $data['regions']    = [];

        $data['districts']  = [];

        return view('site/facilities/create', $data);

    }

    /*
    |--------------------------------------------------------------------------
    | STORE
    |--------------------------------------------------------------------------
    */
    public function store()
    {
        $data = $this->request->getPost();

        // ================= VALIDATION =================
        if (empty($data['ownership_id'])) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Ownership is required');
        }

        // ================= LOGO UPLOAD =================
        $file = $this->request->getFile('logo');

        $logoName = null;

        if ($file && $file->isValid() && !$file->hasMoved()) {

            // CREATE DIRECTORY IF NOT EXISTS
            $uploadPath = FCPATH . 'uploads/facilities/';

            if (!is_dir($uploadPath)) {
                mkdir($uploadPath, 0777, true);
            }

            // GENERATE RANDOM FILE NAME
            $logoName = $file->getRandomName();

            // MOVE FILE
            $file->move($uploadPath, $logoName);
        }

        // ================= SAVE =================
        $this->facilityModel->save([

            'name'         => $data['name'],
            'category_id'  => $data['category_id'],
            'ownership_id' => $data['ownership_id'],

            'country_id'   => $data['country_id'],
            'region_id'    => $data['region_id'],
            'district_id'  => $data['district_id'],

            'street'       => $data['street'],
            'address'      => $data['address'],

            'phone'        => $data['phone'],
            'email'        => $data['email'],
            'website'      => $data['website'],

            'latitude'     => $data['latitude'],
            'longitude'    => $data['longitude'],

            'logo'         => $logoName,
            'status'       => $data['status'],

        ]);

        return redirect()->to('facilities')
            ->with('success', 'Facility added successfully');
    }

    /*
    |--------------------------------------------------------------------------
    | EDIT
    |--------------------------------------------------------------------------
    */
    public function edit($id)
    {
        $data['facility']   = $this->facilityModel->find($id);
        $data['categories'] = $this->categoryModel->findAll();
       // $data['levels']     = $this->levelModel->findAll();
        $data['countries']  = $this->countryModel->getActive();
        $data['ownerships'] = $this->ownershipModel->getActive();

        return view('site/facilities/edit', $data);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */
    public function update($id)
    {
        $data = $this->request->getPost();

        // HANDLE LOGO UPDATE
        $file = $this->request->getFile('logo');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move('uploads/facilities', $newName);
            $data['logo'] = $newName;
        }

        $this->facilityModel->update($id, $data);

        return redirect()->to('/facilities')->with('success', 'Facility updated successfully');
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */
    public function delete($id)
    {
        $this->facilityModel->delete($id);

        return redirect()->back()->with('success', 'Facility deleted successfully');
    }

    /*
    |--------------------------------------------------------------------------
    | TOGGLE STATUS
    |--------------------------------------------------------------------------
    */
    public function toggle($id)
    {
        $facility = $this->facilityModel->getById($id);

        $newStatus = $facility['status'] ? 0 : 1;

        $this->facilityModel->update($id, ['status' => $newStatus]);

        return redirect()->back()->with('success', 'Status updated');
    }
    public function regions($country_id)

    {

        $data = $this->regionModel

            ->where('country_id', $country_id)

            ->where('status', 1)

            ->orderBy('name', 'ASC')

            ->findAll();

        return $this->response->setJSON($data);

    }
    public function districts($region_id)

    {

        $data = $this->districtModel

            ->where('region_id', $region_id)

            ->where('status', 1)

            ->orderBy('name', 'ASC')

            ->findAll();

        return $this->response->setJSON($data);

    }

    public function gallery($id)
    {
        $data['facility'] = $this->facilityModel->find($id);

        $data['images'] = $this->db->table('tbl_facility_images')
            ->where('facility_id', $id)
            ->where('status', 1)
            ->orderBy('sort_order', 'ASC')
            ->get()
            ->getResultArray();

        return view('site/facilities/gallery', $data);
    }
    public function uploadGallery($id)
    {
        $files = $this->request->getFiles();

        $basePath = FCPATH . 'uploads/facilities/gallery/' . $id . '/';

        if (!is_dir($basePath)) {
            mkdir($basePath, 0777, true);
        }

        if (isset($files['images'])) {

            foreach ($files['images'] as $file) {

                if ($file->isValid() && !$file->hasMoved()) {

                    $newName = $file->getRandomName();

                    $file->move($basePath, $newName);

                    // Save into your real table
                    $this->db->table('tbl_facility_images')->insert([
                        'facility_id' => $id,
                        'image_path'  => $id . '/' . $newName,
                        'caption'     => null,
                        'is_primary'  => 0,
                        'sort_order'  => 0,
                        'status'      => 1,
                        'created_at'  => date('Y-m-d H:i:s')
                    ]);
                }
            }
        }

        return redirect()->back()->with('success', 'Images uploaded successfully');
    }
    public function deleteGallery($id)
    {
        $img = $this->db->table('tbl_facility_images')
            ->where('image_id', $id)
            ->get()
            ->getRowArray();

        if ($img) {

            $path = FCPATH . 'uploads/facilities/gallery/' . $img['image_path'];

            if (file_exists($path)) {
                unlink($path);
            }

            $this->db->table('tbl_facility_images')
                ->where('image_id', $id)
                ->delete();
        }

        return redirect()->back()->with('success', 'Image deleted');
    }
}