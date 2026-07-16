<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function adminLogin()
    {
        return Inertia::render('AdminLogin');
    }

    public function adminDashboard()
    {
        // Query the normalized tbl_facilities table for admin
        $facilities = DB::table('tbl_facilities as f')
            ->leftJoin('tbl_facility_categories as c', 'c.category_id', '=', 'f.category_id')
            ->leftJoin('tbl_regions as r', 'r.region_id', '=', 'f.region_id')
            ->select([
                'f.facility_id as id',
                'f.name',
                'f.phone',
                'f.email',
                'f.status',
                'f.safecare_level as safeCareLevel',
                'f.average_rating as rating',
                'f.total_reviews as reviewCount',
                'f.is_accredited as jciAccredited',
                'f.logo as image',
                'f.created_at',
                'c.name as category',
                'r.name as region',
            ])
            ->orderBy('f.created_at', 'desc')
            ->get();

        return Inertia::render('AdminDashboard', [
            'facilities' => $facilities,
            'flash'      => session()->only(['success', 'error']),
        ]);
    }

    // Store / Update / Destroy operate on the normalized tbl_facilities table
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'category_id'   => 'nullable|integer',
            'region_id'     => 'nullable|integer',
            'safecare_level'=> 'nullable|integer|min:1|max:5',
            'is_accredited' => 'boolean',
            'description'   => 'nullable|string',
            'address'       => 'nullable|string',
            'street'        => 'nullable|string',
            'phone'         => 'nullable|string',
            'email'         => 'nullable|email',
            'website'       => 'nullable|string',
            'latitude'      => 'nullable|numeric',
            'longitude'     => 'nullable|numeric',
            'status'        => 'nullable|integer',
        ]);

        $validated['created_at'] = now();

        DB::table('tbl_facilities')->insert($validated);

        return redirect()->route('admin.dashboard')
            ->with('success', "Facility '{$validated['name']}' added successfully.");
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'category_id'   => 'nullable|integer',
            'region_id'     => 'nullable|integer',
            'safecare_level'=> 'nullable|integer|min:1|max:5',
            'is_accredited' => 'boolean',
            'description'   => 'nullable|string',
            'address'       => 'nullable|string',
            'street'        => 'nullable|string',
            'phone'         => 'nullable|string',
            'email'         => 'nullable|email',
            'website'       => 'nullable|string',
            'latitude'      => 'nullable|numeric',
            'longitude'     => 'nullable|numeric',
            'status'        => 'nullable|integer',
        ]);

        DB::table('tbl_facilities')
            ->where('facility_id', $id)
            ->update($validated);

        return redirect()->route('admin.dashboard')
            ->with('success', "Facility updated successfully.");
    }

    public function destroy($id)
    {
        $facility = DB::table('tbl_facilities')->where('facility_id', $id)->first();
        $name = $facility ? $facility->name : 'Unknown';

        DB::table('tbl_facilities')->where('facility_id', $id)->delete();

        return redirect()->route('admin.dashboard')
            ->with('success', "Facility '{$name}' deleted successfully.");
    }
}
