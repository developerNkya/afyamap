<?php

namespace App\Controllers;

use App\Models\ServiceCategoryModel;

class ServiceCategoryController extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new ServiceCategoryModel();
    }

    public function index()
    {
        $data['categories'] = $this->model->orderBy('category_id', 'DESC')->findAll();
        return view('site/service_category/index', $data);
    }

    public function create()
    {
        $data['categories'] = $this->model->findAll();
        return view('site/service_category/create', $data);
    }

    public function store()
    {
        $file = $this->request->getFile('icon');
        $fileName = null;

        if ($file && $file->isValid() && !$file->hasMoved()) {
            $fileName = $file->getRandomName();
            $file->move('uploads/service_categories', $fileName);
        }

        $this->model->save([
            'name' => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'icon' => $fileName,
            'status' => $this->request->getPost('status'),
        ]);

        return redirect()->back()->with('success', 'Category created successfully');
    }

    public function edit($id)
    {
        $data['category'] = $this->model->find($id);
        $data['categories'] = $this->model->findAll();

        return view('site/service_category/edit', $data);
    }

    public function update($id)
    {
        $category = $this->model->find($id);

        $file = $this->request->getFile('icon');
        $fileName = $category['icon'];

        if ($file && $file->isValid() && !$file->hasMoved()) {
            $fileName = $file->getRandomName();
            $file->move('uploads/service_categories', $fileName);
        }

        $this->model->update($id, [
            'name' => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'icon' => $fileName,
            'status' => $this->request->getPost('status'),
        ]);

        return redirect()->back()->with('success', 'Category updated successfully');
    }

    public function delete($id)
    {
        $this->model->delete($id);
        return redirect()->back()->with('success', 'Category deleted successfully');
    }
}