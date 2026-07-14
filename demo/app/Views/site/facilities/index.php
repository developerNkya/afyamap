<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header d-flex justify-content-between align-items-center">

        <h2>Facility Management</h2>

        <div class="right-wrapper text-end">

            <?php if (hasPermission('create_facility')): ?>

                <a href="<?= base_url('facility/create') ?>"
                   class="btn btn-success">

                    <i class="fas fa-plus"></i>
                    Add Facility

                </a>

            <?php endif; ?>

        </div>

    </header>

    <!-- SUCCESS MESSAGE -->
<?php if (session()->getFlashdata('success')): ?>

    <script>

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: '<?= session()->getFlashdata('success') ?>',
            timer: 2500,
            showConfirmButton: false
        });

    </script>

<?php endif; ?>


    <!-- =========================================
    FILTER SECTION
    ========================================= -->

    <section class="card mb-3">

        <div class="card-body">

            <form method="get"
                  action="<?= current_url() ?>">

                <div class="row g-3">

                    <!-- SEARCH -->
                    <div class="col-md-4">

                        <label class="form-label">
                            Search
                        </label>

                        <input type="text"
                               name="keyword"
                               value="<?= esc($_GET['keyword'] ?? '') ?>"
                               class="form-control"
                               placeholder="Facility, phone, address, website...">

                    </div>

                    <!-- CATEGORY -->
                    <div class="col-md-2">

                        <label class="form-label">
                            Category
                        </label>

                        <select name="category"
                                class="form-control select2">

                            <option value="">
                                All Categories
                            </option>

                            <?php foreach ($categories as $cat): ?>

                                <option value="<?= $cat['category_id'] ?>"
                                        <?= ($_GET['category'] ?? '') == $cat['category_id'] ? 'selected' : '' ?>>

                                    <?= esc($cat['name']) ?>

                                </option>

                            <?php endforeach; ?>

                        </select>

                    </div>

                    <!-- REGION -->
                    <div class="col-md-2">

                        <label class="form-label">
                            Region
                        </label>

                        <select id="regionFilter"
                                name="region"
                                class="form-control select2">

                            <option value="">
                                All Regions
                            </option>

                            <?php foreach ($regions as $reg): ?>

                                <option value="<?= $reg['region_id'] ?>"
                                        <?= ($_GET['region'] ?? '') == $reg['region_id'] ? 'selected' : '' ?>>

                                    <?= esc($reg['name']) ?>

                                </option>

                            <?php endforeach; ?>

                        </select>

                    </div>

                    <!-- DISTRICT -->
                    <div class="col-md-2">

                        <label class="form-label">
                            District
                        </label>

                        <select id="districtFilter"
                                name="district"
                                class="form-control select2">

                            <option value="">
                                All Districts
                            </option>

                            <?php foreach ($districts as $dist): ?>

                                <option value="<?= $dist['district_id'] ?>"
                                        <?= ($_GET['district'] ?? '') == $dist['district_id'] ? 'selected' : '' ?>>

                                    <?= esc($dist['name']) ?>

                                </option>

                            <?php endforeach; ?>

                        </select>

                    </div>

                    <!-- SERVICE -->
                    <div class="col-md-2">

                        <label class="form-label">
                            Service
                        </label>

                        <select name="service"
                                class="form-control select2">

                            <option value="">
                                All Services
                            </option>

                            <?php foreach ($services as $srv): ?>

                                <option value="<?= $srv['service_id'] ?>"
                                        <?= ($_GET['service'] ?? '') == $srv['service_id'] ? 'selected' : '' ?>>

                                    <?= esc($srv['name']) ?>

                                </option>

                            <?php endforeach; ?>

                        </select>

                    </div>

                    <!-- INSURANCE -->
                    <div class="col-md-2">

                        <label class="form-label">
                            Insurance
                        </label>

                        <select name="insurance"
                                class="form-control select2">

                            <option value="">
                                All Insurance
                            </option>

                            <?php foreach ($insurances as $ins): ?>

                                <option value="<?= $ins['insurance_id'] ?>"
                                        <?= ($_GET['insurance'] ?? '') == $ins['insurance_id'] ? 'selected' : '' ?>>

                                    <?= esc($ins['name']) ?>

                                </option>

                            <?php endforeach; ?>

                        </select>

                    </div>

                    <!-- STATUS -->
                    <div class="col-md-2">

                        <label class="form-label">
                            Status
                        </label>

                        <select name="status"
                                class="form-control">

                            <option value="">
                                All Status
                            </option>

                            <option value="1"
                                    <?= ($_GET['status'] ?? '') == '1' ? 'selected' : '' ?>>

                                Active

                            </option>

                            <option value="0"
                                    <?= ($_GET['status'] ?? '') == '0' ? 'selected' : '' ?>>

                                Inactive

                            </option>

                        </select>

                    </div>

                    <!-- BUTTONS -->
                    <div class="col-md-12">

                        <button type="submit"
                                class="btn btn-primary">

                            <i class="fas fa-search"></i>
                            Apply Filter

                        </button>

                        <a href="<?= current_url() ?>"
                           class="btn btn-default">

                            <i class="fas fa-sync"></i>
                            Reset

                        </a>

                    </div>

                </div>

            </form>

        </div>

    </section>


    <!-- =========================================
    TABLE
    ========================================= -->

    <section class="card">

        <div class="card-body">

            <div class="table-responsive">

                <table id="facilityTable"
                       class="table table-bordered table-striped table-hover align-middle">

                    <thead>

                    <tr>

                        <th width="60">Logo</th>

                        <th>Facility</th>

                        <th>Category</th>

                        <th>Phone</th>

                        <th>Region</th>

                        <th>District</th>

                        <th>Services</th>

                        <th>Insurances</th>

                        <th>Status</th>

                        <th width="120">Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    <?php if (!empty($facilities)): ?>

                        <?php foreach ($facilities as $row): ?>

                            <tr>

                                <!-- LOGO -->
                                <td class="text-center">

                                    <?php if (!empty($row['logo'])): ?>

                                        <img src="<?= base_url('uploads/facilities/' . $row['logo']) ?>"
                                             class="rounded shadow-sm"
                                             style="width:45px;height:45px;object-fit:cover;">

                                    <?php else: ?>

                                        <div class="bg-light rounded d-flex align-items-center justify-content-center"
                                             style="width:45px;height:45px;">

                                            <i class="fas fa-hospital text-secondary"></i>

                                        </div>

                                    <?php endif; ?>

                                </td>

                                <!-- FACILITY -->
                                <td>

                                    <strong>
                                        <?= esc($row['name']) ?>
                                    </strong>

                                    <br>

                                    <small class="text-muted">

                                        <?= esc($row['address'] ?? '-') ?>

                                    </small>

                                </td>

                                <!-- CATEGORY -->
                                <td>

                                <span class="badge bg-primary">

                                    <?= esc($row['category_name']) ?>

                                </span>

                                </td>

                                <!-- PHONE -->
                                <td>

                                    <?= esc($row['phone'] ?? '-') ?>

                                </td>

                                <!-- REGION -->
                                <td>

                                    <?= esc($row['region_name']) ?>

                                </td>

                                <!-- DISTRICT -->
                                <td>

                                    <?= esc($row['district_name']) ?>

                                </td>

                                <!-- SERVICES -->
                                <td style="min-width:220px;">

                                    <?php
                                        $facilitySrv =
                                                $facilityServices[$row['facility_id']] ?? [];
                                    ?>

                                    <?php if (!empty($facilitySrv)): ?>

                                        <?php foreach ($facilitySrv as $srv): ?>

                                            <span class="badge bg-success mb-1">

                                            <?= esc($srv) ?>

                                        </span>

                                        <?php endforeach; ?>

                                    <?php else: ?>

                                        <span class="text-muted">

                                        No Services

                                    </span>

                                    <?php endif; ?>

                                </td>

                                <!-- INSURANCE -->
                                <td style="min-width:220px;">

                                    <?php
                                        $facilityIns =
                                                $facilityInsurances[$row['facility_id']] ?? [];
                                    ?>

                                    <?php if (!empty($facilityIns)): ?>

                                        <?php foreach ($facilityIns as $ins): ?>

                                            <span class="badge bg-info mb-1">

                                            <?= esc($ins) ?>

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

                                <span class="badge <?= $row['status'] ? 'bg-success' : 'bg-danger' ?>">

                                    <?= $row['status'] ? 'Active' : 'Inactive' ?>

                                </span>

                                </td>

                                <!-- ACTIONS -->
                                <td class="text-center">

                                    <div class="dropdown">

                                        <button class="btn btn-sm btn-light border dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown">

                                            <i class="fas fa-cog"></i>

                                        </button>

                                        <ul class="dropdown-menu dropdown-menu-end">

                                            <li>

                                                <a class="dropdown-item"
                                                   href="<?= base_url('facility/services/'.$row['facility_id']) ?>">

                                                    <i class="fas fa-cogs me-2 text-primary"></i>
                                                    Services

                                                </a>

                                            </li>

                                            <li>

                                                <a class="dropdown-item"
                                                   href="<?= base_url('facility/insurances/'.$row['facility_id']) ?>">

                                                    <i class="fas fa-shield-alt me-2 text-success"></i>
                                                    Insurance

                                                </a>

                                            </li>

                                            <li>

                                                <a class="dropdown-item"
                                                   href="<?= base_url('facility/gallery/'.$row['facility_id']) ?>">

                                                    <i class="fas fa-images me-2 text-secondary"></i>
                                                    Gallery

                                                </a>

                                            </li>

                                            <li>
                                                <hr class="dropdown-divider">
                                            </li>

                                            <li>

                                                <a class="dropdown-item"
                                                   href="<?= base_url('facility/edit/'.$row['facility_id']) ?>">

                                                    <i class="fas fa-edit me-2 text-warning"></i>
                                                    Edit

                                                </a>

                                            </li>

                                            <li>

                                                <a class="dropdown-item"
                                                   href="<?= base_url('facility/toggle/'.$row['facility_id']) ?>">

                                                    <i class="fas fa-sync me-2 text-info"></i>
                                                    Toggle Status

                                                </a>

                                            </li>

                                            <li>

                                                <a class="dropdown-item text-danger btn-delete"
                                                   href="<?= base_url('facility/delete/'.$row['facility_id']) ?>">

                                                    <i class="fas fa-trash me-2"></i>
                                                    Delete

                                                </a>

                                            </li>

                                        </ul>

                                    </div>

                                </td>

                            </tr>

                        <?php endforeach ?>

                    <?php else: ?>

                        <tr>

                            <td colspan="10"
                                class="text-center">

                                No facilities found

                            </td>

                        </tr>

                    <?php endif; ?>

                    </tbody>

                </table>

            </div>

        </div>

    </section>

<?= $this->endSection() ?>


<?= $this->section('scripts') ?>

    <script>

        $(document).ready(function () {

            // SELECT2
            $('.select2').select2({
                theme: 'bootstrap',
                width: '100%'
            });

            // DATATABLE
            $('#facilityTable').DataTable({

                responsive: true,

                processing: true,

                pageLength: 25,

                order: [[1, 'asc']],

                scrollX: true,

                autoWidth: false,

                lengthMenu: [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ],

                columnDefs: [
                    {
                        orderable: false,
                        targets: [0, 6, 7, 9]
                    }
                ]

            });

        });

        // =========================================
        // REGION → DISTRICT
        // =========================================

        $('#regionFilter').on('change', function () {

            let regionId = $(this).val();

            $('#districtFilter').html(
                '<option value="">Loading...</option>'
            );

            $.get(
                "<?= base_url('api/districts/') ?>" + regionId,
                function (data) {

                    let html =
                        '<option value="">All Districts</option>';

                    data.forEach(function (item) {

                        html += `
                        <option value="${item.district_id}">
                            ${item.name}
                        </option>
                    `;
                    });

                    $('#districtFilter').html(html);

                }
            );

        });

        // =========================================
        // DELETE CONFIRM
        // =========================================

        $(document).on('click', '.btn-delete', function (e) {

            e.preventDefault();

            let url = $(this).attr('href');

            Swal.fire({

                title: 'Delete Facility?',

                text: 'This action cannot be undone.',

                icon: 'warning',

                showCancelButton: true,

                confirmButtonColor: '#d33',

                confirmButtonText: 'Yes Delete'

            }).then((result) => {

                if (result.isConfirmed) {

                    window.location.href = url;

                }

            });

        });

    </script>

<?= $this->endSection() ?>