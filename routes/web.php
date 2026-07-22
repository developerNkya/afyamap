<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\AdminAuthController;

// ─── Public Pages ──────────────────────────────────────────────────────────────
Route::get('/',             [PageController::class, 'home'])->name('home');
Route::get('/facilities',   [PageController::class, 'facilitiesList'])->name('facilities');
Route::get('/facility/{id}',[PageController::class, 'facilityDetail'])->name('facility.detail');
Route::post('/facility/{id}/review', [PageController::class, 'storeReview'])->name('facility.review')->middleware('auth');
Route::get('/about',        [PageController::class, 'about'])->name('about');
Route::get('/contact',      [PageController::class, 'contact'])->name('contact');

// ─── Admin Auth ─────────────────────────────────────────────────────────────────
Route::get('/admin/login',  [FacilityController::class, 'adminLogin'])->name('admin.login');
Route::post('/admin/auth/login',  [AdminAuthController::class, 'login'])->name('admin.auth.login');
Route::post('/admin/auth/logout', [AdminAuthController::class, 'logout'])->name('admin.auth.logout');

// ─── Admin Protected Routes ─────────────────────────────────────────────────────
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/',                              [FacilityController::class, 'adminDashboard'])->name('dashboard');
    Route::post('/facilities',                   [FacilityController::class, 'store'])->name('facilities.store');
    Route::put('/facilities/{id}',               [FacilityController::class, 'update'])->name('facilities.update');
    Route::delete('/facilities/{id}',            [FacilityController::class, 'destroy'])->name('facilities.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
