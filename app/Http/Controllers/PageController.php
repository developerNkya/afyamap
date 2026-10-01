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
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Get the image base URL with proper environment handling
     */
    private function getImageBaseUrl(): string
    {
        $imageBaseUrl = config('app.image_base_url');

        if (empty($imageBaseUrl) || $imageBaseUrl === 'null' || $imageBaseUrl === '') {
            $imageBaseUrl = config('app.url');
        }

        return rtrim($imageBaseUrl, '/');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HOME
    // ─────────────────────────────────────────────────────────────────────────
    public function home()
    {
        // Featured: top-rated active facilities (safecare_level >= 4)
        // NOTE: ordering by f.average_rating — that's a stale denormalized column
        // we no longer trust. We re-sort in PHP after computing live ratings below.
        $rawFacilities = $this->buildFacilityQuery()
            ->where('f.status', 1)
            ->whereNull('f.deleted_at')
            ->where('f.safecare_level', '>=', 4)
            ->limit(30) // grab a pool, then sort + trim in PHP
            ->get();

        $facilities = collect($this->mapFacilitiesWithRelations($rawFacilities))
            ->sortByDesc('rating')
            ->take(8)
            ->values()
            ->all();

        $regions    = $this->getRegions();
        $categories = $this->getCategories();
        $services   = $this->getServices();
        $insurances = $this->getInsurances();

        // ── Testimonials ─────────────────────────────────────────────────────
        $testimonials = DB::table('tbl_user_comments as c')
            ->leftJoin('tbl_users as u',      'u.user_id',     '=', 'c.user_id')
            ->leftJoin('tbl_facilities as f', 'f.facility_id', '=', 'c.facility_id')
            ->leftJoin('tbl_user_ratings as r', function ($join) {
                $join->on('r.user_id', '=', 'c.user_id')
                    ->whereColumn('r.facility_id', 'c.facility_id');
            })
            ->leftJoin('tbl_regions as reg', 'reg.region_id', '=', 'f.region_id')
            ->where('c.status', 1)
            ->whereNotNull('c.comment')
            ->where('c.comment', '!=', '')
            ->whereRaw('CHAR_LENGTH(TRIM(c.comment)) >= 5')
            ->orderBy('c.created_at', 'desc')
            ->limit(10)
            ->select([
                'c.comment_id as id',
                DB::raw('COALESCE(u.name, "Anonymous") as name'),
                DB::raw('COALESCE(reg.name, "Tanzania") as location'),
                'r.rating',
                'c.comment as text',
                'c.created_at',
                DB::raw('COALESCE(f.name, "AfyaMap Facility") as facility'),
            ])
            ->get()
            ->map(function ($t) {
                return [
                    'id'       => $t->id,
                    'name'     => $t->name,
                    'location' => $t->location ?? 'Tanzania',
                    'rating'   => (int) ($t->rating ?? 5),
                    'text'     => $t->text,
                    'date'     => \Carbon\Carbon::parse($t->created_at)->diffForHumans(),
                    'facility' => $t->facility,
                ];
            })
            ->values()
            ->all();

        return Inertia::render('Home', [
            'facilities'   => $facilities,
            'regions'      => $regions,
            'categories'   => $categories,
            'services'     => $services,
            'insurances'   => $insurances,
            'stats'        => $this->getStats(),
            'testimonials' => $testimonials,
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FACILITIES LIST
    // ─────────────────────────────────────────────────────────────────────────
    public function facilitiesList(Request $request)
    {
        $query = $this->buildFacilityQuery()
            ->where('f.status', 1)
            ->whereNull('f.deleted_at');

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

        if ($request->filled('category')) {
            $cat = $request->category;
            is_numeric($cat)
                ? $query->where('f.category_id', $cat)
                : $query->where('c.name', $cat);
        }

        if ($request->filled('region')) {
            $reg = $request->region;
            is_numeric($reg)
                ? $query->where('f.region_id', $reg)
                : $query->where('r.name', $reg);
        }

        if ($request->filled('district')) {
            $dist = $request->district;
            is_numeric($dist)
                ? $query->where('f.district_id', $dist)
                : $query->where('d.name', $dist);
        }

        if ($request->filled('level')) {
            $query->where('f.safecare_level', '>=', (int) $request->level);
        }

        if ($request->filled('service')) {
            $srv = $request->service;
            $query->whereExists(function ($sub) use ($srv) {
                $sub->select(DB::raw(1))
                    ->from('tbl_facility_services as fs')
                    ->whereColumn('fs.facility_id', 'f.facility_id');

                is_numeric($srv)
                    ? $sub->where('fs.service_id', $srv)
                    : $sub->join('tbl_services as s', 's.service_id', '=', 'fs.service_id')
                          ->where('s.name', $srv);
            });
        }

        if ($request->filled('insurance')) {
            $ins = $request->insurance;
            $query->whereExists(function ($sub) use ($ins) {
                $sub->select(DB::raw(1))
                    ->from('tbl_facility_insurances as fi')
                    ->whereColumn('fi.facility_id', 'f.facility_id');

                is_numeric($ins)
                    ? $sub->where('fi.insurance_id', $ins)
                    : $sub->join('tbl_insurances as i', 'i.insurance_id', '=', 'fi.insurance_id')
                          ->where('i.name', $ins);
            });
        }

        if ($request->filled('jci') && $request->jci == '1') {
            $query->where('f.is_accredited', 1);
        }

        $rawFacilities = $query
            ->orderBy('f.name', 'asc')
            ->get();

        $facilities = $this->mapFacilitiesWithRelations($rawFacilities);

        $regions         = $this->getRegions();
        $categories      = $this->getCategories();
        $servicesGrouped = $this->getGroupedServices();
        $servicesFlat    = $this->getServices();
        $insurances      = $this->getInsurances();

        $districts = $request->filled('region')
            ? District::where('region_id', $request->region)
                ->where('status', 1)
                ->orderBy('name')
                ->get(['district_id', 'name'])
                ->map(fn($d) => ['id' => $d->district_id, 'name' => $d->name])
                ->values()
            : collect();

        return Inertia::render('FacilitiesList', [
            'facilities'   => $facilities,
            'regions'      => $regions,
            'categories'   => $categories,
            'services'     => $servicesGrouped,
            'servicesFlat' => $servicesFlat,
            'insurances'   => $insurances,
            'districts'    => $districts,
            'filters'      => $request->only(['q', 'region', 'district', 'category', 'service', 'insurance', 'level', 'jci']),
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FACILITY DETAIL
    // ─────────────────────────────────────────────────────────────────────────
    public function facilityDetail($id)
    {
        $row = $this->buildFacilityQuery()
            ->where('f.facility_id', $id)
            ->whereNull('f.deleted_at')
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

        // ── Payment Methods ──────────────────────────────────────────────────
        $paymentMethods = DB::table('tbl_facility_payment_methods as fpm')
            ->join('tbl_payment_methods as pm', 'pm.payment_method_id', '=', 'fpm.payment_method_id')
            ->where('fpm.facility_id', $id)
            ->where('fpm.status', 1)
            ->where('pm.status', 1)
            ->orderBy('pm.sort_order', 'asc')
            ->select([
                'pm.payment_method_id as id',
                'pm.name',
                'pm.short_code',
                'pm.type',
                'pm.icon',
                'pm.description'
            ])
            ->get()
            ->toArray();

        // ── Gallery ───────────────────────────────────────────────────────────
        $imageBaseUrl = $this->getImageBaseUrl();
        $gallery = DB::table('tbl_facility_images')
            ->where('facility_id', $id)
            ->where('status', 1)
            ->orderBy('sort_order')
            ->pluck('image_path')
            ->map(fn($p) => $imageBaseUrl . '/uploads/facilities/gallery/' . $p)
            ->values()
            ->all();

        if (empty($gallery) && $row->logo) {
            $gallery = [$imageBaseUrl . '/uploads/facilities/' . $row->logo];
        }

        // ── Comments ─────────────────────────────────────────────────────────
        $comments = DB::table('tbl_user_comments as c')
            ->leftJoin('tbl_users as u', 'u.user_id', '=', 'c.user_id')
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
                DB::raw('COALESCE(u.name, "Anonymous") as name'),
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

        // ── Ratings — all computed live ──────────────────────────────────────
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

        $avgRating   = DB::table('tbl_user_ratings')->where('facility_id', $id)->avg('rating');
        $ratingCount = DB::table('tbl_user_ratings')->where('facility_id', $id)->count();

        $facilityRating      = $ratingCount > 0 ? round((float) $avgRating, 1) : 0.0;
        $facilityReviewCount = DB::table('tbl_user_comments')
            ->where('facility_id', $id)
            ->where('status', 1)
            ->count();

        $mappedFacility = $this->mapFacility($row);
        $mappedFacility['rating']      = $facilityRating;
        $mappedFacility['reviewCount'] = $facilityReviewCount;

        $facility = array_merge($mappedFacility, [
            'services'        => $services,
            'insurances'      => $insurances,
            'payment_methods' => $paymentMethods,
            'gallery'         => $gallery,
            'description'     => null,
            'open_time'       => $row->open_time   ?? null,
            'close_time'      => $row->close_time  ?? null,
            'opening_days'    => $row->opening_days ?? null,
            'beds'            => null,
            'established'     => null,
            'languages'       => [],
        ]);

        return Inertia::render('FacilityDetail', [
            'facility'           => $facility,
            'comments'           => $comments,
            'ratingDistribution' => $ratingDistribution,
        ]);
    }

    /**
     * Store a facility review + comment.
     *
     * NOTE: This does NOT update tbl_facilities. All counts/averages
     * are computed live on read, so the stale denormalized columns
     * are simply ignored.
     */
    public function storeReview(Request $request, $id)
    {
        $request->validate([
            'rating'  => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $userId = Auth::id();

        // 1. Rating
        DB::table('tbl_user_ratings')->updateOrInsert(
            ['facility_id' => $id, 'user_id' => $userId],
            ['rating' => $request->rating, 'created_at' => now()]
        );

        // 2. Comment
        DB::table('tbl_user_comments')->insert([
            'facility_id' => $id,
            'user_id'     => $userId,
            'comment'     => $request->comment,
            'status'      => 1,
            'created_at'  => now(),
        ]);

        // 3. Nothing else — no facility counter update.

        return redirect()->back()->with('success', 'Thank you! Your review has been submitted successfully.');
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ABOUT
    // ─────────────────────────────────────────────────────────────────────────
    public function about()
    {
        return Inertia::render('About', [
            'stats' => $this->getStats(),
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CONTACT
    // ─────────────────────────────────────────────────────────────────────────
    public function contact()
    {
        return Inertia::render('Contact');
    }

    public function sendContact(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|email|max:255',
            'inquiry_type' => 'required|string|max:255',
            'message'      => 'required|string|max:5000',
        ]);

        try {
            $name    = $validated['name'];
            $email   = $validated['email'];
            $type    = $validated['inquiry_type'];
            $message = $validated['message'];

            $emailBody = "
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; color: #333; }
                    h2 { color: #0065B3; border-bottom: 2px solid #0065B3; padding-bottom: 10px; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    td { padding: 10px; border: 1px solid #ddd; }
                    td.label { font-weight: bold; background: #f5f5f5; width: 150px; }
                    .message-box { background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; }
                </style>
            </head>
            <body>
                <h2>📩 New Contact Form Message</h2>
                <p><strong>Submitted on:</strong> " . date('Y-m-d H:i:s') . "</p>

                <table>
                    <tr><td class='label'>Name</td><td>$name</td></tr>
                    <tr><td class='label'>Email</td><td>$email</td></tr>
                    <tr><td class='label'>Inquiry Type</td><td>$type</td></tr>
                </table>

                <h3>📝 Message:</h3>
                <div class='message-box'>" . nl2br($message) . "</div>

                <hr>
                <p style='color: #999; font-size: 12px;'>This message was sent from the AfyaMap Contact form.</p>
            </body>
            </html>
            ";

            Mail::send([], [], function ($message) use ($emailBody, $validated) {
                $message->to('info@afyamap.tz')
                    ->from('info@afyamap.tz', 'AfyaMap')
                    ->replyTo($validated['email'], $validated['name'])
                    ->subject('New Contact Form Message - AfyaMap')
                    ->html($emailBody);
            });

            return redirect()->back()->with('success', 'Thank you! Your message has been sent successfully.');

        } catch (\Exception $e) {
            \Log::error('Contact form error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to send message. Please try again or contact us directly.');
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PRIVACY & TERMS
    // ─────────────────────────────────────────────────────────────────────────
    public function privacy()
    {
        return Inertia::render('Privacy');
    }

    public function terms()
    {
        return Inertia::render('Terms');
    }

    // =========================================================================
    // PRIVATE HELPERS
    // =========================================================================

    /**
     * Site-wide stats — all computed live, nothing read from stale columns.
     */
    private function getStats(): array
    {
        return [
            'facilities' => DB::table('tbl_facilities')
                ->where('status', 1)
                ->whereNull('deleted_at')
                ->count(),

            'regions' => DB::table('tbl_facilities')
                ->where('status', 1)
                ->whereNull('deleted_at')
                ->whereNotNull('region_id')
                ->where('region_id', '>', 0)
                ->distinct('region_id')
                ->count('region_id'),

            // Live count of approved comments on live facilities.
            'reviews' => DB::table('tbl_user_comments as c')
                ->join('tbl_facilities as f', 'f.facility_id', '=', 'c.facility_id')
                ->where('c.status', 1)
                ->where('f.status', 1)
                ->whereNull('f.deleted_at')
                ->count(),
        ];
    }

    /**
     * Base facility query. Only selects columns that physically exist on
     * tbl_facilities — we do NOT rely on average_rating / total_reviews
     * being accurate (they're computed live instead).
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
     * Map a raw facility row. rating/reviewCount are set to placeholder
     * values here — mapFacilitiesWithRelations() overwrites them with
     * live-computed values.
     */
    private function mapFacility($row): array
    {
        $logo = null;
        if (!empty($row->logo)) {
            $imageBaseUrl = $this->getImageBaseUrl();
            $logo = $imageBaseUrl . '/uploads/facilities/' . $row->logo;
        }

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
            'rating'        => 0.0,   // filled in live below
            'reviewCount'   => 0,     // filled in live below
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
     * Map facilities and attach services, insurances, live ratings,
     * and live review counts. Three batch queries total — no N+1.
     */
    private function mapFacilitiesWithRelations($rawFacilities)
    {
        $facilityIds = $rawFacilities->pluck('facility_id')->all();

        // ── Services grouped by category ─────────────────────────────────────
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
                $servicesByFacility[$srv->facility_id][$srv->category_name][] = $srv->service_name;
            }
        }

        // ── Insurances ────────────────────────────────────────────────────────
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

        // ── Live review counts (approved comments) ────────────────────────────
        $reviewCountByFacility = [];
        if (!empty($facilityIds)) {
            $reviewCounts = DB::table('tbl_user_comments')
                ->whereIn('facility_id', $facilityIds)
                ->where('status', 1)
                ->select('facility_id', DB::raw('COUNT(*) as cnt'))
                ->groupBy('facility_id')
                ->pluck('cnt', 'facility_id');

            foreach ($reviewCounts as $fid => $cnt) {
                $reviewCountByFacility[$fid] = (int) $cnt;
            }
        }

        // ── Live rating averages ──────────────────────────────────────────────
        $ratingByFacility = [];
        if (!empty($facilityIds)) {
            $ratingAvgs = DB::table('tbl_user_ratings')
                ->whereIn('facility_id', $facilityIds)
                ->select('facility_id', DB::raw('AVG(rating) as avg_rating'))
                ->groupBy('facility_id')
                ->pluck('avg_rating', 'facility_id');

            foreach ($ratingAvgs as $fid => $avg) {
                $ratingByFacility[$fid] = round((float) $avg, 1);
            }
        }

        return $rawFacilities->map(function ($f) use (
            $servicesByFacility,
            $insurancesByFacility,
            $reviewCountByFacility,
            $ratingByFacility
        ) {
            $mapped = $this->mapFacility($f);

            $mapped['services']    = $servicesByFacility[$f->facility_id]   ?? [];
            $mapped['insurances']  = $insurancesByFacility[$f->facility_id] ?? [];
            $mapped['reviewCount'] = $reviewCountByFacility[$f->facility_id] ?? 0;
            $mapped['rating']      = $ratingByFacility[$f->facility_id]     ?? 0.0;

            return $mapped;
        })->values()->all();
    }

    /**
     * Get regions with live facility counts.
     */
    private function getRegions(): array
    {
        $counts = DB::table('tbl_facilities')
            ->where('status', 1)
            ->whereNull('deleted_at')
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
     * Get categories (excludes Faith-based / NGO).
     */
    private function getCategories(): array
    {
        $excludedCategories = [
            'Faith-based / NGO (non-profit)',
            'Faith-based',
            'NGO',
            'Faith-based / NGO',
        ];

        $counts = DB::table('tbl_facilities')
            ->where('status', 1)
            ->whereNull('deleted_at')
            ->whereNotNull('category_id')
            ->select('category_id', DB::raw('COUNT(*) as cnt'))
            ->groupBy('category_id')
            ->pluck('cnt', 'category_id');

        return FacilityCategory::where('status', 1)
            ->whereNotIn('name', $excludedCategories)
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
     * Get services grouped by category.
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
            $services[$sd->category_name][] = $sd->service_name;
        }

        return $services;
    }

    /**
     * Get flat list of services.
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