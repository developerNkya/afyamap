<?php

namespace App\Controllers;

use App\Models\ServiceModel;
use App\Models\ServiceCategoryModel;

class ServiceController extends BaseController
{
    protected $serviceModel;
    protected $categoryModel;

    public function __construct()
    {
        $this->serviceModel  = new ServiceModel();
        $this->categoryModel = new ServiceCategoryModel();
    }

    public function index()
    {
        $data['services'] = $this->serviceModel->getAllWithCategory();
        return view('site/service/index', $data);
    }

    public function create()
    {
        $data['services']   = $this->serviceModel->getAllWithCategory();
        $data['categories'] = $this->categoryModel->where('status', 1)->findAll();

        return view('site/service/create', $data);
    }

    public function store()
    {
        $this->serviceModel->save([
            'category_id' => $this->request->getPost('category_id'),
            'name'        => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'status'      => $this->request->getPost('status'),
        ]);

        return redirect()->back()->with('success', 'Service created successfully');
    }

    public function edit($id)
    {
        $data['service']    = $this->serviceModel->find($id);
        $data['services']   = $this->serviceModel->getAllWithCategory();
        $data['categories'] = $this->categoryModel->where('status', 1)->findAll();

        return view('site/service/edit', $data);
    }

    public function update($id)
    {
        $this->serviceModel->update($id, [
            'category_id' => $this->request->getPost('category_id'),
            'name'        => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'status'      => $this->request->getPost('status'),
        ]);

        return redirect()->back()->with('success', 'Service updated successfully');
    }

    public function delete($id)
    {
        $this->serviceModel->delete($id);
        return redirect()->back()->with('success', 'Service deleted successfully');
    }
}