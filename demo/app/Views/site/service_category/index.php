<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Service Category Management</h2>
    </header>

    <!-- SUCCESS MESSAGE -->
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
                    <h2 class="card-title">Add Service Category</h2>
                </header>

                <div class="card-body">

                    <?php if (isset($validation)): ?>
                        <div class="alert alert-danger">
                            <?= $validation->listErrors() ?>
                        </div>
                    <?php endif; ?>

                    <form action="<?= base_url('service-category/store') ?>" method="post" enctype="multipart/form-data">

                        <?= csrf_field() ?>

                        <div class="mb-3">
                            <label class="form-label">Category Name</label>
                            <input type="text" name="name" class="form-control"
                                   value="<?= old('name') ?>" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Icon</label>
                            <input type="file" name="icon" class="form-control" id="iconInput">
                        </div>

                        <!-- ICON PREVIEW -->
                        <div class="mb-3 text-center">
                            <img id="iconPreview" src="" style="max-width:80px; display:none;">
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
                                <i class="fas fa-save"></i> Save Category
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
                    <h2 class="card-title">Existing Categories</h2>
                </header>

                <div class="card-body">

                    <table id="categoryTable" class="table table-bordered table-striped table-hover mb-0">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Icon</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th width="180">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        <?php foreach ($categories as $row): ?>
                            <tr>
                                <td><?= $row['category_id'] ?></td>

                                <td>
                                    <?php if ($row['icon']): ?>
                                        <img src="<?= base_url('uploads/service_categories/' . $row['icon']) ?>" width="35">
                                    <?php else: ?>
                                        -
                                    <?php endif; ?>
                                </td>

                                <td><?= esc($row['name']) ?></td>

                                <td>
                                <span class="badge <?= $row['status'] ? 'bg-success' : 'bg-danger' ?>">
                                    <?= $row['status'] ? 'Active' : 'Inactive' ?>
                                </span>
                                </td>

                                <td>
                                    <!-- EDIT -->
                                    <a href="<?= base_url('service-category/edit/' . $row['category_id']) ?>"
                                       class="btn btn-sm btn-warning">
                                        <i class="fas fa-edit"></i>Edit
                                    </a>

                                    <!-- DELETE (POST + CSRF) -->
                                    <form action="<?= base_url('service-category/delete/' . $row['category_id']) ?>"
                                          method="post"
                                          class="d-inline form-delete">

                                        <?= csrf_field() ?>

                                        <button type="submit" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>Delete
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

            // DATATABLE
            $('#categoryTable').DataTable({
                responsive: true,
                pageLength: 8,
                order: [[0, 'desc']],
                columnDefs: [
                    { orderable: false, targets: [1, 4] }
                ]
            });

        });

        // SWEETALERT DELETE
        $(document).on('submit', '.form-delete', function (e) {
            e.preventDefault();

            let form = this;

            Swal.fire({
                title: 'Are you sure?',
                text: "This category will be permanently deleted!",
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

        // IMAGE PREVIEW
        $('#iconInput').on('change', function () {
            let file = this.files[0];

            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    $('#iconPreview').attr('src', e.target.result).show();
                }
                reader.readAsDataURL(file);
            }
        });
    </script>

<?= $this->endSection() ?>