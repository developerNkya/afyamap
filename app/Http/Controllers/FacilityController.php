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
        return Inertia::render('AdminDashboard', [
            'facilities' => $facilities,
            'flash'      => session()->only(['success', 'error']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'region'       => 'required|string',
            'category'     => 'required|string',
            'safeCareLevel'=> 'required|integer|min:1|max:5',
            'jciAccredited'=> 'boolean',
            'description'  => 'nullable|string',
            'address'      => 'nullable|string',
            'phone'        => 'nullable|string',
            'email'        => 'nullable|email',
            'hours'        => 'nullable|string',
            'established'  => 'nullable|string',
            'beds'         => 'nullable|string',
            'emergency247' => 'boolean',
            'services'     => 'nullable|array',
            'insurances'   => 'nullable|array',
            'languages'    => 'nullable|array',
            'image'        => 'nullable|string',
            'lat'          => 'nullable|numeric',
            'lng'          => 'nullable|numeric',
        ]);

        // Default values for fields not in the form
        $validated['rating']      = 0;
        $validated['reviewCount'] = 0;
        $validated['gallery']     = $validated['image'] ? [$validated['image']] : [];

        Facility::create($validated);

        return redirect()->route('admin.dashboard')
            ->with('success', "Facility '{$validated['name']}' added successfully.");
    }

    public function update(Request $request, $id)
    {
        $facility = Facility::findOrFail($id);

        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'region'       => 'required|string',
            'category'     => 'required|string',
            'safeCareLevel'=> 'required|integer|min:1|max:5',
            'jciAccredited'=> 'boolean',
            'description'  => 'nullable|string',
            'address'      => 'nullable|string',
            'phone'        => 'nullable|string',
            'email'        => 'nullable|email',
            'hours'        => 'nullable|string',
            'established'  => 'nullable|string',
            'beds'         => 'nullable|string',
            'emergency247' => 'boolean',
            'services'     => 'nullable|array',
            'insurances'   => 'nullable|array',
            'languages'    => 'nullable|array',
            'image'        => 'nullable|string',
            'lat'          => 'nullable|numeric',
            'lng'          => 'nullable|numeric',
        ]);

        if (!empty($validated['image'])) {
            $gallery = $facility->gallery ?? [];
            if (!in_array($validated['image'], $gallery)) {
                $gallery[] = $validated['image'];
            }
            $validated['gallery'] = $gallery;
        }

        $facility->update($validated);

        return redirect()->route('admin.dashboard')
            ->with('success', "Facility '{$facility->name}' updated successfully.");
    }

    public function destroy($id)
    {
        $facility = Facility::findOrFail($id);
        $name = $facility->name;
        $facility->delete();

        return redirect()->route('admin.dashboard')
            ->with('success', "Facility '{$name}' deleted successfully.");
    }
}
