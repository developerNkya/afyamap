<?php
	
	namespace App\Controllers;
	
	use App\Controllers\BaseController;
	use PhpOffice\PhpSpreadsheet\IOFactory;
	
	class FacilityImportController extends BaseController
	{
		protected $db;
		
		public function __construct()
		{
			$this->db = \Config\Database::connect();
		}
		private function getColumnValue($row, $headers, $column)
		{
			$column = strtolower(trim($column));
			
			$column = str_replace(' ', '_', $column);
			
			if (!isset($headers[$column])) {
				return null;
			}
			
			return trim((string)($row[$headers[$column]] ?? ''));
		}
		private function isRowEmpty($row)
		{
			foreach ($row as $cell) {
				
				if (trim((string)$cell) !== '') {
					
					return false;
				}
			}
			
			return true;
		}
		
		public function index()
		{
			return view('site/facilities/import');
		}
		/**
		 * IMPORT FACILITIES FROM EXCEL
		 */
		public function import()
		{
			ini_set('memory_limit', '6G');
			ini_set('max_execution_time', 0);
			
			helper(['filesystem']);
			
			// =====================================================
			// FILE VALIDATION
			// =====================================================
			
			$file = $this->request->getFile('excel_file');
			
			if (!$file || !$file->isValid()) {
				
				return redirect()
					->back()
					->with('error', 'Invalid Excel file uploaded.');
			}
			
			// =====================================================
			// EXTENSION VALIDATION
			// =====================================================
			
			$ext = strtolower($file->getExtension());
			
			if (!in_array($ext, ['xls', 'xlsx', 'csv'])) {
				
				return redirect()
					->back()
					->with('error', 'Only XLS, XLSX or CSV files are allowed.');
			}
			
			// =====================================================
			// CREATE DIRECTORY
			// =====================================================
			
			$uploadPath = ROOTPATH . 'public/uploads/imports/';
			
			if (!is_dir($uploadPath)) {
				
				mkdir($uploadPath, 0777, true);
			}
			
			// =====================================================
			// MOVE FILE
			// =====================================================
			
			$newName = time() . '_' . $file->getRandomName();
			
			$file->move($uploadPath, $newName);
			
			$filePath = $uploadPath . $newName;
			
			try {
				
				// =====================================================
				// LOAD EXCEL
				// =====================================================
				
				$spreadsheet = IOFactory::load($filePath);
				
				$sheet = $spreadsheet->getActiveSheet();
				
				$rows = $sheet->toArray();
				
				// =====================================================
				// EMPTY FILE CHECK
				// =====================================================
				
				if (count($rows) <= 1) {
					
					return redirect()
						->back()
						->with('error', 'Excel file is empty.');
				}
				
				// =====================================================
				// GET HEADER ROW
				// =====================================================
				
				$headerRow = array_shift($rows);
				
				// =====================================================
				// NORMALIZE HEADERS
				// =====================================================
				
				$headers = [];
				
				foreach ($headerRow as $index => $columnName) {
					
					$normalized = strtolower(trim($columnName));
					
					$normalized = str_replace(' ', '_', $normalized);
					
					$headers[$normalized] = $index;
				}
				
				// =====================================================
				// REQUIRED COLUMNS
				// =====================================================
				
				$requiredColumns = [
					
					'name',
					'category',
					'ownership',
					'region',
					'district'
				];
				
				foreach ($requiredColumns as $column) {
					
					if (!isset($headers[$column])) {
						
						return redirect()
							->back()
							->with(
								'error',
								"Missing required column: {$column}"
							);
					}
				}
				
				// =====================================================
				// FAILED ROWS
				// =====================================================
				
				$failedRows = [];
				
				$imported = 0;
				
				$skipped = 0;
				
				// =====================================================
				// START TRANSACTION
				// =====================================================
				
				$this->db->transBegin();
				
				// =====================================================
				// LOOP ROWS
				// =====================================================
				
				foreach ($rows as $index => $row) {
					
					$excelRow = $index + 2;
					
					// =====================================================
					// SKIP EMPTY ROWS
					// =====================================================
					
					if ($this->isRowEmpty($row)) {
						continue;
					}
					
					// =====================================================
					// GET COLUMN VALUES
					// =====================================================
					
					$name = $this->getColumnValue(
						$row,
						$headers,
						'name'
					);
					
					$categoryName = $this->getColumnValue(
						$row,
						$headers,
						'category'
					);
					
					$ownershipName = $this->getColumnValue(
						$row,
						$headers,
						'ownership'
					);
					
					$regionName = $this->getColumnValue(
						$row,
						$headers,
						'region'
					);
					
					$districtName = $this->getColumnValue(
						$row,
						$headers,
						'district'
					);
					
					$street = $this->getColumnValue(
						$row,
						$headers,
						'street'
					);
					
					$address = $this->getColumnValue(
						$row,
						$headers,
						'address'
					);
					
					$phone = $this->getColumnValue(
						$row,
						$headers,
						'phone'
					);
					
					$email = $this->getColumnValue(
						$row,
						$headers,
						'email'
					);
					
					$website = $this->getColumnValue(
						$row,
						$headers,
						'website'
					);
					
					$latitude = $this->getColumnValue(
						$row,
						$headers,
						'latitude'
					);
					
					$longitude = $this->getColumnValue(
						$row,
						$headers,
						'longitude'
					);
					
					$services = $this->getColumnValue(
						$row,
						$headers,
						'services'
					);
					
					$insurances = $this->getColumnValue(
						$row,
						$headers,
						'insurances'
					);
					
					$openingDays = $this->getColumnValue(
						$row,
						$headers,
						'opening_days'
					);
					
					$openTime = $this->getColumnValue(
						$row,
						$headers,
						'open_time'
					);
					
					$closeTime = $this->getColumnValue(
						$row,
						$headers,
						'close_time'
					);
					
					$safecareLevel = $this->getColumnValue(
						$row,
						$headers,
						'safecare_level'
					);
					
					// =====================================================
					// SKIP EMPTY FACILITY NAME
					// =====================================================
					
					if (empty($name)) {
						
						$skipped++;
						
						continue;
					}
					
					// =====================================================
					// CATEGORY
					// =====================================================
					
					$category = $this->db
						->table('tbl_facility_categories')
						->where(
							'LOWER(TRIM(name))',
							strtolower(trim($categoryName))
						)
						->get()
						->getRowArray();
					
					if (!$category) {
						
						$failedRows[] =
							"Row {$excelRow}: Category '{$categoryName}' not found.";
						
						continue;
					}
					
					// =====================================================
					// OWNERSHIP
					// =====================================================
					
					$ownership = $this->db
						->table('tbl_ownership_types')
						->where(
							'LOWER(TRIM(name))',
							strtolower(trim($ownershipName))
						)
						->get()
						->getRowArray();
					
					if (!$ownership) {
						
						$failedRows[] =
							"Row {$excelRow}: Ownership '{$ownershipName}' not found.";
						
						continue;
					}
					
					// =====================================================
					// REGION
					// =====================================================
					
					$region = $this->db
						->table('tbl_regions')
						->where(
							'LOWER(TRIM(name))',
							strtolower(trim($regionName))
						)
						->get()
						->getRowArray();
					
					if (!$region) {
						
						$failedRows[] =
							"Row {$excelRow}: Region '{$regionName}' not found.";
						
						continue;
					}
					
					// =====================================================
					// DISTRICT
					// =====================================================
					
					$district = $this->db
						->table('tbl_districts')
						->where('region_id', $region['region_id'])
						->where(
							'LOWER(TRIM(name))',
							strtolower(trim($districtName))
						)
						->get()
						->getRowArray();
					
					if (!$district) {
						
						$failedRows[] =
							"Row {$excelRow}: District '{$districtName}' not found.";
						
						continue;
					}
					
					// =====================================================
					// DUPLICATE CHECK
					// =====================================================
					
					$existingFacility = $this->db
						->table('tbl_facilities')
						->where(
							'LOWER(TRIM(name))',
							strtolower(trim($name))
						)
						->where(
							'district_id',
							$district['district_id']
						)
						->get()
						->getRowArray();
					
					if ($existingFacility) {
						
						$failedRows[] =
							"Row {$excelRow}: Facility already exists.";
						
						$skipped++;
						
						continue;
					}
					
					// =====================================================
					// INSERT FACILITY
					// =====================================================
					
					$facilityData = [
						
						'name' => $name,
						
						'category_id' =>
							$category['category_id'],
						
						'ownership_id' =>
							$ownership['ownership_id'],
						
						'country_id' => 1,
						
						'region_id' =>
							$region['region_id'],
						
						'district_id' =>
							$district['district_id'],
						
						'street' => $street,
						
						'address' => $address,
						
						'phone' => $phone,
						
						'email' => $email,
						
						'website' => $website,
						
						'latitude' => $latitude,
						
						'longitude' => $longitude,
						
						'safecare_level' => $safecareLevel,
						
						'status' => 1,
						
						'created_at' => date('Y-m-d H:i:s'),
						
						'updated_at' => date('Y-m-d H:i:s'),
					];
					
					$this->db
						->table('tbl_facilities')
						->insert($facilityData);
					
					$facilityId = $this->db->insertID();
					
					if (!$facilityId) {
						
						$failedRows[] =
							"Row {$excelRow}: Failed to insert facility.";
						
						continue;
					}
					
					// =====================================================
					// SERVICES
					// =====================================================
					
					if (!empty($services)) {
						
						$serviceArray = explode(',', $services);
						
						foreach ($serviceArray as $serviceName) {
							
							$serviceName = trim($serviceName);
							
							if (empty($serviceName)) {
								continue;
							}
							
							$service = $this->db
								->table('tbl_services')
								->where(
									'LOWER(TRIM(name))',
									strtolower(trim($serviceName))
								)
								->get()
								->getRowArray();
							
							if (!$service) {
								
								$failedRows[] =
									"Row {$excelRow}: Service '{$serviceName}' not found.";
								
								continue;
							}
							
							$exists = $this->db
								->table('tbl_facility_services')
								->where('facility_id', $facilityId)
								->where(
									'service_id',
									$service['service_id']
								)
								->countAllResults();
							
							if (!$exists) {
								
								$this->db
									->table('tbl_facility_services')
									->insert([
										
										'facility_id' => $facilityId,
										
										'service_id' =>
											$service['service_id'],
										
										'status' => 1,
										
										'created_at' =>
											date('Y-m-d H:i:s'),
									]);
							}
						}
					}
					
					// =====================================================
					// INSURANCES
					// =====================================================
					
					if (!empty($insurances)) {
						
						$insuranceArray = explode(',', $insurances);
						
						foreach ($insuranceArray as $insuranceName) {
							
							$insuranceName = trim($insuranceName);
							
							if (empty($insuranceName)) {
								continue;
							}
							
							$insurance = $this->db
								->table('tbl_insurances')
								->where(
									'LOWER(TRIM(name))',
									strtolower(trim($insuranceName))
								)
								->get()
								->getRowArray();
							
							if (!$insurance) {
								
								$failedRows[] =
									"Row {$excelRow}: Insurance '{$insuranceName}' not found.";
								
								continue;
							}
							
							$exists = $this->db
								->table('tbl_facility_insurances')
								->where('facility_id', $facilityId)
								->where(
									'insurance_id',
									$insurance['insurance_id']
								)
								->countAllResults();
							
							if (!$exists) {
								
								$this->db
									->table('tbl_facility_insurances')
									->insert([
										
										'facility_id' => $facilityId,
										
										'insurance_id' =>
											$insurance['insurance_id'],
										
										'status' => 1,
										
										'created_at' =>
											date('Y-m-d H:i:s'),
									]);
							}
						}
					}
					
					// =====================================================
					// WORKING HOURS
					// =====================================================
					
					if (
						!empty($openingDays) &&
						!empty($openTime) &&
						!empty($closeTime)
					) {
						
						$days = explode(',', $openingDays);
						
						foreach ($days as $day) {
							
							$day = trim($day);
							
							if (empty($day)) {
								continue;
							}
							
							$this->db
								->table('tbl_facility_hours')
								->insert([
									
									'facility_id' => $facilityId,
									
									'day_of_week' => $day,
									
									'open_time' => $openTime,
									
									'close_time' => $closeTime,
									
									'is_closed' => 0
								]);
						}
					}
					
					$imported++;
				}
				
				// =====================================================
				// TRANSACTION STATUS
				// =====================================================
				
				if ($this->db->transStatus() === false) {
					
					$this->db->transRollback();
					
					return redirect()
						->back()
						->with('error', 'Import failed.');
				}
				
				$this->db->transCommit();
				
				$message =
					"Imported: {$imported}, " .
					"Skipped: {$skipped}";
				
				if (!empty($failedRows)) {
					
					session()->setFlashdata(
						'failed_rows',
						$failedRows
					);
					
					$message .=
						', Failed: ' . count($failedRows);
				}
				
				return redirect()
					->back()
					->with('success', $message);
				
			} catch (\Throwable $e) {
				
				$this->db->transRollback();
				
				return redirect()
					->back()
					->with(
						'error',
						'Import Error: ' . $e->getMessage()
					);
			}
		}
		
		public function preview()
		{
			// =====================================================
			// SUPPORT BOTH INPUT NAMES
			// =====================================================
			
			$file = $this->request->getFile('excel_file');
			
			if (!$file || !$file->isValid()) {
				
				$file = $this->request->getFile('excel');
			}
			
			// =====================================================
			// FILE VALIDATION
			// =====================================================
			
			if (!$file || !$file->isValid()) {
				
				return redirect()
					->back()
					->with(
						'error',
						'Please upload valid Excel file.'
					);
			}
			
			// =====================================================
			// EXTENSION VALIDATION
			// =====================================================
			
			$extension = strtolower(
				$file->getExtension()
			);
			
			if (!in_array(
				$extension,
				['xls', 'xlsx', 'csv']
			)) {
				
				return redirect()
					->back()
					->with(
						'error',
						'Only XLS, XLSX and CSV files are allowed.'
					);
			}
			
			try {
				
				// =====================================================
				// LOAD EXCEL
				// =====================================================
				
				$spreadsheet = IOFactory::load(
					$file->getTempName()
				);
				
				$sheet = $spreadsheet->getActiveSheet();
				
				$rows = $sheet->toArray();
				
				// =====================================================
				// EMPTY FILE CHECK
				// =====================================================
				
				if (count($rows) <= 1) {
					
					return redirect()
						->back()
						->with(
							'error',
							'Excel file is empty.'
						);
				}
				
				// =====================================================
				// HEADER ROW
				// =====================================================
				
				$headerRow = array_shift($rows);
				
				// =====================================================
				// NORMALIZE HEADERS
				// =====================================================
				
				$headers = [];
				
				foreach ($headerRow as $index => $columnName) {
					
					$normalized = strtolower(
						trim($columnName)
					);
					
					$normalized = str_replace(
						[' ', '-'],
						'_',
						$normalized
					);
					
					$headers[$normalized] = $index;
				}
				
				// =====================================================
				// REQUIRED COLUMNS
				// =====================================================
				
				$requiredColumns = [
					
					'name',
					'category',
					'ownership',
					'region',
					'district'
				
				];
				
				foreach ($requiredColumns as $column) {
					
					if (!isset($headers[$column])) {
						
						return redirect()
							->back()
							->with(
								'error',
								'Missing required column: ' .
								$column
							);
					}
				}
				
				$previewData = [];
				
				// =====================================================
				// LOOP ROWS
				// =====================================================
				
				foreach ($rows as $index => $row) {
					
					// =====================================================
					// SKIP EMPTY ROWS
					// =====================================================
					
					$emptyRow = true;
					
					foreach ($row as $cell) {
						
						if (!empty(trim($cell))) {
							
							$emptyRow = false;
							
							break;
						}
					}
					
					if ($emptyRow) {
						continue;
					}
					
					$errors = [];
					
					// =====================================================
					// DYNAMIC COLUMN MAPPING
					// =====================================================
					
					$name = trim(
						$row[$headers['name']] ?? ''
					);
					
					$category = trim(
						$row[$headers['category']] ?? ''
					);
					
					$ownership = trim(
						$row[$headers['ownership']] ?? ''
					);
					
					$region = trim(
						$row[$headers['region']] ?? ''
					);
					
					$district = trim(
						$row[$headers['district']] ?? ''
					);
					
					$street = trim(
						$row[$headers['street']] ?? ''
					);
					
					$address = trim(
						$row[$headers['address']] ?? ''
					);
					
					$phone = trim(
						$row[$headers['phone']] ?? ''
					);
					
					$email = trim(
						$row[$headers['email']] ?? ''
					);
					
					$website = trim(
						$row[$headers['website']] ?? ''
					);
					
					$latitude = trim(
						$row[$headers['latitude']] ?? ''
					);
					
					$longitude = trim(
						$row[$headers['longitude']] ?? ''
					);
					
					$services = trim(
						$row[$headers['services']] ?? ''
					);
					
					$insurances = trim(
						$row[$headers['insurances']] ?? ''
					);
					
					$openingDays = trim(
						$row[$headers['opening_days']] ?? ''
					);
					
					$openTime = trim(
						$row[$headers['open_time']] ?? ''
					);
					
					$closeTime = trim(
						$row[$headers['close_time']] ?? ''
					);
					
					$safeCareLevel = trim(
						$row[$headers['safecare_level']] ?? ''
					);
					
					// =====================================================
					// REQUIRED NAME
					// =====================================================
					
					if (empty($name)) {
						
						$errors[] =
							'Facility name missing';
					}
					
					// =====================================================
					// CATEGORY
					// =====================================================
					
					$categoryRow = $this->db
						->table('tbl_facility_categories')
						->where(
							'LOWER(TRIM(name))',
							strtolower(trim($category))
						)
						->get()
						->getRowArray();
					
					if (!$categoryRow) {
						
						$errors[] =
							"Category '{$category}' not found";
					}
					
					// =====================================================
					// OWNERSHIP
					// =====================================================
					
					$ownershipRow = $this->db
						->table('tbl_ownership_types')
						->where(
							'LOWER(TRIM(name))',
							strtolower(trim($ownership))
						)
						->get()
						->getRowArray();
					
					if (!$ownershipRow) {
						
						$errors[] =
							"Ownership '{$ownership}' not found";
					}
					
					// =====================================================
					// REGION
					// =====================================================
					
					$regionRow = $this->db
						->table('tbl_regions')
						->where(
							'LOWER(TRIM(name))',
							strtolower(trim($region))
						)
						->get()
						->getRowArray();
					
					if (!$regionRow) {
						
						$errors[] =
							"Region '{$region}' not found";
					}
					
					// =====================================================
					// DISTRICT
					// =====================================================
					
					$districtRow = $this->db
						->table('tbl_districts')
						->where(
							'LOWER(TRIM(name))',
							strtolower(trim($district))
						)
						->get()
						->getRowArray();
					
					if (!$districtRow) {
						
						$errors[] =
							"District '{$district}' not found";
					}
					
					// =====================================================
					// DUPLICATE CHECK
					// =====================================================
					
					$duplicate = false;
					
					if (!empty($name)) {
						
						$duplicate = $this->db
								->table('tbl_facilities')
								->where(
									'LOWER(TRIM(name))',
									strtolower(trim($name))
								)
								->countAllResults() > 0;
						
						if ($duplicate) {
							
							$errors[] =
								'Facility already exists';
						}
					}
					
					// =====================================================
					// SERVICES
					// =====================================================
					
					$serviceArray = [];
					
					if (!empty($services)) {
						
						$serviceItems = explode(
							',',
							$services
						);
						
						foreach ($serviceItems as $srv) {
							
							$srv = trim($srv);
							
							if (empty($srv)) {
								continue;
							}
							
							$serviceExists = $this->db
								->table('tbl_services')
								->where(
									'LOWER(TRIM(name))',
									strtolower(trim($srv))
								)
								->get()
								->getRowArray();
							
							if (!$serviceExists) {
								
								$errors[] =
									"Service '{$srv}' not found";
							}
							
							$serviceArray[] = [
								
								'name' => $srv,
								
								'valid' =>
									$serviceExists
										? true
										: false,
								
								'service_id' =>
									$serviceExists['service_id']
									?? null
							];
						}
					}
					
					// =====================================================
					// INSURANCES
					// =====================================================
					
					$insuranceArray = [];
					
					if (!empty($insurances)) {
						
						$insuranceItems = explode(
							',',
							$insurances
						);
						
						foreach ($insuranceItems as $ins) {
							
							$ins = trim($ins);
							
							if (empty($ins)) {
								continue;
							}
							
							$insuranceExists = $this->db
								->table('tbl_insurances')
								->where(
									'LOWER(TRIM(name))',
									strtolower(trim($ins))
								)
								->get()
								->getRowArray();
							
							if (!$insuranceExists) {
								
								$errors[] =
									"Insurance '{$ins}' not found";
							}
							
							$insuranceArray[] = [
								
								'name' => $ins,
								
								'valid' =>
									$insuranceExists
										? true
										: false,
								
								'insurance_id' =>
									$insuranceExists['insurance_id']
									?? null
							];
						}
					}
					
					// =====================================================
					// FINAL STATUS
					// =====================================================
					
					$isValid = empty($errors);
					
					// =====================================================
					// BUILD PREVIEW DATA
					// =====================================================
					
					$previewData[] = [
						
						'row_number' => $index + 2,
						
						'valid' => $isValid,
						
						'duplicate' => $duplicate,
						
						'errors' => $errors,
						
						'name' => [
							'value' => $name,
							'valid' => !empty($name)
						],
						
						'category' => [
							'value' => $category,
							'valid' =>
								$categoryRow
									? true
									: false,
							'category_id' =>
								$categoryRow['category_id']
								?? null
						],
						
						'ownership' => [
							'value' => $ownership,
							'valid' =>
								$ownershipRow
									? true
									: false,
							'ownership_id' =>
								$ownershipRow['ownership_id']
								?? null
						],
						
						'region' => [
							'value' => $region,
							'valid' =>
								$regionRow
									? true
									: false,
							'region_id' =>
								$regionRow['region_id']
								?? null
						],
						
						'district' => [
							'value' => $district,
							'valid' =>
								$districtRow
									? true
									: false,
							'district_id' =>
								$districtRow['district_id']
								?? null
						],
						
						'street' => $street,
						'address' => $address,
						'phone' => $phone,
						'email' => $email,
						'website' => $website,
						'latitude' => $latitude,
						'longitude' => $longitude,
						
						'opening_days' =>
							$openingDays,
						
						'open_time' =>
							$openTime,
						
						'close_time' =>
							$closeTime,
						
						'safecare_level' =>
							$safeCareLevel,
						
						'services' =>
							$serviceArray,
						
						'insurances' =>
							$insuranceArray
					];
				}
				
				// =====================================================
				// STORE SESSION
				// =====================================================
				
				session()->set(
					'facility_preview_data',
					$previewData
				);
				
				// =====================================================
				// RETURN VIEW
				// =====================================================
				
				return view(
					'site/facilities/import_preview',
					[
						'previewData' =>
							$previewData
					]
				);
				
			} catch (\Exception $e) {
				
				return redirect()
					->back()
					->with(
						'error',
						$e->getMessage()
					);
			}
		}
		/*
	 
		|--------------------------------------------------------------------------
	 
	 
		| SAVE IMPORT
	 
		|--------------------------------------------------------------------------
	 
		*/
		public function saveImport()
		{
			ini_set('memory_limit', '6G');
			ini_set('max_execution_time', 0);
			
			$previewData = session()->get('facility_preview_data');
			
			if (!$previewData) {
				
				return redirect()
					->to('facilities/import')
					->with('error', 'No preview data found.');
			}
			
			$this->db->transBegin();
			
			try {
				
				$imported = 0;
				
				$skipped = 0;
				
				$failed = [];
				
				foreach ($previewData as $row) {
					
					// =========================================
					// SKIP INVALID
					// =========================================
					
					if (empty($row['valid'])) {
						
						$skipped++;
						
						continue;
					}
					
					// =========================================
					// SKIP DUPLICATES
					// =========================================
					
					if (!empty($row['duplicate'])) {
						
						$skipped++;
						
						continue;
					}
					
					// =========================================
					// VALIDATE REQUIRED IDS
					// =========================================
					
					if (empty($row['category']['category_id'])) {
						
						$failed[] =
							$row['name']['value'] .
							' → Missing category';
						
						continue;
					}
					
					if (empty($row['ownership']['ownership_id'])) {
						
						$failed[] =
							$row['name']['value'] .
							' → Missing ownership';
						
						continue;
					}
					
					if (empty($row['region']['region_id'])) {
						
						$failed[] =
							$row['name']['value'] .
							' → Missing region';
						
						continue;
					}
					
					if (empty($row['district']['district_id'])) {
						
						$failed[] =
							$row['name']['value'] .
							' → Missing district';
						
						continue;
					}
					
					// =========================================
					// CHECK OWNERSHIP AGAIN
					// =========================================
					
					$ownership = $this->db
						->table('tbl_ownership_types')
						->where(
							'ownership_id',
							$row['ownership']['ownership_id']
						)
						->get()
						->getRowArray();
					
					if (!$ownership) {
						
						$failed[] =
							$row['name']['value'] .
							' → Invalid ownership';
						
						continue;
					}
					
					// =========================================
					// PREVENT DUPLICATES AGAIN
					// =========================================
					
					$alreadyExists = $this->db
						->table('tbl_facilities')
						->where(
							'LOWER(TRIM(name))',
							strtolower(
								trim($row['name']['value'])
							)
						)
						->countAllResults();
					
					if ($alreadyExists > 0) {
						
						$skipped++;
						
						continue;
					}
					
					// =========================================
					// INSERT FACILITY
					// =========================================
					
					$facilityData = [
						
						'name' =>
							trim($row['name']['value']),
						
						'category_id' =>
							$row['category']['category_id'],
						
						'ownership_id' =>
							$ownership['ownership_id'],
						
						'country_id' => 1,
						
						'region_id' =>
							$row['region']['region_id'],
						
						'district_id' =>
							$row['district']['district_id'],
						
						'street' =>
							!empty($row['street'])
								? trim($row['street'])
								: null,
						
						'address' =>
							!empty($row['address'])
								? trim($row['address'])
								: null,
						
						'phone' =>
							!empty($row['phone'])
								? trim($row['phone'])
								: null,
						
						'email' =>
							!empty($row['email'])
								? trim($row['email'])
								: null,
						
						'website' =>
							!empty($row['website'])
								? trim($row['website'])
								: null,
						
						'latitude' =>
							!empty($row['latitude'])
								? trim($row['latitude'])
								: null,
						
						'longitude' =>
							!empty($row['longitude'])
								? trim($row['longitude'])
								: null,
						
						'opening_days' =>
							!empty($row['opening_days'])
								? trim($row['opening_days'])
								: null,
						
						'open_time' =>
							!empty($row['open_time'])
								? trim($row['open_time'])
								: null,
						
						'close_time' =>
							!empty($row['close_time'])
								? trim($row['close_time'])
								: null,
						
						'safecare_level' =>
							!empty($row['safecare_level'])
								? trim($row['safecare_level'])
								: null,
						
						'status' => 1,
						
						'created_at' =>
							date('Y-m-d H:i:s'),
						
						'updated_at' =>
							date('Y-m-d H:i:s'),
					];
					
					$this->db
						->table('tbl_facilities')
						->insert($facilityData);
					
					// =========================================
					// CHECK INSERT ERROR
					// =========================================
					
					$error = $this->db->error();
					
					if ($error['code'] != 0) {
						
						$failed[] =
							$row['name']['value'] .
							' → ' .
							$error['message'];
						
						continue;
					}
					
					$facilityId = $this->db->insertID();
					
					// =========================================
					// FACILITY ID SAFETY CHECK
					// =========================================
					
					if (empty($facilityId)) {
						
						$failed[] =
							$row['name']['value'] .
							' → Failed getting facility ID';
						
						continue;
					}
					
					// =========================================
					// INSERT SERVICES
					// =========================================
					
					if (!empty($row['services'])) {
						
						foreach ($row['services'] as $service) {
							
							if (empty($service['valid'])) {
								continue;
							}
							
							if (empty($service['service_id'])) {
								continue;
							}
							
							// DUPLICATE CHECK
							
							$exists = $this->db
								->table('tbl_facility_services')
								->where(
									'facility_id',
									$facilityId
								)
								->where(
									'service_id',
									$service['service_id']
								)
								->countAllResults();
							
							if ($exists > 0) {
								continue;
							}
							
							$this->db
								->table('tbl_facility_services')
								->insert([
									
									'facility_id' =>
										$facilityId,
									
									'service_id' =>
										$service['service_id'],
									
									'status' => 1,
									
									'created_at' =>
										date('Y-m-d H:i:s')
								]);
							
							// CHECK SERVICE INSERT ERROR
							
							$serviceError = $this->db->error();
							
							if ($serviceError['code'] != 0) {
								
								$failed[] =
									$row['name']['value'] .
									' → Service Error: ' .
									$serviceError['message'];
							}
						}
					}
					
					// =========================================
					// INSERT INSURANCES
					// =========================================
					
					if (!empty($row['insurances'])) {
						
						foreach ($row['insurances'] as $insurance) {
							
							if (empty($insurance['valid'])) {
								continue;
							}
							
							if (empty($insurance['insurance_id'])) {
								continue;
							}
							
							// DUPLICATE CHECK
							
							$exists = $this->db
								->table('tbl_facility_insurances')
								->where(
									'facility_id',
									$facilityId
								)
								->where(
									'insurance_id',
									$insurance['insurance_id']
								)
								->countAllResults();
							
							if ($exists > 0) {
								continue;
							}
							
							$this->db
								->table('tbl_facility_insurances')
								->insert([
									
									'facility_id' =>
										$facilityId,
									
									'insurance_id' =>
										$insurance['insurance_id'],
									
									'status' => 1,
									
									'created_at' =>
										date('Y-m-d H:i:s')
								]);
							
							// CHECK INSURANCE INSERT ERROR
							
							$insuranceError = $this->db->error();
							
							if ($insuranceError['code'] != 0) {
								
								$failed[] =
									$row['name']['value'] .
									' → Insurance Error: ' .
									$insuranceError['message'];
							}
						}
					}
					
					$imported++;
				}
				
				// =========================================
				// TRANSACTION CHECK
				// =========================================
				
				if ($this->db->transStatus() === false) {
					
					$this->db->transRollback();
					
					return redirect()
						->to('facilities/import')
						->with('error', 'Import failed.');
				}
				
				$this->db->transCommit();
				
				// =========================================
				// CLEAR SESSION
				// =========================================
				
				session()->remove(
					'facility_preview_data'
				);
				
				// =========================================
				// FINAL MESSAGE
				// =========================================
				
				$message =
					"Imported: {$imported}, " .
					"Skipped: {$skipped}";
				
				if (!empty($failed)) {
					
					session()->setFlashdata(
						'import_failures',
						$failed
					);
					
					$message .=
						', Failed: ' .
						count($failed);
				}
				
				return redirect()
					->to('facilities')
					->with('success', $message);
				
			} catch (\Throwable $e) {
				
				$this->db->transRollback();
				
				return redirect()
					->to('facilities/import')
					->with(
						'error',
						'Import Error: ' .
						$e->getMessage()
					);
			}
		}
		
	
	}