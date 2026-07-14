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

        <!-- ================= LEFT: EDIT FORM ================= -->
        <div class="col-lg-4">
            <section class="card">
                <header class="card-header">
                    <h2 class="card-title">Edit Service Category</h2>
                </header>

                <div class="card-body">

                    <?php if (isset($validation)): ?>
                        <div class="alert alert-danger">
                            <?= $validation->listErrors() ?>
                        </div>
                    <?php endif; ?>

                    <form action="<?= base_url('service-category/update/' . $category['category_id']) ?>" method="post" enctype="multipart/form-data">

                        <?= csrf_field() ?>

                        <div class="mb-3">
                            <label class="form-label">Category Name</label>
                            <input type="text" name="name" class="form-control"
                                   value="<?= old('name', $category['name']) ?>" required>
                        </div>

                        <!-- CURRENT ICON -->
                        <div class="mb-3">
                            <label class="form-label">Current Icon</label><br>
                            <?php if ($category['icon']): ?>
                                <img src="<?= base_url('uploads/service_categories/' . $category['icon']) ?>"
                                     width="60"
                                     id="currentIcon">
                            <?php else: ?>
                                <span>No icon</span>
                            <?php endif; ?>
                        </div>

                        <!-- CHANGE ICON -->
                        <div class="mb-3">
                            <label class="form-label">Change Icon</label>
                            <input type="file" name="icon" class="form-control" id="iconInput">
                        </div>

                        <!-- PREVIEW -->
                        <div class="mb-3 text-center">
                            <img id="iconPreview" src="" style="max-width:80px; display:none;">
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea name="description" class="form-control"><?= old('description', $category['description']) ?></textarea>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Status</label>
                            <select name="status" class="form-control">
                                <option value="1" <?= $category['status'] ? 'selected' : '' ?>>Active</option>
                                <option value="0" <?= !$category['status'] ? 'selected' : '' ?>>Inactive</option>
                            </select>
                        </div>

                        <div class="d-grid">
                            <button type="submit" class="btn btn-warning">
                                <i class="fas fa-edit"></i> Update Category
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
                                        <i class="fas fa-edit"></i> Edit
                                    </a>

                                    <!-- DELETE -->
                                    <form action="<?= base_url('service-category/delete/' . $row['category_id']) ?>"
                                          method="post"
                                          class="d-inline form-delete"> Delete

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

            $('#categoryTable').DataTable({
                responsive: true,
                pageLength: 8,
                order: [[0, 'desc']],
                columnDefs: [
                    { orderable: false, targets: [1, 4] }
                ]
            });

        });

        // DELETE CONFIRM
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
                    $('#currentIcon').hide(); // hide old icon
                }
                reader.readAsDataURL(file);
            }
        });
    </script>

<?= $this->endSection() ?>