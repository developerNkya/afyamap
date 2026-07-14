<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Facility Levels Management</h2>
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
                    <h2 class="card-title">Edit Facility Level</h2>
                </header>

                <div class="card-body">

                    <?php if (isset($validation)): ?>
                        <div class="alert alert-danger">
                            <?= $validation->listErrors() ?>
                        </div>
                    <?php endif; ?>

                    <form action="<?= base_url('facility-levels/update/' . $level['level_id']) ?>" method="post">

                        <?= csrf_field() ?>

                        <div class="mb-3">
                            <label class="form-label">Level Name</label>
                            <input type="text" name="name" class="form-control"
                                   value="<?= old('name', $level['name']) ?>" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Rank Order</label>
                            <input type="number" name="rank_order" class="form-control"
                                   value="<?= old('rank_order', $level['rank_order']) ?>" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea name="description" class="form-control"><?= old('description', $level['description']) ?></textarea>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Status</label>
                            <select name="status" class="form-control">
                                <option value="1" <?= $level['status'] ? 'selected' : '' ?>>Active</option>
                                <option value="0" <?= !$level['status'] ? 'selected' : '' ?>>Inactive</option>
                            </select>
                        </div>

                        <div class="d-grid">
                            <!-- UPDATE = ORANGE -->
                            <button type="submit" class="btn btn-warning">
                                <i class="fas fa-edit"></i> Update Level
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
                    <h2 class="card-title">Existing Levels</h2>
                </header>

                <div class="card-body">

                    <table id="levelTable" class="table table-bordered table-striped table-hover mb-0">
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th width="180">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        <?php if (!empty($levels)): ?>
                            <?php foreach ($levels as $row): ?>
                                <tr>
                                    <td>
                                    <span class="badge bg-primary">
                                        <?= $row['rank_order'] ?>
                                    </span>
                                    </td>

                                    <td><?= esc($row['name']) ?></td>

                                    <td><?= esc($row['description']) ?></td>

                                    <td>
                                    <span class="badge <?= $row['status'] ? 'bg-success' : 'bg-danger' ?>">
                                        <?= $row['status'] ? 'Active' : 'Inactive' ?>
                                    </span>
                                    </td>

                                    <td>
                                        <a href="<?= base_url('facility-levels/edit/' . $row['level_id']) ?>"
                                           class="btn btn-sm btn-warning">
                                            <i class="fas fa-edit"></i>
                                        </a>

                                        <a href="<?= base_url('facility-levels/delete/' . $row['level_id']) ?>"
                                           class="btn btn-sm btn-danger btn-delete">
                                            <i class="fas fa-trash"></i>
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

            $('#levelTable').DataTable({
                responsive: true,
                pageLength: 8,
                order: [[0, 'asc']], // sorted by rank
                columnDefs: [
                    { orderable: false, targets: [4] }
                ]
            });

        });

        // SWEETALERT DELETE
        $(document).on('click', '.btn-delete', function (e) {
            e.preventDefault();

            let url = $(this).attr('href');

            Swal.fire({
                title: 'Are you sure?',
                text: "This level will be permanently deleted!",
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