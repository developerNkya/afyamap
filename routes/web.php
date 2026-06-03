<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PageController;
use App\Http\Controllers\FacilityController;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/facilities', [PageController::class, 'facilitiesList'])->name('facilities');
Route::get('/facility/{id}', [PageController::class, 'facilityDetail'])->name('facility.detail');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

Route::get('/admin/login', [FacilityController::class, 'adminLogin'])->name('admin.login');
Route::get('/admin', [FacilityController::class, 'adminDashboard'])->name('admin.dashboard');
Route::post('/admin/facilities', [FacilityController::class, 'store'])->name('admin.facilities.store');
