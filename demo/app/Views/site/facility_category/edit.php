<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Facility Category Management</h2>
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

        <!-- ================= LEFT: EDIT FORM ================= -->
        <div class="col-lg-4">
            <section class="card">
                <header class="card-header">
                    <h2 class="card-title">Edit Facility Category</h2>
                </header>

                <div class="card-body">

                    <?php if (isset($validation)): ?>
                        <div class="alert alert-danger">
                            <?= $validation->listErrors() ?>
                        </div>
                    <?php endif; ?>

                    <form action="<?= base_url('facility-category/update/' . $category['category_id']) ?>"
                          method="post" enctype="multipart/form-data">

                        <?= csrf_field() ?>

                        <div class="mb-3">
                            <label class="form-label">Category Name</label>
                            <input type="text" name="name" class="form-control"
                                   value="<?= old('name', $category['name']) ?>" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Current Icon</label><br>
                            <?php if ($category['icon']): ?>
                                <img src="<?= base_url('uploads/facility_categories/' . $category['icon']) ?>" width="50">
                            <?php else: ?>
                                <span>No icon</span>
                            <?php endif; ?>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Change Icon</label>
                            <input type="file" name="icon" class="form-control" id="iconInput">
                        </div>

                        <!-- ICON PREVIEW -->
                        <div class="mb-3" id="iconPreviewWrapper" style="display:none;">
                            <label class="form-label">Preview</label><br>
                            <img id="iconPreview" src="#" width="60">
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
                        <?php if (!empty($categories)): ?>
                            <?php foreach ($categories as $row): ?>
                                <tr>
                                    <td><?= $row['category_id'] ?></td>

                                    <td>
                                        <?php if ($row['icon']): ?>
                                            <img src="<?= base_url('uploads/facility_categories/' . $row['icon']) ?>" width="40">
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
                                        <a href="<?= base_url('facility-category/edit/' . $row['category_id']) ?>"
                                           class="btn btn-sm btn-warning">
                                            <i class="fas fa-edit"></i> Edit
                                        </a>

                                        <a href="<?= base_url('facility-category/delete/' . $row['category_id']) ?>"
                                           class="btn btn-sm btn-danger btn-delete">
                                            <i class="fas fa-trash"></i> Delete
                                        </a>
                                    </td>
                                </tr>
                            <?php endforeach ?>
                        <?php else: ?>
                            <tr>
                                <td colspan="5" class="text-center">No records</td>
                            </tr>
                        <?php endif ?>
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

        // IMAGE PREVIEW
        $('#iconInput').on('change', function () {
            const file = this.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    $('#iconPreview').attr('src', e.target.result);
                    $('#iconPreviewWrapper').show();
                }

                reader.readAsDataURL(file);
            }
        });

        // SWEETALERT DELETE
        $(document).on('click', '.btn-delete', function (e) {
            e.preventDefault();

            let url = $(this).attr('href');

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
                    window.location.href = url;
                }
            });
        });

    </script>

<?= $this->endSection() ?>