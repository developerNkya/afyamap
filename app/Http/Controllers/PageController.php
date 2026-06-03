<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        return Inertia::render('Home', [
            'facilities' => Facility::all()
        ]);
    }

    public function facilitiesList()
    {
        return Inertia::render('FacilitiesList', [
            'facilities' => Facility::all()
        ]);
    }

    public function facilityDetail($id)
    {
        return Inertia::render('FacilityDetail', [
            'facility' => Facility::findOrFail($id)
        ]);
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
