<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table      = 'tbl_users';
    protected $primaryKey = 'user_id';

    protected $allowedFields = [
        'username',
        'name',
        'email',
        'phone',
        'user_image',
        'password',
        'twofa_secret',
        'twofa_enabled',
        'failed_attempts',
        'locked_until',
        'role_id',
        'is_active',
        'status',
        'last_login',
        'last_login_ip',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
    ];

    protected $useTimestamps = false;
}
