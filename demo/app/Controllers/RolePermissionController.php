<?php

namespace App\Controllers;

use App\Models\RoleModel;
use App\Models\PermissionModel;
use App\Models\RolePermissionModel;

class RolePermissionController extends BaseController
{
    protected $roleModel;
    protected $permissionModel;
    protected $rolePermissionModel;

    public function __construct()
    {
        $this->roleModel           = new RoleModel();
        $this->permissionModel     = new PermissionModel();
        $this->rolePermissionModel = new RolePermissionModel();
    }

    // ================= INDEX =================
    public function index()
    {
        $roles = $this->roleModel->findAll();

        return view('site/roles/assign_permissions', [
            'roles' => $roles
        ]);
    }

    // ================= ASSIGN PAGE =================
    public function assign($role_id)
    {
        $role = $this->roleModel->find($role_id);

        if (!$role) {
            return redirect()->back()->with('error', 'Role not found');
        }

        $blocks = $this->permissionModel->getGrouped();

        $assigned = $this->rolePermissionModel->getPermissionIds($role_id);

        return view('site/roles/assign_permissions_form', [
            'role'      => $role,
            'blocks'    => $blocks,
            'assigned'  => $assigned
        ]);
    }

    // ================= SAVE =================
    public function store($role_id)
    {
        $permissions = $this->request->getPost('permissions');

        $this->rolePermissionModel->syncPermissions($role_id, $permissions ?? []);

        return redirect()->back()->with('success', 'Permissions updated successfully');
    }
}