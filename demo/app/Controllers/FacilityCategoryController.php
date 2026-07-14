<?php

namespace App\Controllers;

use App\Models\FacilityCategoryModel;

class FacilityCategoryController extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new FacilityCategoryModel();
    }

    public function index()
    {
        $data['categories'] = $this->model->getAll();
        return view('site/facility_category/index', $data);
    }

    public function create()
    {
        $data['categories'] = $this->model->getAll();
        return view('site/facility_category/create', $data);
    }

    public function store()
    {
        $icon = $this->request->getFile('icon');
        $fileName = null;

        if ($icon && $icon->isValid() && !$icon->hasMoved()) {
            $fileName = $icon->getRandomName();
            $icon->move('uploads/facility_categories/', $fileName);
        }

        $this->model->save([
            'name'        => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'icon'        => $fileName,
            'status'      => $this->request->getPost('status'),
        ]);

        return redirect()->back()->with('success', 'Category created successfully');
    }

    public function edit($id)
    {
        $data['category']  = $this->model->find($id);
        $data['categories'] = $this->model->getAll();

        return view('site/facility_category/edit', $data);
    }

    public function update($id)
    {
        $category = $this->model->find($id);

        $icon = $this->request->getFile('icon');
        $fileName = $category['icon'];

        if ($icon && $icon->isValid() && !$icon->hasMoved()) {
            $fileName = $icon->getRandomName();
            $icon->move('uploads/facility_categories/', $fileName);
        }

        $this->model->update($id, [
            'name'        => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'icon'        => $fileName,
            'status'      => $this->request->getPost('status'),
        ]);

        return redirect()->back()->with('success', 'Category updated successfully');
    }

    public function delete($id)
    {
        $this->model->delete($id);
        return redirect()->back()->with('success', 'Category deleted successfully');
    }
}