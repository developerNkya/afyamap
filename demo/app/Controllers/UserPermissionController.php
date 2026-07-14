<?php

namespace App\Controllers;

use App\Models\PermissionModel;
use App\Models\UserPermissionModel;
use App\Models\RolePermissionModel;
use App\Models\UserModel;

class UserPermissionController extends BaseController
{
    protected $permissionModel;
    protected $userPermissionModel;
    protected $rolePermissionModel;
    protected $userModel;

    public function __construct()
    {
        $this->permissionModel     = new PermissionModel();
        $this->userPermissionModel = new UserPermissionModel();
        $this->rolePermissionModel = new RolePermissionModel();
        $this->userModel           = new UserModel();
    }

    // ================= USER LIST =================
    public function index()
    {
        $users = $this->userModel
            ->select('tbl_users.user_id, tbl_users.username, tbl_users.name, tbl_users.email, tbl_roles.name as role_name')
            ->join('tbl_roles', 'tbl_roles.role_id = tbl_users.role_id', 'left')
            ->orderBy('tbl_users.user_id', 'DESC')
            ->findAll();

        return view('site/users/permissions_index', [
            'users' => $users
        ]);
    }

    // ================= ASSIGN PAGE =================
    public function assign($user_id)
    {
        $user = $this->userModel->find($user_id);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }

        // ✅ ALL PERMISSIONS GROUPED
        $blocks = $this->permissionModel->getGrouped();

        // ✅ ROLE PERMISSIONS (BASELINE)
        $rolePermissions = $this->rolePermissionModel
            ->where('role_id', $user['role_id'])
            ->findColumn('permission_id') ?? [];

        // ✅ USER OVERRIDES
        $existing = $this->userPermissionModel
            ->where('user_id', $user_id)
            ->findAll();

        // Convert to map
        $assigned = [];
        foreach ($existing as $row) {
            $assigned[$row['permission_id']] = $row['action'];
        }

        return view('site/users/permissions_form', [
            'user'            => $user,
            'blocks'          => $blocks,
            'rolePermissions' => $rolePermissions, // 🔥 IMPORTANT
            'assigned'        => $assigned
        ]);
    }

    // ================= STORE =================
    public function store($user_id)
    {
        $permissions = $this->request->getPost('permissions') ?? [];

        // CLEAN + SAFE
        $this->userPermissionModel->where('user_id', $user_id)->delete();

        foreach ($permissions as $permission_id => $action) {

            if (!in_array($action, ['allow', 'deny'])) {
                continue;
            }

            $this->userPermissionModel->insert([
                'user_id'       => $user_id,
                'permission_id' => $permission_id,
                'action'        => $action,
                'created_at'    => date('Y-m-d H:i:s')
            ]);
        }

        return redirect()->back()->with('success', 'User permissions updated');
    }
}