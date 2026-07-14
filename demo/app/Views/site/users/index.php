<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header d-flex justify-content-between align-items-center">
        <h2>Users Management</h2>

        <a href="<?= base_url('users/create') ?>" class="btn btn-success">
            <i class="fas fa-plus"></i> Add User
        </a>
    </header>

    <!-- SUCCESS -->
<?php if (session()->getFlashdata('success')): ?>
    <script>
        Swal.fire({
            icon:'success',
            title:'Success',
            text:'<?= session()->getFlashdata('success') ?>',
            timer:1500,
            showConfirmButton:false
        });
    </script>
<?php endif; ?>

    <!-- ERROR -->
<?php if (session()->getFlashdata('error')): ?>
    <div class="alert alert-danger">
        <?= session()->getFlashdata('error') ?>
    </div>
<?php endif; ?>

    <section class="card">

        <div class="card-body">

            <table class="table table-bordered table-striped" id="usersTable">

                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th width="180">Actions</th>
                </tr>
                </thead>

                <tbody>

                <?php $i=1; foreach ($users as $u): ?>

                    <tr>
                        <td><?= $i++ ?></td>

                        <td>
                            <strong><?= esc($u['name']) ?></strong><br>
                            <small class="text-muted"><?= esc($u['username']) ?></small>
                        </td>

                        <td><?= esc($u['email']) ?></td>
                        <td><?= esc($u['phone'] ?? '-') ?></td>

                        <td>
                        <span class="badge bg-info">
                            <?= esc($u['role_name']) ?>
                        </span>
                        </td>

                        <td>
                        <span class="badge <?= $u['is_active'] ? 'bg-success' : 'bg-danger' ?>">
                            <?= $u['is_active'] ? 'Active' : 'Inactive' ?>
                        </span>
                        </td>

                        <td>

                            <a href="<?= base_url('users/edit/'.$u['user_id']) ?>"
                               class="btn btn-warning btn-sm">
                                <i class="fas fa-edit"></i>
                            </a>

                            <a href="<?= base_url('users/toggle/'.$u['user_id']) ?>"
                               class="btn btn-info btn-sm">
                                <i class="fas fa-sync"></i>
                            </a>

                            <a href="<?= base_url('users/permissions/'.$u['user_id']) ?>"
                               class="btn btn-primary btn-sm">
                                <i class="fas fa-lock"></i>
                            </a>

                            <?php if (!empty($u['twofa_enabled']) && can('edit_users')): ?>
                                <a href="<?= base_url('users/reset-2fa/'.$u['user_id']) ?>"
                                   class="btn btn-danger btn-sm"
                                   title="Reset Google Authenticator"
                                   onclick="return confirm('Reset 2FA for <?= esc($u['name']) ?>? They will login with password only until they set it up again.')">
                                    <i class="fas fa-shield-alt"></i>
                                </a>
                            <?php endif; ?>

                        </td>

                    </tr>

                <?php endforeach; ?>

                </tbody>

            </table>

        </div>

    </section>

<?= $this->endSection() ?>

<?= $this->section('scripts') ?>

    <script>
        $(function(){
            $('#usersTable').DataTable();
        });
    </script>

<?= $this->endSection() ?>