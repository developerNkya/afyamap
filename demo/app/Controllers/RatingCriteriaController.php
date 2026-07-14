<?php

namespace App\Controllers;

use App\Models\RatingCriteriaModel;

class RatingCriteriaController extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new RatingCriteriaModel();
    }

    public function index()
    {
        $data['criteria'] = $this->model->orderBy('criteria_id', 'DESC')->findAll();
        return view('site/rating_criteria/index', $data);
    }

    public function create()
    {   $data['criteria'] = $this->model->orderBy('criteria_id', 'DESC')->findAll();
        return view('site/rating_criteria/create',$data);
    }

    public function store()
    {
        $this->model->save([
            'name'        => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'max_score'   => $this->request->getPost('max_score'),
            'status'      => $this->request->getPost('status')
        ]);

        return redirect()->to('rating-criteria')->with('success', 'Criteria added');
    }

    public function edit($id)
    {
        $data['item'] = $this->model->find($id);

        if (!$data['item']) {
            return redirect()->to('rating-criteria')->with('error', 'Criteria not found');
        }

        // ADD THIS
        $data['criteria'] = $this->model->orderBy('criteria_id', 'DESC')->findAll();

        return view('site/rating_criteria/edit', $data);
    }

    public function update($id)
    {
        $this->model->update($id, [
            'name'        => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'max_score'   => $this->request->getPost('max_score'),
            'status'      => $this->request->getPost('status')
        ]);

        return redirect()->to('rating-criteria')->with('success', 'Updated');
    }

    public function delete($id)
    {
        $this->model->delete($id);
        return redirect()->back()->with('success', 'Deleted');
    }

    public function toggle($id)
    {
        $row = $this->model->find($id);

        $this->model->update($id, [
            'status' => $row['status'] ? 0 : 1
        ]);

        return redirect()->back()->with('success', 'Status updated');
    }
}