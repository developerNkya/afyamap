<?php

namespace App\Models;

use CodeIgniter\Model;

class AuditLogModel extends Model
{
    protected $table      = 'tbl_audit_logs';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'user_id',
        'user_name',
        'action',
        'table_name',
        'record_id',
        'description',
        'old_data',
        'new_data',
        'method',
        'url',
        'ip_address',
        'user_agent',
        'created_at',
    ];

    protected $useTimestamps = false;

    // ================= FILTERED QUERY (used by AuditController) =================
    public function filtered(array $filters)
    {
        $builder = $this
            ->select('tbl_audit_logs.*, tbl_users.email as user_email')
            ->join('tbl_users', 'tbl_users.user_id = tbl_audit_logs.user_id', 'left');

        if (!empty($filters['user_id'])) {
            $builder->where('tbl_audit_logs.user_id', (int) $filters['user_id']);
        }

        if (!empty($filters['action'])) {
            $builder->where('tbl_audit_logs.action', strtoupper($filters['action']));
        }

        if (!empty($filters['module'])) {
            $builder->where('tbl_audit_logs.table_name', $filters['module']);
        }

        if (!empty($filters['date_from'])) {
            $builder->where('tbl_audit_logs.created_at >=', $filters['date_from'] . ' 00:00:00');
        }

        if (!empty($filters['date_to'])) {
            $builder->where('tbl_audit_logs.created_at <=', $filters['date_to'] . ' 23:59:59');
        }

        if (!empty($filters['search'])) {
            $builder->groupStart()
                ->like('tbl_audit_logs.description', $filters['search'])
                ->orLike('tbl_audit_logs.url', $filters['search'])
                ->orLike('tbl_audit_logs.user_name', $filters['search'])
                ->orLike('tbl_audit_logs.ip_address', $filters['search'])
                ->groupEnd();
        }

        return $builder->orderBy('tbl_audit_logs.id', 'DESC');
    }

    // ================= DISTINCT VALUES FOR FILTER DROPDOWNS =================
    public function distinctActions(): array
    {
        return array_column(
            $this->db->table($this->table)->select('action')->distinct()
                ->where('action IS NOT NULL')->orderBy('action')->get()->getResultArray(),
            'action'
        );
    }

    public function distinctModules(): array
    {
        return array_column(
            $this->db->table($this->table)->select('table_name')->distinct()
                ->where('table_name IS NOT NULL')->orderBy('table_name')->get()->getResultArray(),
            'table_name'
        );
    }
}
