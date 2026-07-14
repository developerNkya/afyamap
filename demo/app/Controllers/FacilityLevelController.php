<?php

namespace App\Controllers;

use App\Models\FacilityLevelModel;

class FacilityLevelController extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new FacilityLevelModel();
    }

    public function index()
    {
        $data['levels'] = $this->model->getAll();
        return view('site/facility_levels/index', $data);
    }

    public function create()
    {
        $data['levels'] = $this->model->getAll();
        return view('site/facility_levels/create', $data);
    }

    public function store()
    {
        $this->model->save([
            'name'        => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'rank_order'  => $this->request->getPost('rank_order'),
            'status'      => $this->request->getPost('status'),
        ]);

        return redirect()->back()->with('success', 'Facility level created successfully');
    }

    public function edit($id)
    {
        $data['level']  = $this->model->find($id);
        $data['levels'] = $this->model->getAll();

        return view('site/facility_levels/edit', $data);
    }

    public function update($id)
    {
        $this->model->update($id, [
            'name'        => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'rank_order'  => $this->request->getPost('rank_order'),
            'status'      => $this->request->getPost('status'),
        ]);

        return redirect()->back()->with('success', 'Facility level updated successfully');
    }

    public function delete($id)
    {
        $this->model->delete($id);
        return redirect()->back()->with('success', 'Facility level deleted successfully');
    }
}