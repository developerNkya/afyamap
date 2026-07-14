<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Facility Levels Management</h2>

        <div class="right-wrapper text-end">
            <a href="<?= base_url('facility-levels/create') ?>" class="btn btn-success">
                <i class="fas fa-plus"></i> Add Level
            </a>
        </div>
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

    <section class="card">
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
                                <!-- EDIT -->
                                <a href="<?= base_url('facility-levels/edit/' . $row['level_id']) ?>"
                                   class="btn btn-sm btn-warning">
                                    <i class="fas fa-edit"></i>Edit
                                </a>

                                <!-- DELETE -->
                                <a href="<?= base_url('facility-levels/delete/' . $row['level_id']) ?>"
                                   class="btn btn-sm btn-danger btn-delete">
                                    <i class="fas fa-trash"></i>Delete
                                </a>
                            </td>
                        </tr>
                    <?php endforeach ?>
                <?php else: ?>
                    <tr>
                        <td colspan="5" class="text-center">No records found</td>
                    </tr>
                <?php endif ?>
                </tbody>

            </table>

        </div>
    </section>

<?= $this->endSection() ?>


<?= $this->section('scripts') ?>

    <script>

        $(document).ready(function () {

            $('#levelTable').DataTable({
                responsive: true,
                pageLength: 10,
                order: [[0, 'asc']], // IMPORTANT: rank order ascending
                columnDefs: [
                    { orderable: false, targets: [4] }
                ],
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search level...",
                    lengthMenu: "_MENU_ records per page",
                }
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