<?php

namespace App\Controllers;

use App\Models\RoleModel;

class RoleController extends BaseController
{
    protected $roleModel;

    public function __construct()
    {
        $this->roleModel = new RoleModel();
    }

    // ================= INDEX =================
    public function index()
    {
        $data['roles'] = $this->roleModel
            ->orderBy('role_id', 'DESC')
            ->findAll();

        return view('site/roles/index', $data);
    }

    // ================= CREATE =================
    public function create()
    {
        return view('site/roles/create');
    }

    // ================= STORE =================
    public function store()
    {
        $name = trim($this->request->getPost('name'));

        if (empty($name)) {
            return redirect()->back()->with('error', 'Role name is required');
        }

        // Optional: prevent duplicates
        $exists = $this->roleModel->where('name', $name)->first();

        if ($exists) {
            return redirect()->back()->with('error', 'Role already exists');
        }

        $this->roleModel->insert([
            'name'   => $name,
            'status' => 1
        ]);

        return redirect()->to('roles')->with('success', 'Role created successfully');
    }

    // ================= EDIT =================
    public function edit($id)
    {
        $role = $this->roleModel->find($id);

        if (!$role) {
            return redirect()->to('roles')->with('error', 'Role not found');
        }

        return view('site/roles/edit', [
            'role' => $role
        ]);
    }

    // ================= UPDATE =================
    public function update($id)
    {
        $role = $this->roleModel->find($id);

        if (!$role) {
            return redirect()->to('roles')->with('error', 'Role not found');
        }

        $name = trim($this->request->getPost('name'));

        if (empty($name)) {
            return redirect()->back()->with('error', 'Role name is required');
        }

        $this->roleModel->update($id, [
            'name' => $name
        ]);

        return redirect()->to('roles')->with('success', 'Role updated successfully');
    }

    // ================= DELETE =================
    public function delete($id)
    {
        $role = $this->roleModel->find($id);

        if (!$role) {
            return redirect()->to('roles')->with('error', 'Role not found');
        }

        $this->roleModel->delete($id);

        return redirect()->to('roles')->with('success', 'Role deleted successfully');
    }
}