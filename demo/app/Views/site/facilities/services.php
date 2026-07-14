<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Facility Services - <?= esc($facility['name']) ?></h2>
    </header>

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

        <!-- ================= LEFT: ASSIGN ================= -->
        <div class="col-lg-4">
            <section class="card">
                <div class="card-body">

                    <form action="<?= base_url('facility/services/store/'.$facility['facility_id']) ?>" method="post">
                        <?= csrf_field() ?>

                        <div class="mb-3">
                            <label class="form-label">Select Services</label>

                            <select name="services[]" id="servicesSelect"
                                    class="form-control" multiple required>

                                <?php if (!empty($services)): ?>
                                    <?php foreach ($services as $s): ?>
                                        <option value="<?= $s['service_id'] ?>">
                                            <?= esc($s['name']) ?>
                                        </option>
                                    <?php endforeach ?>
                                <?php else: ?>
                                    <option disabled>No services available</option>
                                <?php endif; ?>

                            </select>
                        </div>

                        <button class="btn btn-success w-100">
                            <i class="fas fa-plus"></i> Assign Services
                        </button>

                    </form>

                </div>
            </section>
        </div>


        <!-- ================= RIGHT: ASSIGNED ================= -->
        <div class="col-lg-8">
            <section class="card">
                <div class="card-body">

                    <table id="serviceTable" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Service</th>
                            <th>Status</th>
                            <th width="150">Actions</th>
                        </tr>
                        </thead>

                        <tbody>

                        <?php if (!empty($assigned)): ?>
                            <?php foreach ($assigned as $row): ?>

                                <tr>
                                    <td><?= esc($row['service_name']) ?></td>

                                    <td>
        <span class="badge <?= $row['status'] ? 'bg-success' : 'bg-danger' ?>">
            <?= $row['status'] ? 'Active' : 'Inactive' ?>
        </span>
                                    </td>

                                    <td>
                                        <a href="<?= base_url('facility/services/toggle/'.$row['id']) ?>"
                                           class="btn btn-sm btn-info me-1">
                                            <i class="fas fa-sync"></i>
                                        </a>

                                        <a href="<?= base_url('facility/services/delete/'.$row['id']) ?>"
                                           class="btn btn-sm btn-danger btn-delete">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </td>

                                </tr>

                            <?php endforeach ?>
                        <?php else: ?>

                            <tr>
                                <td colspan="3" class="text-center">No services assigned</td>
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

        $(document).ready(function () {

            // ✅ SELECT2 INIT (NO CDN)
            $('#servicesSelect').select2({
                placeholder: "Search services...",
                width: '100%'
            });

            // ✅ DATATABLE INIT (NO CDN)
            $('#serviceTable').DataTable({
                responsive: true,
                pageLength: 8,
                order: [[0, 'asc']],
                columnDefs: [
                    { orderable: false, targets: [2] }
                ]
            });

        });


        // DELETE CONFIRM
        $(document).on('click', '.btn-delete', function (e) {
            e.preventDefault();

            let url = $(this).attr('href');

            Swal.fire({
                title: 'Remove service?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = url;
                }
            });
        });

    </script>

<?= $this->endSection() ?>