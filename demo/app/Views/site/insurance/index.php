<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Insurance Management</h2>

        <div class="right-wrapper text-end">
            <!-- CREATE = GREEN -->
            <a href="<?= base_url('insurance/create') ?>" class="btn btn-success">
                <i class="fas fa-plus"></i> Add Insurance
            </a>
        </div>
    </header>

    <section class="card">
        <div class="card-body">

            <!-- FLASH MESSAGE -->
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

            <table id="insuranceTable" class="table table-bordered table-striped table-hover mb-0">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Short Code</th>
                    <th>Status</th>
                    <th width="250">Actions</th>
                </tr>
                </thead>

                <tbody>
                <?php if (!empty($insurances)): ?>
                    <?php foreach ($insurances as $row): ?>
                        <tr>
                            <td><?= $row['insurance_id'] ?></td>

                            <td>
                                <?php if ($row['icon']): ?>
                                    <img src="<?= base_url('uploads/insurances/' . $row['icon']) ?>" width="40" class="rounded">
                                <?php else: ?>
                                    <span class="text-muted">No Icon</span>
                                <?php endif; ?>
                            </td>

                            <td><?= esc($row['name']) ?></td>

                            <td>
                            <span class="badge bg-info">
                                <?= esc($row['short_code']) ?>
                            </span>
                            </td>

                            <td>
                            <span class="badge <?= $row['status'] ? 'bg-success' : 'bg-danger' ?>">
                                <?= $row['status'] ? 'Active' : 'Inactive' ?>
                            </span>
                            </td>

                            <td>
                                <!-- EDIT = ORANGE -->
                                <a href="<?= base_url('insurance/edit/' . $row['insurance_id']) ?>"
                                   class="btn btn-sm btn-warning">
                                    <i class="fas fa-edit"></i> Edit
                                </a>

                                <!-- TOGGLE = BLUE -->
                                <a href="<?= base_url('insurance/toggle/' . $row['insurance_id']) ?>"
                                   class="btn btn-sm btn-info">
                                    <i class="fas fa-sync"></i> Toggle
                                </a>

                                <!-- DELETE = RED -->
                                <a href="<?= base_url('insurance/delete/' . $row['insurance_id']) ?>"
                                   class="btn btn-sm btn-danger btn-delete">
                                    <i class="fas fa-trash"></i> Delete
                                </a>
                            </td>
                        </tr>
                    <?php endforeach ?>
                <?php else: ?>
                    <tr>
                        <td colspan="6" class="text-center">No records found</td>
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

            // ================= DATATABLE =================
            $('#insuranceTable').DataTable({
                responsive: true,
                autoWidth: false,
                pageLength: 10,
                order: [[0, 'desc']],
                columnDefs: [
                    { orderable: false, targets: [1, 5] }
                ],
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search insurance...",
                    lengthMenu: "_MENU_ records per page",
                }
            });

        });


        // ================= SWEETALERT DELETE =================
        $(document).on('click', '.btn-delete', function (e) {
            e.preventDefault();

            let url = $(this).attr('href');

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
                    window.location.href = url;
                }
            });
        });
    </script>

<?= $this->endSection() ?>