<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header d-flex justify-content-between align-items-center">
        <h2>Create User</h2>

        <a href="<?= base_url('users') ?>" class="btn btn-secondary">
            <i class="fas fa-arrow-left"></i> Back
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

    <div class="row">

        <!-- ================= LEFT: FORM ================= -->
        <div class="col-lg-7">

            <section class="card">

                <header class="card-header">
                    <h4 class="card-title">New User Information</h4>
                </header>

                <div class="card-body">

                    <form method="post" action="<?= base_url('users/store') ?>">
                        <?= csrf_field() ?>

                        <div class="row">

                            <!-- NAME -->
                            <div class="col-md-6 mb-3">
                                <label>Full Name</label>
                                <input type="text" name="name" class="form-control"
                                       value="<?= old('name') ?>" required>
                                <small class="text-danger"><?= session('errors.name') ?></small>
                            </div>

                            <!-- EMAIL -->
                            <div class="col-md-6 mb-3">
                                <label>Email</label>
                                <input type="email" name="email" class="form-control"
                                       value="<?= old('email') ?>" required>
                                <small class="text-danger"><?= session('errors.email') ?></small>
                            </div>

                            <!-- PHONE -->
                            <div class="col-md-6 mb-3">
                                <label>Phone</label>
                                <input type="text" name="phone" class="form-control"
                                       value="<?= old('phone') ?>">
                            </div>

                            <!-- ROLE -->
                            <div class="col-md-6 mb-3">
                                <label>Role</label>
                                <select name="role_id" class="form-control" required>
                                    <option value="">Select Role</option>
                                    <?php foreach ($roles as $r): ?>
                                        <option value="<?= $r['role_id'] ?>"
                                            <?= old('role_id') == $r['role_id'] ? 'selected' : '' ?>>
                                            <?= esc($r['name']) ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                                <small class="text-danger"><?= session('errors.role_id') ?></small>
                            </div>

                            <!-- PASSWORD -->
                            <div class="col-md-6 mb-3">
                                <label>Password</label>
                                <input type="password" name="password" class="form-control" required>
                                <small class="text-danger"><?= session('errors.password') ?></small>
                            </div>

                        </div>

                        <hr>

                        <button class="btn btn-success w-100">
                            <i class="fas fa-save"></i> Create User
                        </button>

                    </form>

                </div>
            </section>

        </div>

        <!-- ================= RIGHT: INFO PANEL ================= -->
        <div class="col-lg-5">

            <section class="card">

                <header class="card-header">
                    <h4 class="card-title">Guidelines</h4>
                </header>

                <div class="card-body">

                    <ul class="text-muted mb-0">
                        <li>Email must be unique</li>
                        <li>Password should be strong</li>
                        <li>Assign correct role carefully</li>
                        <li>User permissions can be customized after creation</li>
                    </ul>

                    <hr>

                    <div class="text-center text-muted">
                        <i class="fas fa-user-plus fa-3x mb-2"></i>
                        <p>New users will be active by default</p>
                    </div>

                </div>

            </section>

        </div>

    </div>

<?= $this->endSection() ?>