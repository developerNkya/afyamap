<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Insurance Management</h2>
    </header>

    <!-- SWEETALERT SUCCESS -->
<?php if (session()->getFlashdata('success')): ?>
    <script>
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: '<?= session()->getFlashdata('success') ?>',
            timer: 2000,
            showConfirmButton: false
        });
    </script>
<?php endif; ?>

    <div class="row">

        <!-- ================= LEFT: FORM ================= -->
        <div class="col-lg-4">
            <section class="card">
                <header class="card-header">
                    <h2 class="card-title">Add Insurance</h2>
                </header>

                <div class="card-body">

                    <?php if (isset($validation)): ?>
                        <div class="alert alert-danger">
                            <?= $validation->listErrors() ?>
                        </div>
                    <?php endif; ?>

                    <form action="<?= base_url('insurance/store') ?>" method="post" enctype="multipart/form-data">

                        <?= csrf_field() ?>

                        <div class="mb-3">
                            <label class="form-label">Insurance Name</label>
                            <input type="text" name="name" class="form-control" value="<?= old('name') ?>" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Short Code</label>
                            <input type="text" name="short_code" class="form-control" value="<?= old('short_code') ?>" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Icon</label>
                            <input type="file" name="icon" class="form-control">
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea name="description" class="form-control"><?= old('description') ?></textarea>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Status</label>
                            <select name="status" class="form-control">
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>

                        <div class="d-grid">
                            <button type="submit" class="btn btn-success">
                                <i class="fas fa-save"></i> Save Insurance
                            </button>
                        </div>

                    </form>

                </div>
            </section>
        </div>


        <!-- ================= RIGHT: TABLE ================= -->
        <div class="col-lg-8">
            <section class="card">
                <header class="card-header">
                    <h2 class="card-title">Existing Insurances</h2>
                </header>

                <div class="card-body">

                    <table id="insuranceTable" class="table table-bordered table-striped table-hover mb-0">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Icon</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Status</th>
                            <th width="180">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        <?php foreach ($insurances as $row): ?>
                            <tr>
                                <td><?= $row['insurance_id'] ?></td>

                                <td>
                                    <?php if ($row['icon']): ?>
                                        <img src="<?= base_url('uploads/insurances/' . $row['icon']) ?>" width="35">
                                    <?php else: ?>
                                        -
                                    <?php endif; ?>
                                </td>

                                <td><?= esc($row['name']) ?></td>
                                <td><?= esc($row['short_code']) ?></td>

                                <td>
                                <span class="badge <?= $row['status'] ? 'bg-success' : 'bg-danger' ?>">
                                    <?= $row['status'] ? 'Active' : 'Inactive' ?>
                                </span>
                                </td>

                                <td>
                                    <!-- EDIT -->
                                    <a href="<?= base_url('insurance/edit/' . $row['insurance_id']) ?>"
                                       class="btn btn-sm btn-warning">
                                        <i class="fas fa-edit"></i>
                                    </a>

                                    <!-- DELETE (SECURE POST) -->
                                    <form action="<?= base_url('insurance/delete/' . $row['insurance_id']) ?>"
                                          method="post"
                                          class="d-inline form-delete">

                                        <?= csrf_field() ?>

                                        <button type="submit" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </form>

                                </td>
                            </tr>
                        <?php endforeach ?>
                        </tbody>

                    </table>

                </div>
            </section>
        </div>

    </div>

<?= $this->endSection() ?>


<?= $this->section('scripts') ?>

    <script>
        $(document).ready(function () {

            $('#insuranceTable').DataTable({
                responsive: true,
                pageLength: 8,
                order: [[0, 'desc']],
                columnDefs: [
                    { orderable: false, targets: [1, 5] }
                ]
            });

        });

        // SWEETALERT DELETE (SECURE FORM)
        $(document).on('submit', '.form-delete', function (e) {
            e.preventDefault();

            let form = this;

            Swal.fire({
                title: 'Are you sure?',
                text: "This record will be permanently deleted!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, delete it'
            }).then((result) => {
                if (result.isConfirmed) {
                    form.submit();
                }
            });
        });
    </script>

<?= $this->endSection() ?>