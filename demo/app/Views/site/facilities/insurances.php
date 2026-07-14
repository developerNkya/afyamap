<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Facility Insurance - <?= esc($facility['name']) ?></h2>
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

        <!-- LEFT: ASSIGN -->
        <div class="col-lg-4">
            <section class="card">
                <div class="card-body">

                    <form method="post" action="<?= base_url('facility/insurances/store/'.$facility['facility_id']) ?>">
                        <?= csrf_field() ?>

                        <div class="mb-3">
                            <label class="form-label">Select Insurance</label>

                            <select name="insurances[]" id="insuranceSelect"
                                    class="form-control" multiple required>

                                <?php if (!empty($insurances)): ?>
                                    <?php foreach ($insurances as $i): ?>
                                        <option value="<?= $i['insurance_id'] ?>">
                                            <?= esc($i['name']) ?>
                                        </option>
                                    <?php endforeach ?>
                                <?php else: ?>
                                    <option disabled>No insurance available</option>
                                <?php endif; ?>

                            </select>
                        </div>

                        <button class="btn btn-success w-100">
                            <i class="fas fa-plus"></i> Assign Insurance
                        </button>

                    </form>

                </div>
            </section>
        </div>


        <!-- RIGHT: LIST -->
        <div class="col-lg-8">
            <section class="card">
                <div class="card-body">

                    <table id="insuranceTable" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Insurance</th>
                            <th>Status</th>
                            <th width="150">Actions</th>
                        </tr>
                        </thead>

                        <tbody>

                        <?php if (!empty($assigned)): ?>
                            <?php foreach ($assigned as $row): ?>

                                <tr>
                                    <td><?= esc($row['name']) ?></td>

                                    <td>
        <span class="badge <?= $row['status'] ? 'bg-success' : 'bg-danger' ?>">
            <?= $row['status'] ? 'Active' : 'Inactive' ?>
        </span>
                                    </td>

                                    <td>
                                        <!-- TOGGLE -->
                                        <a href="<?= base_url('facility/insurances/toggle/'.$row['id']) ?>"
                                           class="btn btn-sm btn-info">
                                            <i class="fas fa-sync"></i>
                                        </a>

                                        <!-- DELETE -->
                                        <a href="<?= base_url('facility/insurances/delete/'.$row['id']) ?>"
                                           class="btn btn-sm btn-danger btn-delete">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </td>

                                </tr>

                            <?php endforeach ?>
                        <?php else: ?>

                            <tr>
                                <td colspan="3" class="text-center">No insurance assigned</td>
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

            // SELECT2
            $('#insuranceSelect').select2({
                placeholder: "Search insurance...",
                width: '100%'
            });

            // DATATABLE
            $('#insuranceTable').DataTable({
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
                title: 'Remove insurance?',
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