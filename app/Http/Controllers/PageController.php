<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use App\Models\FacilityCategory;
use App\Models\Region;
use App\Models\District;
use App\Models\Service;
use App\Models\Insurance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Get the image base URL with proper environment handling
     * 
     * This method determines where to load images from based on the environment.
     * For production, it uses IMAGE_BASE_URL from .env
     * For local development, it falls back to APP_URL
     */
    private function getImageBaseUrl(): string
    {
        // Get the image base URL from config
        $imageBaseUrl = config('app.image_base_url');

        // If not set or null, fallback to APP_URL
        if (empty($imageBaseUrl) || $imageBaseUrl === 'null' || $imageBaseUrl === '') {
            $imageBaseUrl = config('app.url');
        }

        // Remove trailing slash if exists
        return rtrim($imageBaseUrl, '/');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HOME
    // ─────────────────────────────────────────────────────────────────────────
    public function home()
    {
        // Featured: top-rated active facilities (safecare_level >= 4)
        $rawFacilities = $this->buildFacilityQuery()
            ->where('f.status', 1)
            ->where('f.safecare_level', '>=', 4)
            ->orderBy('f.average_rating', 'desc')
            ->limit(8)
            ->get();

        $facilities = $this->mapFacilitiesWithRelations($rawFacilities);

        // Filter option lists for the hero search bar
        $regions    = $this->getRegions();
        $categories = $this->getCategories(); // Now filters out Faith-based/NGO
        $services   = $this->getServices(); // Flat list for home page
        $insurances = $this->getInsurances();

        return Inertia::render('Home', [
            'facilities' => $facilities,
            'regions'    => $regions,
            'categories' => $categories,
            'services'   => $services,
            'insurances' => $insurances,
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FACILITIES LIST
    // ─────────────────────────────────────────────────────────────────────────
    public function facilitiesList(Request $request)
    {
        $query = $this->buildFacilityQuery()->where('f.status', 1);

        // ── Text search ──────────────────────────────────────────────────────
        if ($request->filled('q')) {
            $s = $request->q;
            $query->where(function ($q) use ($s) {
                $q->where('f.name',    'like', "%{$s}%")
                    ->orWhere('f.phone', 'like', "%{$s}%")
                    ->orWhere('f.email', 'like', "%{$s}%")
                    ->orWhere('r.name',  'like', "%{$s}%")
                    ->orWhere('c.name',  'like', "%{$s}%");
            });
        }

        // ── Category filter ──────────────────────────────────────────────────
        if ($request->filled('category')) {
            $cat = $request->category;
            if (is_numeric($cat)) {
                $query->where('f.category_id', $cat);
            } else {
                $query->where('c.name', $cat);
            }
        }

        // ── Region filter ────────────────────────────────────────────────────
        if ($request->filled('region')) {
            $reg = $request->region;
            if (is_numeric($reg)) {
                $query->where('f.region_id', $reg);
            } else {
                $query->where('r.name', $reg);
            }
        }

        // ── District filter ──────────────────────────────────────────────────
        if ($request->filled('district')) {
            $dist = $request->district;
            if (is_numeric($dist)) {
                $query->where('f.district_id', $dist);
            } else {
                $query->where('d.name', $dist);
            }
        }

        // ── SafeCare level ───────────────────────────────────────────────────
        if ($request->filled('level')) {
            $query->where('f.safecare_level', '>=', (int) $request->level);
        }

        // ── Service filter (via subquery) ────────────────────────────────────
        if ($request->filled('service')) {
            $srv = $request->service;
            $query->whereExists(function ($sub) use ($srv) {
                $sub->select(DB::raw(1))
                    ->from('tbl_facility_services as fs')
                    ->whereColumn('fs.facility_id', 'f.facility_id');

                if (is_numeric($srv)) {
                    $sub->where('fs.service_id', $srv);
                } else {
                    $sub->join('tbl_services as s', 's.service_id', '=', 'fs.service_id')
                        ->where('s.name', $srv);
                }
            });
        }

        // ── Insurance filter (via subquery) ──────────────────────────────────
        if ($request->filled('insurance')) {
            $ins = $request->insurance;
            $query->whereExists(function ($sub) use ($ins) {
                $sub->select(DB::raw(1))
                    ->from('tbl_facility_insurances as fi')
                    ->whereColumn('fi.facility_id', 'f.facility_id');

                if (is_numeric($ins)) {
                    $sub->where('fi.insurance_id', $ins);
                } else {
                    $sub->join('tbl_insurances as i', 'i.insurance_id', '=', 'fi.insurance_id')
                        ->where('i.name', $ins);
                }
            });
        }

        // ── JCI filter ──────────────────────────────────────────────────────
        if ($request->filled('jci') && $request->jci == '1') {
            $query->where('f.is_accredited', 1);
        }

        $rawFacilities = $query
            ->orderBy('f.name', 'asc')
            ->get();

        $facilities = $this->mapFacilitiesWithRelations($rawFacilities);

        // ── Filter option lists ───────────────────────────────────────────────
        $regions    = $this->getRegions();
        $categories = $this->getCategories(); // Now filters out Faith-based/NGO

        // For facilities list, we need grouped services for the sidebar
        // AND flat services for the search bar dropdown
        $servicesGrouped = $this->getGroupedServices(); // Grouped for sidebar
        $servicesFlat = $this->getServices(); // Flat for search bar

        $insurances = $this->getInsurances();

        // Districts for the selected region (for cascading dropdown)
        $districts = $request->filled('region')
            ? District::where('region_id', $request->region)
            ->where('status', 1)
            ->orderBy('name')
            ->get(['district_id', 'name'])
            ->map(fn($d) => ['id' => $d->district_id, 'name' => $d->name])
            ->values()
            : collect();

        return Inertia::render('FacilitiesList', [
            'facilities' => $facilities,
            'regions'    => $regions,
            'categories' => $categories,
            'services'   => $servicesGrouped, // Grouped for sidebar
            'servicesFlat' => $servicesFlat, // Flat for search bar
            'insurances' => $insurances,
            'districts'  => $districts,
            'filters'    => $request->only(['q', 'region', 'district', 'category', 'service', 'insurance', 'level', 'jci']),
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FACILITY DETAIL
    // ─────────────────────────────────────────────────────────────────────────
    public function facilityDetail($id)
    {
        // Core facility row with joins
        $row = $this->buildFacilityQuery()
            ->where('f.facility_id', $id)
            ->first();

        if (!$row) {
            abort(404, 'Facility not found');
        }

        // ── Services Grouped by Category ─────────────────────────────────────
        $servicesData = DB::table('tbl_facility_services as fs')
            ->join('tbl_services as s', 's.service_id', '=', 'fs.service_id')
            ->join('tbl_service_categories as sc', 'sc.category_id', '=', 's.category_id')
            ->where('fs.facility_id', $id)
            ->where('fs.status', 1)
            ->where('s.status', 1)
            ->where('sc.status', 1)
            ->select(['sc.name as category_name', 's.name as service_name'])
            ->orderBy('sc.name')
            ->orderBy('s.name')
            ->get();

        $services = [];
        foreach ($servicesData as $sd) {
            $services[$sd->category_name][] = $sd->service_name;
        }

        // ── Insurances ────────────────────────────────────────────────────────
        $insurances = DB::table('tbl_facility_insurances as fi')
            ->join('tbl_insurances as i', 'i.insurance_id', '=', 'fi.insurance_id')
            ->where('fi.facility_id', $id)
            ->pluck('i.name')
            ->values()
            ->all();

        // ── Gallery images ────────────────────────────────────────────────────
        $imageBaseUrl = $this->getImageBaseUrl();
        $gallery = DB::table('tbl_facility_images')
            ->where('facility_id', $id)
            ->where('status', 1)
            ->orderBy('sort_order')
            ->pluck('image_path')
            ->map(fn($p) => $imageBaseUrl . '/uploads/facilities/gallery/' . $p)
            ->values()
            ->all();

        // If no gallery images, use logo as fallback
        if (empty($gallery) && $row->logo) {
            $gallery = [$imageBaseUrl . '/uploads/facilities/' . $row->logo];
        }

        // ── Dynamic Comments & Ratings ───────────────────────────────────────
        $comments = DB::table('tbl_user_comments as c')
            ->join('tbl_users as u', 'u.user_id', '=', 'c.user_id')
            ->leftJoin('tbl_user_ratings as r', function ($join) use ($id) {
                $join->on('r.user_id', '=', 'c.user_id')
                    ->where('r.facility_id', '=', $id);
            })
            ->where('c.facility_id', $id)
            ->where('c.status', 1)
            ->orderBy('c.created_at', 'desc')
            ->select([
                'c.comment_id as id',
                'c.comment as text',
                'c.created_at',
                'u.name',
                'u.user_image',
                'r.rating'
            ])
            ->get()
            ->map(function ($c) {
                $words = explode(' ', $c->name);
                $initials = '';
                foreach ($words as $w) {
                    $initials .= strtoupper(substr($w, 0, 1));
                }
                $c->initials = substr($initials, 0, 2);
                $c->date = \Carbon\Carbon::parse($c->created_at)->diffForHumans();
                return $c;
            });

        $ratingsGroup = DB::table('tbl_user_ratings')
            ->where('facility_id', $id)
            ->select('rating', DB::raw('count(*) as count'))
            ->groupBy('rating')
            ->pluck('count', 'rating')
            ->all();

        $totalRatings = array_sum($ratingsGroup);
        $ratingDistribution = [];
        for ($i = 5; $i >= 1; $i--) {
            $count = $ratingsGroup[$i] ?? 0;
            $ratingDistribution[$i] = $totalRatings > 0 ? round(($count / $totalRatings) * 100) : 0;
        }

        $avgRating = DB::table('tbl_user_ratings')
            ->where('facility_id', $id)
            ->avg('rating');

        $ratingCount = DB::table('tbl_user_ratings')
            ->where('facility_id', $id)
            ->count();

        $facilityRating = $ratingCount > 0 ? round($avgRating, 1) : (float)($row->average_rating ?? 0.0);
        $facilityReviewCount = $ratingCount > 0 ? $ratingCount : (int)($row->total_reviews ?? 0);

        $mappedFacility = $this->mapFacility($row);
        $mappedFacility['rating'] = $facilityRating;
        $mappedFacility['reviewCount'] = $facilityReviewCount;

        $facility = array_merge($mappedFacility, [
            'services'   => $services,
            'insurances' => $insurances,
            'gallery'    => $gallery,
            'description' => null,
            'open_time'   => $row->open_time   ?? null,
            'close_time'  => $row->close_time  ?? null,
            'opening_days' => $row->opening_days ?? null,
            'beds'        => null,
            'established' => null,
            'languages'   => [],
        ]);

        return Inertia::render('FacilityDetail', [
            'facility' => $facility,
            'comments' => $comments,
            'ratingDistribution' => $ratingDistribution
        ]);
    }

    /**
     * Store facility review and comment from authenticated users.
     */
    public function storeReview(Request $request, $id)
    {
        $request->validate([
            'rating'  => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $userId = Auth::id();

        // 1. Update/insert rating in tbl_user_ratings
        DB::table('tbl_user_ratings')->updateOrInsert(
            ['facility_id' => $id, 'user_id' => $userId],
            ['rating' => $request->rating, 'created_at' => now()]
        );

        // 2. Insert comment in tbl_user_comments
        DB::table('tbl_user_comments')->insert([
            'facility_id' => $id,
            'user_id'     => $userId,
            'comment'     => $request->comment,
            'status'      => 1,
            'created_at'  => now(),
        ]);

        // 3. Update facility's average_rating and total_reviews
        $avgRating = DB::table('tbl_user_ratings')
            ->where('facility_id', $id)
            ->avg('rating');

        $ratingCount = DB::table('tbl_user_ratings')
            ->where('facility_id', $id)
            ->count();

        DB::table('tbl_facilities')
            ->where('facility_id', $id)
            ->update([
                'average_rating' => round($avgRating, 2),
                'total_reviews'  => $ratingCount
            ]);

        return redirect()->back()->with('success', 'Thank you! Your review has been submitted successfully.');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ABOUT / CONTACT
    // ─────────────────────────────────────────────────────────────────────────
    public function about()
    {
        return Inertia::render('About');
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }

    // =========================================================================
    // PRIVATE HELPERS
    // =========================================================================

    /**
     * Base query builder — joins categories, regions, districts.
     * Selects the core columns needed by mapFacility().
     */
    private function buildFacilityQuery()
    {
        return DB::table('tbl_facilities as f')
            ->leftJoin('tbl_facility_categories as c', 'c.category_id', '=', 'f.category_id')
            ->leftJoin('tbl_regions as r',             'r.region_id',   '=', 'f.region_id')
            ->leftJoin('tbl_districts as d',           'd.district_id', '=', 'f.district_id')
            ->select([
                'f.facility_id',
                'f.name',
                'f.logo',
                'f.safecare_level',
                'f.is_accredited',
                'f.is_emergency',
                'f.average_rating',
                'f.total_reviews',
                'f.latitude',
                'f.longitude',
                'f.phone',
                'f.email',
                'f.website',
                'f.street',
                'f.address',
                'f.open_time',
                'f.close_time',
                'f.opening_days',
                'f.status',
                'c.name as category_name',
                'r.name as region_name',
                'r.region_id',
                'd.name as district_name',
            ]);
    }

    /**
     * Map a raw DB row (stdClass) to the shape expected by the React components.
     */
    private function mapFacility($row): array
    {
        $logo = null;
        if (!empty($row->logo)) {
            $imageBaseUrl = $this->getImageBaseUrl();
            $logo = $imageBaseUrl . '/uploads/facilities/' . $row->logo;
        }

        // Build a human-readable hours string
        $hours = null;
        if (!empty($row->open_time) && !empty($row->close_time)) {
            $hours = $row->open_time . ' – ' . $row->close_time;
        } elseif (!empty($row->open_time)) {
            $hours = 'From ' . $row->open_time;
        } elseif (!empty($row->is_emergency)) {
            $hours = '24 Hours';
        }

        return [
            'id'            => $row->facility_id,
            'facility_id'   => $row->facility_id,
            'name'          => $row->name,
            'image'         => $logo,
            'logo'          => $logo,
            'category'      => $row->category_name ?? 'General',
            'region'        => $row->region_name   ?? '',
            'region_id'     => $row->region_id     ?? null,
            'district'      => $row->district_name ?? '',
            'safeCareLevel' => (int) ($row->safecare_level ?? 0),
            'jciAccredited' => (bool) ($row->is_accredited  ?? false),
            'rating'        => round((float) ($row->average_rating ?? 0), 1),
            'reviewCount'   => (int)  ($row->total_reviews  ?? 0),
            'lat'           => $row->latitude  ? (float) $row->latitude  : null,
            'lng'           => $row->longitude ? (float) $row->longitude : null,
            'address'       => trim(($row->street ?? '') . ' ' . ($row->address ?? '')),
            'street'        => $row->street    ?? null,
            'phone'         => $row->phone   ?? null,
            'email'         => $row->email   ?? null,
            'website'       => $row->website ?? null,
            'hours'         => $hours,
            'emergency247'  => (bool) ($row->is_emergency ?? false),
            'open_time'     => $row->open_time  ?? null,
            'close_time'    => $row->close_time ?? null,
            'opening_days'  => $row->opening_days ?? null,
            'beds'          => null,
            'established'   => null,
        ];
    }

    /**
     * Map raw facility records and load services and insurances for each.
     * Now loads services grouped by category for each facility.
     */
    private function mapFacilitiesWithRelations($rawFacilities)
    {
        $facilityIds = $rawFacilities->pluck('facility_id')->all();

        // Load services grouped by category for each facility
        $servicesByFacility = [];
        if (!empty($facilityIds)) {
            $serviceRows = DB::table('tbl_facility_services as fs')
                ->join('tbl_services as s', 's.service_id', '=', 'fs.service_id')
                ->leftJoin('tbl_service_categories as sc', 'sc.category_id', '=', 's.category_id')
                ->whereIn('fs.facility_id', $facilityIds)
                ->where('fs.status', 1)
                ->where('s.status', 1)
                ->select(
                    'fs.facility_id',
                    's.name as service_name',
                    DB::raw('COALESCE(sc.name, "Other Services") as category_name')
                )
                ->orderBy('sc.name')
                ->orderBy('s.name')
                ->get();

            foreach ($serviceRows as $srv) {
                if (!isset($servicesByFacility[$srv->facility_id])) {
                    $servicesByFacility[$srv->facility_id] = [];
                }
                $servicesByFacility[$srv->facility_id][$srv->category_name][] = $srv->service_name;
            }
        }

        $insurancesByFacility = [];
        if (!empty($facilityIds)) {
            $insuranceRows = DB::table('tbl_facility_insurances as fi')
                ->join('tbl_insurances as i', 'i.insurance_id', '=', 'fi.insurance_id')
                ->whereIn('fi.facility_id', $facilityIds)
                ->select('fi.facility_id', 'i.name')
                ->get();
            foreach ($insuranceRows as $ins) {
                $insurancesByFacility[$ins->facility_id][] = $ins->name;
            }
        }

        return $rawFacilities->map(function ($f) use ($servicesByFacility, $insurancesByFacility) {
            $mapped = $this->mapFacility($f);
            $mapped['services'] = $servicesByFacility[$f->facility_id] ?? [];
            $mapped['insurances'] = $insurancesByFacility[$f->facility_id] ?? [];
            return $mapped;
        })->values()->all();
    }

    /** Filter option helpers */
    private function getRegions(): array
    {
        $counts = DB::table('tbl_facilities')
            ->where('status', 1)
            ->whereNotNull('region_id')
            ->select('region_id', DB::raw('COUNT(*) as cnt'))
            ->groupBy('region_id')
            ->pluck('cnt', 'region_id');

        return Region::where('status', 1)
            ->orderBy('name')
            ->get(['region_id', 'name'])
            ->map(fn($r) => [
                'id'    => $r->region_id,
                'slug'  => $r->region_id,
                'name'  => $r->name,
                'icon'  => 'MapPin',
                'count' => (int) ($counts[$r->region_id] ?? 0),
            ])
            ->values()
            ->all();
    }

    /**
     * Get categories filtered to exclude "Faith-based / NGO (non-profit)"
     * 
     * This method filters out the Faith-based/NGO category from both the
     * home page and facilities list page.
     */
    private function getCategories(): array
    {
        // Define the category names to exclude
        $excludedCategories = [
            'Faith-based / NGO (non-profit)',
            'Faith-based / NGO (non-profit)',
            'Faith-based',
            'NGO',
            'Faith-based / NGO'
        ];

        $counts = DB::table('tbl_facilities')
            ->where('status', 1)
            ->whereNotNull('category_id')
            ->select('category_id', DB::raw('COUNT(*) as cnt'))
            ->groupBy('category_id')
            ->pluck('cnt', 'category_id');

        return FacilityCategory::where('status', 1)
            ->whereNotIn('name', $excludedCategories) // Exclude the Faith-based/NGO category
            ->orderBy('name')
            ->get(['category_id', 'name'])
            ->map(fn($c) => [
                'id'    => $c->category_id,
                'slug'  => $c->category_id,
                'name'  => $c->name,
                'icon'  => 'Building2',
                'count' => (int) ($counts[$c->category_id] ?? 0),
            ])
            ->values()
            ->all();
    }

    /**
     * Get services grouped by category for filter sidebar.
     * This matches the format used in facility detail.
     * Used in FacilitiesList page for the sidebar.
     */
    private function getGroupedServices(): array
    {
        $servicesData = DB::table('tbl_services as s')
            ->join('tbl_service_categories as sc', 'sc.category_id', '=', 's.category_id')
            ->where('s.status', 1)
            ->where('sc.status', 1)
            ->select(['sc.name as category_name', 's.name as service_name'])
            ->orderBy('sc.name')
            ->orderBy('s.name')
            ->get();

        $services = [];
        foreach ($servicesData as $sd) {
            if (!isset($services[$sd->category_name])) {
                $services[$sd->category_name] = [];
            }
            $services[$sd->category_name][] = $sd->service_name;
        }

        return $services;
    }

    /**
     * Get flat list of services for search bar dropdowns.
     * Used in Home page and FacilitiesList search bar.
     */
    private function getServices(): array
    {
        return Service::where('status', 1)
            ->orderBy('name')
            ->get(['service_id', 'name'])
            ->map(fn($s) => [
                'id'   => $s->service_id,
                'name' => $s->name,
            ])
            ->values()
            ->all();
    }

    /**
     * Get flat list of insurance providers.
     */
    private function getInsurances(): array
    {
        return Insurance::where('status', 1)
            ->orderBy('name')
            ->get(['insurance_id', 'name'])
            ->map(fn($i) => [
                'id'   => $i->insurance_id,
                'name' => $i->name,
            ])
            ->values()
            ->all();
    }
}