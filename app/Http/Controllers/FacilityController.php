<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function adminLogin()
    {
        return Inertia::render('AdminLogin');
    }

    public function adminDashboard()
    {
        $facilities = Facility::orderBy('created_at', 'desc')->get();
        return Inertia::render('AdminDashboard', ['facilities' => $facilities]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'region' => 'required|string',
            'category' => 'required|string',
            'safeCareLevel' => 'nullable|integer',
            'jciAccredited' => 'boolean',
            'description' => 'nullable|string'
        ]);
        
        // Mock properties for the required fields that aren't in the form
        $validated['rating'] = rand(30, 50) / 10;
        $validated['reviewCount'] = rand(10, 100);
        $validated['services'] = ['Emergency', 'Laboratory', 'Pharmacy', 'Maternity'];
        $validated['insurances'] = ['NHIF', 'Jubilee'];
        $validated['image'] = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800';
        $validated['gallery'] = [
            'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800'
        ];
        $validated['address'] = 'Facility Street';
        $validated['phone'] = '+255 123 456 789';
        $validated['email'] = 'info@facility.com';
        $validated['hours'] = 'Mon-Sun: 8am - 8pm';
        $validated['established'] = '2023';
        $validated['beds'] = '50';
        $validated['emergency247'] = false;
        $validated['languages'] = ['Swahili', 'English'];

        Facility::create($validated);

        return redirect()->back()->with('success', 'Facility created successfully');
    }
}
