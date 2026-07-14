<?php

namespace App\Controllers;

use App\Models\PermissionBlockModel;
use App\Models\PermissionModel;

class PermissionController extends BaseController
{
    protected $blockModel;
    protected $permissionModel;

    public function __construct()
    {
        $this->blockModel      = new PermissionBlockModel();
        $this->permissionModel = new PermissionModel();
    }

    // ================= INDEX =================
    public function index()
    {
        // Use grouped model method (cleaner)
        $blocks = $this->permissionModel->getGrouped();

        return view('site/permissions/index', [
            'blocks' => $blocks
        ]);
    }

    // ================= STORE BLOCK =================
    public function storeBlock()
    {
        $name = trim($this->request->getPost('name'));

        if (empty($name)) {
            return redirect()->back()->with('error', 'Block name is required');
        }

        // ✅ AUTO GENERATE KEY
        $key = strtolower($name);
        $key = preg_replace('/[^a-z0-9\s]/', '', $key);
        $key = preg_replace('/\s+/', '_', $key);

        // Ensure uniqueness
        $originalKey = $key;
        $counter = 1;

        while ($this->blockModel->existsByKey($key)) {
            $key = $originalKey . '_' . $counter;
            $counter++;
        }

        $this->blockModel->insert([
            'name'        => $name,
            'block_key'   => $key,
            'description' => $this->request->getPost('description'),
            'status'      => 1
        ]);

        return redirect()->back()->with('success', 'Permission block created');
    }

    // ================= STORE PERMISSION =================
    public function storePermission()
    {
        $name     = trim($this->request->getPost('name'));
        $block_id = $this->request->getPost('block_id');

        if (empty($name) || empty($block_id)) {
            return redirect()->back()->with('error', 'All fields are required');
        }

        // ✅ AUTO GENERATE SLUG
        $slug = strtolower($name);
        $slug = preg_replace('/[^a-z0-9\s]/', '', $slug);
        $slug = preg_replace('/\s+/', '_', $slug);

        // Ensure uniqueness
        $originalSlug = $slug;
        $counter = 1;

        while ($this->permissionModel->existsBySlug($slug)) {
            $slug = $originalSlug . '_' . $counter;
            $counter++;
        }

        $this->permissionModel->insert([
            'name'        => $name,
            'slug'        => $slug,
            'block_id'    => $block_id,
            'description' => $this->request->getPost('description'),
            'status'      => 1
        ]);

        return redirect()->back()->with('success', 'Permission created');
    }

    // ================= TOGGLE PERMISSION =================
    public function toggle($id)
    {
        $permission = $this->permissionModel->find($id);

        if (!$permission) {
            return redirect()->back()->with('error', 'Permission not found');
        }

        $this->permissionModel->update($id, [
            'status' => $permission['status'] ? 0 : 1
        ]);

        return redirect()->back()->with('success', 'Permission status updated');
    }

    // ================= DELETE PERMISSION =================
    public function delete($id)
    {
        $permission = $this->permissionModel->find($id);

        if (!$permission) {
            return redirect()->back()->with('error', 'Permission not found');
        }

        $this->permissionModel->delete($id);

        return redirect()->back()->with('success', 'Permission deleted');
    }

    // ================= DELETE BLOCK =================
    public function deleteBlock($id)
    {
        $block = $this->blockModel->find($id);

        if (!$block) {
            return redirect()->back()->with('error', 'Block not found');
        }

        if (!$this->blockModel->safeDelete($id)) {
            return redirect()->back()->with('error', 'Cannot delete block with permissions');
        }

        return redirect()->back()->with('success', 'Block deleted');
    }
}