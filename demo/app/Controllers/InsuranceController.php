<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\InsuranceModel;

class InsuranceController extends BaseController
{
    protected $insuranceModel;

    /**
     * INIT CONTROLLER (BEST PRACTICE)
     */
    public function initController($request, $response, $logger)
    {
        parent::initController($request, $response, $logger);

        $this->insuranceModel = new InsuranceModel();
    }

    /**
     * LIST ALL
     */
    public function index()
    {
        $data['insurances'] = $this->insuranceModel->getAll();

        return view('site/insurance/index', $data);
    }

    /**
     * CREATE FORM
     */
    public function create()
    { $data['insurances'] = $this->insuranceModel->getAll();
        return view('site/insurance/create',$data);
    }

    /**
     * STORE
     */
    public function store()
    {
        $validation = \Config\Services::validation();

        $validation->setRules([
            'name'        => 'required|min_length[3]',
            'short_code'  => 'required|max_length[10]',
            'status'      => 'required|in_list[0,1]',
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return view('site/insurance/create', [
                'validation' => $validation
            ]);
        }

        // FILE UPLOAD
        $icon = $this->request->getFile('icon');
        $iconName = null;

        if ($icon && $icon->isValid() && !$icon->hasMoved()) {
            $iconName = $icon->getRandomName();
            $icon->move('uploads/insurances', $iconName);
        }

        $this->insuranceModel->save([
            'name'        => $this->request->getPost('name'),
            'short_code'  => $this->request->getPost('short_code'),
            'description' => $this->request->getPost('description'),
            'status'      => $this->request->getPost('status'),
            'icon'        => $iconName
        ]);

        return redirect()->to('/insurance')->with('success', 'Insurance created successfully');
    }

    /**
     * EDIT FORM
     */
    public function edit($id)
    {
        $insurance = $this->insuranceModel->find($id);
        $data['insurances'] = $this->insuranceModel->getAll();
        if (!$insurance) {
            throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
        }
        $data['insurance']=$insurance;
        return view('site/insurance/edit',$data);
    }

    /**
     * UPDATE
     */
    public function update($id)
    {
        $insurance = $this->insuranceModel->find($id);

        if (!$insurance) {
            throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
        }

        $validation = \Config\Services::validation();

        $validation->setRules([
            'name'        => 'required|min_length[3]',
            'short_code'  => 'required|max_length[10]',
            'status'      => 'required|in_list[0,1]',
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return view('site/insurance/edit', [
                'insurance'  => $insurance,
                'validation' => $validation
            ]);
        }

        // FILE UPDATE
        $icon = $this->request->getFile('icon');
        $iconName = $insurance['icon'];

        if ($icon && $icon->isValid() && !$icon->hasMoved()) {
            $iconName = $icon->getRandomName();
            $icon->move('uploads/insurances', $iconName);
        }

        $this->insuranceModel->update($id, [
            'name'        => $this->request->getPost('name'),
            'short_code'  => $this->request->getPost('short_code'),
            'description' => $this->request->getPost('description'),
            'status'      => $this->request->getPost('status'),
            'icon'        => $iconName
        ]);

        return redirect()->to('/insurance')->with('success', 'Insurance updated successfully');
    }

    /**
     * DELETE
     */
    public function delete($id)
    {
        $insurance = $this->insuranceModel->find($id);

        if (!$insurance) {
            return redirect()->to('/insurance')->with('error', 'Insurance not found');
        }

        $this->insuranceModel->delete($id);

        return redirect()->to('/insurance')->with('success', 'Insurance deleted successfully');

    }

    /**
     * TOGGLE STATUS (1 ↔ 0)
     */
    public function toggle($id)
    {
        $this->insuranceModel->toggleStatus($id);

        return redirect()->to('/insurance')->with('success', 'Status updated');
    }
}