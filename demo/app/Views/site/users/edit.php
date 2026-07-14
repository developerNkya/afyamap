<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header d-flex justify-content-between align-items-center">
        <h2>Edit User</h2>

        <a href="<?= base_url('users') ?>" class="btn btn-secondary">
            <i class="fas fa-arrow-left"></i> Back
        </a>
    </header>

    <!-- ERROR -->
<?php if (session()->getFlashdata('error')): ?>
    <div class="alert alert-danger">
        <?= session()->getFlashdata('error') ?>
    </div>
<?php endif; ?>

    <div class="row">

        <!-- ================= LEFT: FORM ================= -->
        <div class="col-lg-7">

            <section class="card">
                <header class="card-header">
                    <h4 class="card-title">Update User Information</h4>
                </header>

                <div class="card-body">

                    <form method="post" action="<?= base_url('users/update/'.$user['user_id']) ?>">
                        <?= csrf_field() ?>

                        <?= view('site/users/_form', [
                            'roles' => $roles,
                            'user'  => $user
                        ]) ?>

                        <hr>

                        <button class="btn btn-primary w-100">
                            <i class="fas fa-save"></i> Update User
                        </button>

                    </form>

                </div>
            </section>

        </div>

        <!-- ================= RIGHT: SUMMARY ================= -->
        <div class="col-lg-5">

            <section class="card">

                <header class="card-header">
                    <h4 class="card-title">User Summary</h4>
                </header>

                <div class="card-body text-center">

                    <!-- Avatar Placeholder -->
                    <div class="mb-3">
                        <i class="fas fa-user-circle fa-5x text-muted"></i>
                    </div>

                    <h4><?= esc($user['name']) ?></h4>
                    <p class="text-muted"><?= esc($user['email']) ?></p>

                    <hr>

                    <!-- ROLE -->
                    <div class="mb-2">
                        <strong>Role:</strong><br>
                        <span class="badge bg-info">
                        <?= esc($user['role_name'] ?? '-') ?>
                    </span>
                    </div>

                    <!-- STATUS -->
                    <div class="mb-3">
                        <strong>Status:</strong><br>
                        <span class="badge <?= $user['is_active'] ? 'bg-success' : 'bg-danger' ?>">
                        <?= $user['is_active'] ? 'Active' : 'Inactive' ?>
                    </span>
                    </div>

                    <!-- TOGGLE BUTTON -->
                    <a href="<?= base_url('users/toggle/'.$user['user_id']) ?>"
                       class="btn btn-sm btn-outline-secondary w-100">
                        <i class="fas fa-sync"></i> Toggle Status
                    </a>

                    <hr>

                    <!-- META -->
                    <small class="text-muted">
                        Created: <?= esc($user['created_at'] ?? '-') ?><br>
                        Updated: <?= esc($user['updated_at'] ?? '-') ?>
                    </small>

                </div>

            </section>

        </div>

    </div>

<?= $this->endSection() ?>