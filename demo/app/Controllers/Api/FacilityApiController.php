<?php
	
	namespace App\Controllers\Api;
	
	use App\Controllers\BaseController;
	
	class FacilityApiController extends BaseController
	{
		protected $db;
		
		public function __construct()
		
		{
			
			$this->db = db_connect();
			
		}
		// ================= JSON SUCCESS =================
		private function success($data = [], string $message = 'Success', int $code = 200)
		{
			return $this->response->setStatusCode($code)->setJSON([
				'status'  => true,
				'message' => $message,
				'data'    => $data
			]);
		}
		
		// ================= JSON ERROR =================
		private function error(string $message = 'Error', int $code = 400, $errors = [])
		{
			return $this->response->setStatusCode($code)->setJSON([
				'status'  => false,
				'message' => $message,
				'errors'  => $errors
			]);
		}
		
		
		// ================= LIST =================
		public function index()
		{
			$db = $this->db;
			
			// =====================================================
			// PAGINATION
			// =====================================================
			
			$page = (int) ($this->request->getGet('page') ?? 1);
			
			if ($page <= 0) {
				$page = 1;
			}
			
			$limit = (int) ($this->request->getGet('limit') ?? 1000);
			
			// SECURITY LIMIT
			if ($limit > 1000) {
				$limit = 1000;
			}
			
			$offset = ($page - 1) * $limit;
			
			// =====================================================
			// FILTERS
			// =====================================================
			
			$search       = trim($this->request->getGet('search') ?? '');
			$service_id   = (int) ($this->request->getGet('service_id') ?? 0);
			$insurance_id = (int) ($this->request->getGet('insurance_id') ?? 0);
			$region_id    = (int) ($this->request->getGet('region_id') ?? 0);
			$district_id  = (int) ($this->request->getGet('district_id') ?? 0);
			$category_id  = (int) ($this->request->getGet('category_id') ?? 0);
			
			// =====================================================
			// LOCATION
			// =====================================================
			
			$lat    = $this->request->getGet('lat');
			$lng    = $this->request->getGet('lng');
			$radius = $this->request->getGet('radius') ?? 5;
			
			$lat = is_numeric($lat) ? (float)$lat : null;
			$lng = is_numeric($lng) ? (float)$lng : null;
			
			$radius = is_numeric($radius)
				? (float)$radius
				: 500;
			
			// =====================================================
			// MAIN QUERY
			// =====================================================
			
			$builder = $db->table('tbl_facilities f');
			
			$builder->select("
        f.facility_id,
        f.name,
        f.logo,
        f.latitude,
        f.longitude,
        f.average_rating,
        f.total_reviews,
        f.open_time,
        f.close_time,
        f.opening_days,
        f.safecare_level,
        f.street,
        f.address,
        f.phone,
        f.email,
        f.website,
        f.is_accredited,
        f.is_emergency,

        c.name as category,

        co.name as country,
        r.name as region,
        d.name as district
    ");
			
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
			
			$builder->where('f.status', 1);
			
			// =====================================================
			// SEARCH
			// =====================================================
			
			if (!empty($search)) {
				
				$builder->groupStart()
					->like('f.name', $search)
					->orLike('c.name', $search)
					->orLike('r.name', $search)
					->orLike('d.name', $search)
					->groupEnd();
			}
			
			// =====================================================
			// CATEGORY FILTER
			// =====================================================
			
			if ($category_id > 0) {
				
				$builder->where('f.category_id', $category_id);
			}
			
			// =====================================================
			// REGION FILTER
			// =====================================================
			
			if ($region_id > 0) {
				
				$builder->where('f.region_id', $region_id);
			}
			
			// =====================================================
			// DISTRICT FILTER
			// =====================================================
			
			if ($district_id > 0) {
				
				$builder->where('f.district_id', $district_id);
			}
			
			// =====================================================
			// SERVICE FILTER
			// =====================================================
			
			if ($service_id > 0) {
				
				$builder->join(
					'tbl_facility_services fs',
					'fs.facility_id = f.facility_id',
					'inner'
				);
				
				$builder->where('fs.service_id', $service_id);
				
				$builder->where('fs.status', 1);
			}
			
			// =====================================================
			// INSURANCE FILTER
			// =====================================================
			
			if ($insurance_id > 0) {
				
				$builder->join(
					'tbl_facility_insurances fi',
					'fi.facility_id = f.facility_id',
					'inner'
				);
				
				$builder->where('fi.insurance_id', $insurance_id);
				
				$builder->where('fi.status', 1);
			}
			
			// =====================================================
			// DISTANCE CALCULATION
			// =====================================================
			
			if ($lat !== null && $lng !== null) {
				
				$distanceSQL = "
            (
                6371 * acos(
                    cos(radians($lat))
                    * cos(radians(f.latitude))
                    * cos(radians(f.longitude) - radians($lng))
                    + sin(radians($lat))
                    * sin(radians(f.latitude))
                )
            )
        ";
				
				$builder->select("$distanceSQL AS distance", false);
				
				$builder->having('distance <=', $radius);
				
				$builder->orderBy('distance', 'ASC');
				
			} else {
				
				$builder->orderBy('f.name', 'ASC');
			}
			
			// =====================================================
			// GROUPING
			// =====================================================
			
			$builder->groupBy('f.facility_id');
			
			// =====================================================
			// TOTAL RECORDS
			// =====================================================
			
			$totalBuilder = clone $builder;
			
			$totalRows = $totalBuilder
				->select('COUNT(DISTINCT f.facility_id) as total')
				->get()
				->getRowArray();
			
			$total = (int) ($totalRows['total'] ?? 0);
			
			// =====================================================
			// FETCH DATA
			// =====================================================
			
			$rows = $builder
				->limit($limit, $offset)
				->get()
				->getResultArray();
			
			// =====================================================
			// FORMAT RESPONSE
			// =====================================================
			
			$facilities = [];
			
			foreach ($rows as $row) {
				
				$facilities[] = [
					
					'facility_id' => (int)$row['facility_id'],
					
					'name' => $row['name'],
					
					'logo' => !empty($row['logo'])
						? base_url('uploads/facilities/' . $row['logo'])
						: null,
					
					'category' => $row['category'],
					
					
					
					'country' => $row['country'],
					
					'region' => $row['region'],
					
					'district' => $row['district'],
					
					'street' => $row['street'],
					
					'address' => $row['address'],
					
					'phone' => $row['phone'],
					
					'email' => $row['email'],
					
					'website' => $row['website'],
					
					'latitude' => !empty($row['latitude'])
						? (float)$row['latitude']
						: null,
					
					'longitude' => !empty($row['longitude'])
						? (float)$row['longitude']
						: null,
					
					'average_rating' => round(
						(float)($row['average_rating'] ?? 0),
						1
					),
					
					'total_reviews' => (int)($row['total_reviews'] ?? 0),
					
					'opening_days' => $row['opening_days'],
					
					'open_time' => $row['open_time'],
					
					'close_time' => $row['close_time'],
					
					'safecare_level' => $row['safecare_level'],
					
					'is_accredited' => (int)$row['is_accredited'],
					
					'is_emergency' => (int)$row['is_emergency'],
					
					'distance_km' => isset($row['distance'])
						? round((float)$row['distance'], 2)
						: null
				];
			}
			
			// =====================================================
			// RESPONSE
			// =====================================================
			
			return $this->success([
				
				'items' => $facilities,
				
				'pagination' => [
					
					'page' => $page,
					
					'limit' => $limit,
					
					'total' => $total,
					
					'total_pages' => ceil($total / $limit)
				]
			]);
		}
		
		
		// ================= DETAIL =================
		public function show($id)
		{
			$db = db_connect();
			// ================= FACILITY =================
			$facility = $db->table('tbl_facilities f')
				->select('
            f.*,
            c.name as category,
          
            co.name as country,
            r.name as region,
            d.name as district
        ')
				->join('tbl_facility_categories c', 'c.category_id = f.category_id', 'left')
				//->join('tbl_facility_levels l', 'l.level_id = f.level_id', 'left')
				->join('tbl_countries co', 'co.country_id = f.country_id', 'left')
				->join('tbl_regions r', 'r.region_id = f.region_id', 'left')
				->join('tbl_districts d', 'd.district_id = f.district_id', 'left')
				->where('f.facility_id', $id)
				->get()
				->getRowArray();
			
			if (!$facility) {
				return $this->error('Facility not found', 404);
			}
			// ================= SERVICES =================
			$services = $db->table('tbl_facility_services fs')
				->select('s.service_id, s.name')
				->join('tbl_services s', 's.service_id = fs.service_id')
				->where('fs.facility_id', $id)
				->get()
				->getResultArray();
			// ================= INSURANCES =================
			$insurances = $db->table('tbl_facility_insurances fi')
				->select('i.insurance_id, i.name')
				->join('tbl_insurances i', 'i.insurance_id = fi.insurance_id')
				->where('fi.facility_id', $id)
				->get()
				->getResultArray();
			// ================= GALLERY =================
			$galleryRaw = $db->table('tbl_facility_images')
				->select('image_path')
				->where('facility_id', $id)
				->get()
				->getResultArray();
			// convert to full URLs
			$gallery = array_map(function ($img) {
				return [
					'image' => !empty($img['image_path'])
						? base_url('uploads/facilities/' . $img['image_path'])
						: null
				];
			}, $galleryRaw);
			// ================= FORMAT FACILITY =================
			$facilityData = [
				'facility_id' => (int)$facility['facility_id'],
				'name'        => $facility['name'],
				'logo' => !empty($facility['logo'])
					? base_url('uploads/facilities/' . $facility['logo'])
					: null,
				'category' => $facility['category'],
				'country'  => $facility['country'],
				'region'   => $facility['region'],
				'district' => $facility['district'],
				'lat' => (float)$facility['latitude'],
				'lng' => (float)$facility['longitude'],
			];
			// ================= RESPONSE =================
			return $this->success([
				'facility'   => $facilityData,
				'services'   => $services,
				'insurances' => $insurances,
				'gallery'    => $gallery,
			]);
		}
		
		
		// ================= SERVICES =================
		public function services($id)
		{
			$data = db_connect()->table('tbl_facility_services fs')
				->select('s.*')
				->join('tbl_services s', 's.service_id = fs.service_id')
				->where('fs.facility_id', $id)
				->get()->getResultArray();
			
			return $this->success($data);
		}
		
		
		// ================= INSURANCES =================
		public function insurances($id)
		{
			$data = db_connect()->table('tbl_facility_insurances fi')
				->select('i.*')
				->join('tbl_insurances i', 'i.insurance_id = fi.insurance_id')
				->where('fi.facility_id', $id)
				->get()->getResultArray();
			
			return $this->success($data);
		}
		
		
		// ================= GALLERY =================
		public function gallery($id)
		{
			$data = db_connect()->table('tbl_facility_gallery')
				->where('facility_id', $id)
				->get()->getResultArray();
			
			return $this->success($data);
		}
		
		
		// ================= RATINGS =================
		public function ratings($id)
		{
			$data = db_connect()->table('tbl_facility_ratings')
				->where('facility_id', $id)
				->orderBy('created_at', 'DESC')
				->get()->getResultArray();
			
			return $this->success($data);
		}
		
		
		// ================= RATE =================
		public function rate($id)
		{
			$rating  = $this->request->getPost('rating');
			$comment = $this->request->getPost('comment');
			
			if (!$rating) {
				return $this->error('Rating is required');
			}
			
			db_connect()->table('tbl_facility_ratings')->insert([
				'facility_id' => $id,
				'rating'      => (int)$rating,
				'comment'     => $comment,
				'created_at'  => date('Y-m-d H:i:s')
			]);
			
			return $this->success([], 'Rating submitted');
		}
	}