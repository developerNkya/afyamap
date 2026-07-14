<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Role Management</h2>
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

        <!-- ================= LEFT (CREATE) ================= -->
        <div class="col-lg-4">
            <section class="card">

                <header class="card-header">
                    <h4>Add Role</h4>
                </header>

                <div class="card-body">

                    <form method="post" action="<?= base_url('roles/store') ?>">
                        <?= csrf_field() ?>

                        <div class="mb-3">
                            <label>Role Name</label>
                            <input type="text" name="name" class="form-control" required>
                        </div>

                        <button class="btn btn-success w-100">
                            <i class="fas fa-plus"></i> Create Role
                        </button>

                    </form>

                </div>

            </section>
        </div>


        <!-- ================= RIGHT (LIST) ================= -->
        <div class="col-lg-8">
            <section class="card">

                <header class="card-header">
                    <h4>Existing Roles</h4>
                </header>

                <div class="card-body">

                    <table id="roleTable" class="table table-bordered table-striped table-hover">

                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th width="150">Actions</th>
                        </tr>
                        </thead>

                        <tbody>

                        <?php if (!empty($roles)): ?>
                            <?php $i=1; foreach ($roles as $r): ?>

                                <tr>

                                    <td><?= $i++ ?></td>

                                    <td><?= esc($r['name']) ?></td>

                                    <td>
        <span class="badge <?= $r['status'] ? 'bg-success' : 'bg-danger' ?>">
            <?= $r['status'] ? 'Active' : 'Inactive' ?>
        </span>
                                    </td>

                                    <td>

                                        <!-- EDIT -->
                                        <a href="<?= base_url('roles/edit/'.$r['role_id']) ?>"
                                           class="btn btn-warning btn-sm">
                                            <i class="fas fa-edit"></i>
                                        </a>

                                        <!-- DELETE -->
                                        <a href="<?= base_url('roles/delete/'.$r['role_id']) ?>"
                                           class="btn btn-danger btn-sm btn-delete">
                                            <i class="fas fa-trash"></i>
                                        </a>

                                    </td>

                                </tr>

                            <?php endforeach ?>
                        <?php else: ?>

                            <tr>
                                <td colspan="4" class="text-center text-muted">
                                    No roles found
                                </td>
                            </tr>

                        <?php endif; ?>

                        </tbody>

                    </table>

                </div>

            </section>
        </div>

    </div>

<?= $this->endSection() ?>


<?= $this->section('scripts') ?>

    <script>

        $(document).ready(function(){

            $('#roleTable').DataTable({
                responsive: true,
                pageLength: 10,
                order: [[0, 'asc']]
            });

        });

        // DELETE CONFIRM
        $(document).on('click', '.btn-delete', function(e){
            e.preventDefault();

            let url = $(this).attr('href');

            Swal.fire({
                title: 'Are you sure?',
                text: 'This role will be deleted!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33'
            }).then((result)=>{
                if(result.isConfirmed){
                    window.location.href = url;
                }
            });
        });

    </script>

<?= $this->endSection() ?>