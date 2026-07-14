<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>
            <i class="fas fa-file-import text-primary"></i>
            Facility Import Preview
        </h2>
    </header>

    <div class="row">

        <div class="col-12">

            <?php

                $totalRows     = count($previewData ?? []);
                $validRows     = 0;
                $invalidRows   = 0;
                $duplicateRows = 0;

                foreach ($previewData as $row) {

                    if (!empty($row['valid'])) {
                        $validRows++;
                    } else {
                        $invalidRows++;
                    }

                    if (!empty($row['duplicate'])) {
                        $duplicateRows++;
                    }
                }

            ?>

            <!-- ===================================================== -->
            <!-- SUMMARY CARDS -->
            <!-- ===================================================== -->

            <div class="row mb-4">

                <div class="col-md-3 mb-3">

                    <section class="card border-0 shadow-sm h-100">

                        <div class="card-body text-center">

                            <div class="mb-2">
                                <i class="fas fa-database fa-2x text-primary"></i>
                            </div>

                            <h2 class="fw-bold text-primary">
                                <?= number_format($totalRows) ?>
                            </h2>

                            <p class="mb-0 text-muted">
                                Total Rows
                            </p>

                        </div>

                    </section>

                </div>

                <div class="col-md-3 mb-3">

                    <section class="card border-0 shadow-sm h-100">

                        <div class="card-body text-center">

                            <div class="mb-2">
                                <i class="fas fa-check-circle fa-2x text-success"></i>
                            </div>

                            <h2 class="fw-bold text-success">
                                <?= number_format($validRows) ?>
                            </h2>

                            <p class="mb-0 text-muted">
                                Valid Rows
                            </p>

                        </div>

                    </section>

                </div>

                <div class="col-md-3 mb-3">

                    <section class="card border-0 shadow-sm h-100">

                        <div class="card-body text-center">

                            <div class="mb-2">
                                <i class="fas fa-times-circle fa-2x text-danger"></i>
                            </div>

                            <h2 class="fw-bold text-danger">
                                <?= number_format($invalidRows) ?>
                            </h2>

                            <p class="mb-0 text-muted">
                                Invalid Rows
                            </p>

                        </div>

                    </section>

                </div>

                <div class="col-md-3 mb-3">

                    <section class="card border-0 shadow-sm h-100">

                        <div class="card-body text-center">

                            <div class="mb-2">
                                <i class="fas fa-copy fa-2x text-warning"></i>
                            </div>

                            <h2 class="fw-bold text-warning">
                                <?= number_format($duplicateRows) ?>
                            </h2>

                            <p class="mb-0 text-muted">
                                Duplicate Rows
                            </p>

                        </div>

                    </section>

                </div>

            </div>

            <!-- ===================================================== -->
            <!-- ACTION BUTTONS -->
            <!-- ===================================================== -->

            <section class="card border-0 shadow-sm mb-4">

                <div class="card-body">

                    <div class="d-flex flex-wrap gap-2">

                        <form action="<?= base_url('facilities/import/save') ?>"
                              method="post">

                            <?= csrf_field() ?>

                            <button type="submit"
                                    class="btn btn-success">

                                <i class="fas fa-check-circle"></i>
                                Confirm Import

                            </button>

                        </form>

                        <a href="<?= base_url('facilities/import') ?>"
                           class="btn btn-secondary">

                            <i class="fas fa-arrow-left"></i>
                            Back

                        </a>

                    </div>

                </div>

            </section>

            <!-- ===================================================== -->
            <!-- LEGEND -->
            <!-- ===================================================== -->

            <div class="alert alert-info border-0 shadow-sm">

                <div class="d-flex flex-wrap align-items-center gap-3">

                    <strong>
                        <i class="fas fa-info-circle"></i>
                        Import Legend
                    </strong>

                    <span class="badge bg-success px-3 py-2">
                    VALID
                </span>

                    <span class="badge bg-danger px-3 py-2">
                    INVALID
                </span>

                    <span class="badge bg-warning px-3 py-2 text-dark">
                    DUPLICATE
                </span>

                </div>

            </div>

            <!-- ===================================================== -->
            <!-- FILTERS -->
            <!-- ===================================================== -->

            <section class="card border-0 shadow-sm mb-4">

                <div class="card-body">

                    <div class="row">

                        <div class="col-md-3 mb-2">

                            <select id="statusFilter"
                                    class="form-control">

                                <option value="">
                                    All Status
                                </option>

                                <option value="Valid">
                                    Valid
                                </option>

                                <option value="Invalid">
                                    Invalid
                                </option>

                                <option value="Duplicate">
                                    Duplicate
                                </option>

                            </select>

                        </div>

                        <div class="col-md-3 mb-2">

                            <input type="text"
                                   id="facilitySearch"
                                   class="form-control"
                                   placeholder="Search Facility...">

                        </div>

                        <div class="col-md-3 mb-2">

                            <input type="text"
                                   id="regionSearch"
                                   class="form-control"
                                   placeholder="Search Region...">

                        </div>

                        <div class="col-md-3 mb-2">

                            <button class="btn btn-dark w-100"
                                    id="clearFilters">

                                <i class="fas fa-times"></i>
                                Clear Filters

                            </button>

                        </div>

                    </div>

                </div>

            </section>

            <!-- ===================================================== -->
            <!-- TABLE -->
            <!-- ===================================================== -->

            <section class="card border-0 shadow-sm">

                <div class="card-body">

                    <div class="table-responsive">

                        <table class="table table-hover table-bordered align-middle"
                               id="previewTable"
                               width="100%">

                            <thead class="table-dark">

                            <tr>

                                <th>#</th>
                                <th>Facility</th>
                                <th>Category</th>
                                <th>Ownership</th>
                                <th>Region</th>
                                <th>District</th>
                                <th>Services</th>
                                <th>Insurances</th>
                                <th>Status</th>
                                <th>Errors</th>

                            </tr>

                            </thead>

                            <tbody>

                            <?php foreach ($previewData as $index => $row): ?>

                                <?php

                                $rowClass = '';

                                if (!empty($row['duplicate'])) {

                                    $rowClass = 'table-warning';

                                } elseif (!empty($row['valid'])) {

                                    $rowClass = 'table-success';

                                } else {

                                    $rowClass = 'table-danger';
                                }

                                ?>

                                <tr class="<?= $rowClass ?>">

                                    <!-- ROW NUMBER -->

                                    <td>
                                        <?= $row['row_number'] ?? ($index + 1) ?>
                                    </td>

                                    <!-- FACILITY -->

                                    <td>

                                        <strong>

                                            <?= esc($row['name']['value'] ?? '') ?>

                                        </strong>

                                    </td>

                                    <!-- CATEGORY -->

                                    <td>

                                        <?= esc($row['category']['value'] ?? '') ?>

                                    </td>

                                    <!-- OWNERSHIP -->

                                    <td>

                                        <?= esc($row['ownership']['value'] ?? '') ?>

                                    </td>

                                    <!-- REGION -->

                                    <td>

                                        <?= esc($row['region']['value'] ?? '') ?>

                                    </td>

                                    <!-- DISTRICT -->

                                    <td>

                                        <?= esc($row['district']['value'] ?? '') ?>

                                    </td>

                                    <!-- SERVICES -->

                                    <td>

                                        <?php if (!empty($row['services'])): ?>

                                            <?php foreach ($row['services'] as $service): ?>

                                                <span class="badge <?= !empty($service['valid']) ? 'bg-primary' : 'bg-danger' ?> mb-1">

                                                <?= esc($service['name']) ?>

                                            </span>

                                            <?php endforeach; ?>

                                        <?php else: ?>

                                            <span class="text-muted">
                                            No Services
                                        </span>

                                        <?php endif; ?>

                                    </td>

                                    <!-- INSURANCES -->

                                    <td>

                                        <?php if (!empty($row['insurances'])): ?>

                                            <?php foreach ($row['insurances'] as $insurance): ?>

                                                <span class="badge <?= !empty($insurance['valid']) ? 'bg-info' : 'bg-danger' ?> mb-1">

                                                <?= esc($insurance['name']) ?>

                                            </span>

                                            <?php endforeach; ?>

                                        <?php else: ?>

                                            <span class="text-muted">
                                            No Insurance
                                        </span>

                                        <?php endif; ?>

                                    </td>

                                    <!-- STATUS -->

                                    <td>

                                        <?php if (!empty($row['duplicate'])): ?>

                                            <span class="badge bg-warning text-dark px-3 py-2">
                                            Duplicate
                                        </span>

                                        <?php elseif (!empty($row['valid'])): ?>

                                            <span class="badge bg-success px-3 py-2">
                                            Valid
                                        </span>

                                        <?php else: ?>

                                            <span class="badge bg-danger px-3 py-2">
                                            Invalid
                                        </span>

                                        <?php endif; ?>

                                    </td>

                                    <!-- ERRORS -->

                                    <td>

                                        <?php if (!empty($row['errors'])): ?>

                                            <?php foreach ($row['errors'] as $error): ?>

                                                <div class="text-danger mb-1">

                                                    <i class="fas fa-times-circle"></i>

                                                    <?= esc($error) ?>

                                                </div>

                                            <?php endforeach; ?>

                                        <?php else: ?>

                                            <span class="text-success fw-bold">

                                            <i class="fas fa-check-circle"></i>

                                            No Errors

                                        </span>

                                        <?php endif; ?>

                                    </td>

                                </tr>

                            <?php endforeach; ?>

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

        $(document).ready(function () {

            let table = $('#previewTable').DataTable({

                pageLength: 25,

                responsive: true,

                order: [[0, 'asc']],

                dom:
                    "<'row mb-3'<'col-md-6'l><'col-md-6'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row mt-3'<'col-md-5'i><'col-md-7'p>>"

            });

            // =====================================================
            // STATUS FILTER
            // =====================================================

            $('#statusFilter').on('change', function () {

                table.column(8)
                    .search(this.value)
                    .draw();

            });

            // =====================================================
            // FACILITY FILTER
            // =====================================================

            $('#facilitySearch').on('keyup', function () {

                table.column(1)
                    .search(this.value)
                    .draw();

            });

            // =====================================================
            // REGION FILTER
            // =====================================================

            $('#regionSearch').on('keyup', function () {

                table.column(4)
                    .search(this.value)
                    .draw();

            });

            // =====================================================
            // CLEAR FILTERS
            // =====================================================

            $('#clearFilters').on('click', function () {

                $('#statusFilter').val('');

                $('#facilitySearch').val('');

                $('#regionSearch').val('');

                table.search('').columns().search('').draw();

            });

        });

    </script>

<?= $this->endSection() ?>