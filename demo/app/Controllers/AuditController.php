<?php

namespace App\Controllers;

use App\Models\AuditLogModel;
use App\Models\UserModel;

class AuditController extends BaseController
{
    protected AuditLogModel $auditModel;

    public function __construct()
    {
        $this->auditModel = new AuditLogModel();
    }

    // ================= LIST =================
    public function index()
    {
        $filters = [
            'user_id'   => $this->request->getGet('user_id'),
            'action'    => $this->request->getGet('action'),
            'module'    => $this->request->getGet('module'),
            'date_from' => $this->request->getGet('date_from'),
            'date_to'   => $this->request->getGet('date_to'),
            'search'    => $this->request->getGet('search'),
        ];

        $logs = $this->auditModel
            ->filtered($filters)
            ->paginate(50);

        $users = (new UserModel())
            ->select('user_id, name, email')
            ->orderBy('name', 'ASC')
            ->findAll();

        return view('site/audit/index', [
            'logs'    => $logs,
            'pager'   => $this->auditModel->pager,
            'filters' => $filters,
            'users'   => $users,
            'actions' => $this->auditModel->distinctActions(),
            'modules' => $this->auditModel->distinctModules(),
        ]);
    }

    // ================= DETAIL (AJAX / modal) =================
    public function show($id)
    {
        $log = $this->auditModel
            ->select('tbl_audit_logs.*, tbl_users.email as user_email')
            ->join('tbl_users', 'tbl_users.user_id = tbl_audit_logs.user_id', 'left')
            ->find($id);

        if (!$log) {
            return $this->response->setStatusCode(404)->setJSON(['error' => 'Not found']);
        }

        return $this->response->setJSON($log);
    }
}
