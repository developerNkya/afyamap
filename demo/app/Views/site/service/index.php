<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header d-flex justify-content-between align-items-center">
        <div>
            <h2>Services</h2>
        </div>

        <a href="<?= base_url('service/create') ?>" class="btn btn-primary">
            <i class="fas fa-plus"></i> Add Service
        </a>
    </header>

    <!-- FLASH -->
<?php if (session()->getFlashdata('success')): ?>
    <script>
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "<?= session()->getFlashdata('success') ?>",
            timer: 1500,
            showConfirmButton: false
        });
    </script>
<?php endif; ?>

    <div class="row">
        <div class="col-12">

            <section class="card shadow-sm border-0">

                <header class="card-header">
                    <h5 class="mb-0">All Services</h5>
                </header>

                <div class="card-body">

                    <div class="table-responsive">

                        <table id="datatable-services"
                               class="table table-bordered table-striped table-hover align-middle">

                            <thead class="table-light">
                            <tr>
                                <th width="50">#</th>
                                <th>Service Name</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th width="150" class="text-center">Action</th>
                            </tr>
                            </thead>

                            <tbody>

                            <?php if (!empty($services)): ?>
                                <?php foreach ($services as $row): ?>

                                    <tr>

                                        <!-- AUTO NUMBER -->
                                        <td></td>

                                        <td>
                                            <strong><?= esc($row['name']) ?></strong>
                                        </td>

                                        <td>
                                            <?= esc($row['category_name'] ?? 'N/A') ?>
                                        </td>

                                        <td>
                                            <?= esc($row['description']) ?>
                                        </td>

                                        <td>
                                            <?php if ($row['status']): ?>
                                                <span class="badge bg-success">Active</span>
                                            <?php else: ?>
                                                <span class="badge bg-danger">Inactive</span>
                                            <?php endif; ?>
                                        </td>

                                        <td class="text-center">

                                            <a href="<?= base_url('service/edit/'.$row['service_id']) ?>"
                                               class="btn btn-sm btn-info"
                                               title="Edit">
                                                <i class="fas fa-edit"></i> Edit
                                            </a>

                                            <button
                                                    class="btn btn-sm btn-danger btn-delete"
                                                    data-url="<?= base_url('service/delete/'.$row['service_id']) ?>"
                                                    title="Delete">
                                                <i class="fas fa-trash"></i> Delete
                                            </button>

                                        </td>

                                    </tr>

                                <?php endforeach; ?>

                            <?php endif; ?>

                            </tbody>

                        </table>

                    </div>

                </div>

            </section>

        </div>
    </div>

<?= $this->endSection() ?>

<?= $this->section('scripts') ?>

    <script>

        $(function(){

            let table = $('#datatable-services').DataTable({
                pageLength: 10,
                responsive: true,
                autoWidth: false,
                ordering: true,
                columnDefs: [
                    { targets: 0, orderable: false, searchable: false },
                    { targets: -1, orderable: false, searchable: false }
                ],
                order: [[1, 'asc']]
            });

            // 🔥 AUTO NUMBERING
            table.on('order.dt search.dt', function () {
                let i = 1;
                table.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function () {
                        this.data(i++);
                    });
            }).draw();

        });


        /* ================= DELETE ================= */
        $(document).on('click', '.btn-delete', function(){

            let url = $(this).data('url');

            Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = url;
                }
            });

        });

    </script>

<?= $this->endSection() ?>