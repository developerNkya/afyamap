<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 *
 * ============================================================
 * NOTE ON SECURITY
 * ============================================================
 * - AuthFilter runs GLOBALLY (see Config/Filters.php) so every
 *   route below already requires login, except: /, login, 2fa, api/*
 * - 'permission:slug' enforces RBAC per route. Slugs match your
 *   tbl_permissions table (plus the new ones in database_updates.sql)
 */

// ================= HOME =================
$routes->get('/', 'AuthController::login');


// ================= AUTH =================
$routes->get('login', 'AuthController::login');
$routes->post('login', 'AuthController::attempt');
$routes->get('logout', 'AuthController::logout');

// 2FA (login step 2)
$routes->get('2fa', 'AuthController::twoFa');
$routes->post('2fa', 'AuthController::twoFaVerify');

// 2FA setup (logged-in user)
$routes->get('security/2fa', 'AuthController::twoFaSetup');
$routes->post('security/2fa/enable', 'AuthController::twoFaEnable');
$routes->post('security/2fa/disable', 'AuthController::twoFaDisable');

// Live permission refresh
$routes->get('auth/refresh-permissions', 'AuthController::refreshPermissions');


// ================= DASHBOARD =================
$routes->get('dashboard', 'DashboardController::index');


// ================= AUDIT LOGS =================
$routes->get('audit-logs', 'AuditController::index', ['filter' => 'permission:view_audit_logs']);
$routes->get('audit-logs/(:num)', 'AuditController::show/$1', ['filter' => 'permission:view_audit_logs']);


// ================= INSURANCE =================
$routes->get('insurance', 'InsuranceController::index', ['filter' => 'permission:view_insurance']);
$routes->get('insurance/create', 'InsuranceController::create', ['filter' => 'permission:create_insurance']);
$routes->post('insurance/store', 'InsuranceController::store', ['filter' => 'permission:create_insurance']);
$routes->get('insurance/edit/(:num)', 'InsuranceController::edit/$1', ['filter' => 'permission:update_insurance']);
$routes->post('insurance/update/(:num)', 'InsuranceController::update/$1', ['filter' => 'permission:update_insurance']);
$routes->get('insurance/delete/(:num)', 'InsuranceController::delete/$1', ['filter' => 'permission:delete_insurance']);
$routes->get('insurance/toggle/(:num)', 'InsuranceController::toggle/$1', ['filter' => 'permission:update_insurance']);


// ================= SERVICE CATEGORY =================
$routes->get('service-category', 'ServiceCategoryController::index', ['filter' => 'permission:view_service_categories']);
$routes->get('service-category/create', 'ServiceCategoryController::create', ['filter' => 'permission:manage_service_categories']);
$routes->post('service-category/store', 'ServiceCategoryController::store', ['filter' => 'permission:manage_service_categories']);
$routes->get('service-category/edit/(:num)', 'ServiceCategoryController::edit/$1', ['filter' => 'permission:manage_service_categories']);
$routes->post('service-category/update/(:num)', 'ServiceCategoryController::update/$1', ['filter' => 'permission:manage_service_categories']);
$routes->post('service-category/delete/(:num)', 'ServiceCategoryController::delete/$1', ['filter' => 'permission:manage_service_categories']);


// ================= SERVICE =================
$routes->get('service', 'ServiceController::index', ['filter' => 'permission:view_services']);
$routes->get('service/create', 'ServiceController::create', ['filter' => 'permission:create_service']);
$routes->post('service/store', 'ServiceController::store', ['filter' => 'permission:create_service']);
$routes->get('service/edit/(:num)', 'ServiceController::edit/$1', ['filter' => 'permission:update_service']);
$routes->post('service/update/(:num)', 'ServiceController::update/$1', ['filter' => 'permission:update_service']);
$routes->get('service/delete/(:num)', 'ServiceController::delete/$1', ['filter' => 'permission:delete_service']);


// ================= FACILITY CATEGORY =================
$routes->get('facility-category', 'FacilityCategoryController::index', ['filter' => 'permission:view_facility_categories']);
$routes->get('facility-category/create', 'FacilityCategoryController::create', ['filter' => 'permission:manage_facility_categories']);
$routes->post('facility-category/store', 'FacilityCategoryController::store', ['filter' => 'permission:manage_facility_categories']);
$routes->get('facility-category/edit/(:num)', 'FacilityCategoryController::edit/$1', ['filter' => 'permission:manage_facility_categories']);
$routes->post('facility-category/update/(:num)', 'FacilityCategoryController::update/$1', ['filter' => 'permission:manage_facility_categories']);
$routes->get('facility-category/delete/(:num)', 'FacilityCategoryController::delete/$1', ['filter' => 'permission:manage_facility_categories']);


// ================= FACILITY LEVEL =================
$routes->get('facility-levels', 'FacilityLevelController::index', ['filter' => 'permission:view_facility_levels']);
$routes->get('facility-levels/create', 'FacilityLevelController::create', ['filter' => 'permission:manage_facility_levels']);
$routes->post('facility-levels/store', 'FacilityLevelController::store', ['filter' => 'permission:manage_facility_levels']);
$routes->get('facility-levels/edit/(:num)', 'FacilityLevelController::edit/$1', ['filter' => 'permission:manage_facility_levels']);
$routes->post('facility-levels/update/(:num)', 'FacilityLevelController::update/$1', ['filter' => 'permission:manage_facility_levels']);
$routes->get('facility-levels/delete/(:num)', 'FacilityLevelController::delete/$1', ['filter' => 'permission:manage_facility_levels']);


// ================= FACILITIES =================
$routes->get('facilities', 'FacilityController::index', ['filter' => 'permission:view_facility']);
$routes->get('facility/create', 'FacilityController::create', ['filter' => 'permission:create_facility']);
$routes->post('facility/store', 'FacilityController::store', ['filter' => 'permission:create_facility']);
$routes->get('facility/edit/(:num)', 'FacilityController::edit/$1', ['filter' => 'permission:edit_facility']);
$routes->post('facility/update/(:num)', 'FacilityController::update/$1', ['filter' => 'permission:edit_facility']);
$routes->get('facility/delete/(:num)', 'FacilityController::delete/$1', ['filter' => 'permission:delete_facility']);
$routes->get('facility/toggle/(:num)', 'FacilityController::toggle/$1', ['filter' => 'permission:edit_facility']);


// ================= FACILITY GALLERY =================
$routes->get('facility/gallery/(:num)', 'FacilityController::gallery/$1', ['filter' => 'permission:view_facility_gallery']);
$routes->post('facility/gallery/upload/(:num)', 'FacilityController::uploadGallery/$1', ['filter' => 'permission:upload_facility_images']);
$routes->get('facility/gallery/delete/(:num)', 'FacilityController::deleteGallery/$1', ['filter' => 'permission:delete_facility_images']);


// ================= FACILITY SERVICES =================
$routes->get('facility/services/(:num)', 'FacilityServiceController::index/$1', ['filter' => 'permission:view_facility_services']);
$routes->post('facility/services/store/(:num)', 'FacilityServiceController::store/$1', ['filter' => 'permission:assign_facility_services']);
$routes->get('facility/services/delete/(:num)', 'FacilityServiceController::delete/$1', ['filter' => 'permission:remove_facility_services']);
$routes->get('facility/services/toggle/(:num)', 'FacilityServiceController::toggle/$1', ['filter' => 'permission:assign_facility_services']);


// ================= FACILITY INSURANCES =================
$routes->get('facility/insurances/(:num)', 'FacilityInsuranceController::index/$1', ['filter' => 'permission:view_facility_insurance']);
$routes->post('facility/insurances/store/(:num)', 'FacilityInsuranceController::store/$1', ['filter' => 'permission:assign_facility_insurance']);
$routes->get('facility/insurances/delete/(:num)', 'FacilityInsuranceController::delete/$1', ['filter' => 'permission:remove_facility_insurance']);
$routes->get('facility/insurances/toggle/(:num)', 'FacilityInsuranceController::toggle/$1', ['filter' => 'permission:assign_facility_insurance']);


// ================= FACILITY IMPORT =================
$routes->get('facilities/import', 'FacilityImportController::index', ['filter' => 'permission:import_facilities']);
$routes->post('facilities/import/preview', 'FacilityImportController::preview', ['filter' => 'permission:import_facilities']);
$routes->post('facilities/import/save', 'FacilityImportController::saveImport', ['filter' => 'permission:import_facilities']);


// ================= INTERNAL API (location dropdowns) =================
$routes->get('api/regions/(:num)', 'FacilityController::regions/$1');
$routes->get('api/districts/(:num)', 'FacilityController::districts/$1');


// ================= RATING CRITERIA =================
$routes->get('rating-criteria', 'RatingCriteriaController::index', ['filter' => 'permission:view_rating_criteria']);
$routes->get('rating-criteria/create', 'RatingCriteriaController::create', ['filter' => 'permission:create_rating_criteria']);
$routes->post('rating-criteria/store', 'RatingCriteriaController::store', ['filter' => 'permission:create_rating_criteria']);
$routes->get('rating-criteria/edit/(:num)', 'RatingCriteriaController::edit/$1', ['filter' => 'permission:edit_rating_criteria']);
$routes->post('rating-criteria/update/(:num)', 'RatingCriteriaController::update/$1', ['filter' => 'permission:edit_rating_criteria']);
$routes->get('rating-criteria/delete/(:num)', 'RatingCriteriaController::delete/$1', ['filter' => 'permission:delete_rating_criteria']);
$routes->get('rating-criteria/toggle/(:num)', 'RatingCriteriaController::toggle/$1', ['filter' => 'permission:edit_rating_criteria']);


// ================= FACILITY RATING =================
$routes->get('facility/rating/(:num)', 'FacilityRatingController::index/$1', ['filter' => 'permission:view_facility_rating']);
$routes->post('facility/rating/store/(:num)', 'FacilityRatingController::store/$1', ['filter' => 'permission:rate_facility']);
$routes->get('facility/select-for-rating', 'FacilityRatingController::select', ['filter' => 'permission:view_facility_rating']);


// ================= PERMISSIONS (definitions) =================
$routes->get('permissions', 'PermissionController::index', ['filter' => 'permission:manage_permissions']);
$routes->post('permission-block/store', 'PermissionController::storeBlock', ['filter' => 'permission:manage_permissions']);
$routes->post('permission/store', 'PermissionController::storePermission', ['filter' => 'permission:manage_permissions']);
$routes->get('permission/toggle/(:num)', 'PermissionController::toggle/$1', ['filter' => 'permission:manage_permissions']);
$routes->get('permission/delete/(:num)', 'PermissionController::delete/$1', ['filter' => 'permission:manage_permissions']);
$routes->get('permission-block/delete/(:num)', 'PermissionController::deleteBlock/$1', ['filter' => 'permission:manage_permissions']);


// ================= ROLES =================
$routes->get('roles', 'RoleController::index', ['filter' => 'permission:view_roles']);
$routes->get('roles/create', 'RoleController::create', ['filter' => 'permission:create_roles']);
$routes->post('roles/store', 'RoleController::store', ['filter' => 'permission:create_roles']);
$routes->get('roles/edit/(:num)', 'RoleController::edit/$1', ['filter' => 'permission:edit_roles']);
$routes->post('roles/update/(:num)', 'RoleController::update/$1', ['filter' => 'permission:edit_roles']);
$routes->get('roles/delete/(:num)', 'RoleController::delete/$1', ['filter' => 'permission:delete_roles']);


// ================= ROLE PERMISSIONS =================
$routes->get('roles/permissions', 'RolePermissionController::index', ['filter' => 'permission:assign_permissions']);
$routes->get('roles/permissions/(:num)', 'RolePermissionController::assign/$1', ['filter' => 'permission:assign_permissions']);
$routes->post('roles/permissions/store/(:num)', 'RolePermissionController::store/$1', ['filter' => 'permission:assign_permissions']);


// ================= USER PERMISSIONS (overrides) =================
$routes->get('users/permissions', 'UserPermissionController::index', ['filter' => 'permission:assign_permissions']);
$routes->get('users/permissions/(:num)', 'UserPermissionController::assign/$1', ['filter' => 'permission:assign_permissions']);
$routes->post('users/permissions/store/(:num)', 'UserPermissionController::store/$1', ['filter' => 'permission:assign_permissions']);


// ================= USERS =================
$routes->get('users', 'UserController::index', ['filter' => 'permission:view_users']);
$routes->get('users/create', 'UserController::create', ['filter' => 'permission:create_users']);
$routes->post('users/store', 'UserController::store', ['filter' => 'permission:create_users']);
$routes->get('users/edit/(:num)', 'UserController::edit/$1', ['filter' => 'permission:edit_users']);
$routes->post('users/update/(:num)', 'UserController::update/$1', ['filter' => 'permission:edit_users']);
$routes->get('users/toggle/(:num)', 'UserController::toggle/$1', ['filter' => 'permission:edit_users']);
$routes->get('users/reset-2fa/(:num)', 'UserController::resetTwoFa/$1', ['filter' => 'permission:edit_users']);


// ================= PUBLIC API - FACILITIES (mobile / frontend) =================
$routes->get('api/facilities', 'Api\FacilityApiController::index');
$routes->get('api/facilities/(:num)', 'Api\FacilityApiController::show/$1');
$routes->post('api/facilities/(:num)/rate', 'Api\FacilityApiController::rate/$1');
