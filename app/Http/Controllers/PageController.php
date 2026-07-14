<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        $facilities = Facility::select('id','name','region','category','safeCareLevel',
            'jciAccredited','rating','reviewCount','services','insurances','image')
            ->get();

        return Inertia::render('Home', ['facilities' => $facilities]);
    }

    public function facilitiesList(Request $request)
    {
        $query = Facility::query();

        if ($request->filled('q')) {
            $search = $request->q;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('region', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
            });
        }
        if ($request->filled('region')) {
            $query->where('region', $request->region);
        }
        if ($request->filled('level')) {
            $query->where('safeCareLevel', '>=', (int)$request->level);
        }

        $facilities = $query->orderBy('safeCareLevel', 'desc')->get();

        return Inertia::render('FacilitiesList', [
            'facilities' => $facilities,
            'filters'    => $request->only(['q','region','level']),
        ]);
    }

    public function facilityDetail($id)
    {
        $facility = Facility::findOrFail($id);
        return Inertia::render('FacilityDetail', ['facility' => $facility]);
    }

    public function about()
    {
        return Inertia::render('About');
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }
}
