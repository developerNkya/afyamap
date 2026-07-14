<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Dashboard</h2>
    </header>

    <!-- =====================================================
    TOP SUMMARY CARDS
    ===================================================== -->

    <div class="row">

        <!-- TOTAL -->
        <div class="col-xl-3 col-md-6 mb-3">

            <section class="card card-featured-left card-featured-primary">

                <div class="card-body">

                    <div class="widget-summary">

                        <div class="widget-summary-col widget-summary-col-icon">

                            <div class="summary-icon bg-primary">
                                <i class="fas fa-hospital"></i>
                            </div>

                        </div>

                        <div class="widget-summary-col">

                            <div class="summary">

                                <h4 class="title">
                                    Total Facilities
                                </h4>

                                <div class="info">
                                    <strong class="amount">
                                        <?= number_format($totalFacilities) ?>
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

        <!-- ACTIVE -->
        <div class="col-xl-3 col-md-6 mb-3">

            <section class="card card-featured-left card-featured-success">

                <div class="card-body">

                    <div class="widget-summary">

                        <div class="widget-summary-col widget-summary-col-icon">

                            <div class="summary-icon bg-success">
                                <i class="fas fa-check-circle"></i>
                            </div>

                        </div>

                        <div class="widget-summary-col">

                            <div class="summary">

                                <h4 class="title">
                                    Active Facilities
                                </h4>

                                <div class="info">
                                    <strong class="amount">
                                        <?= number_format($activeFacilities) ?>
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

        <!-- INACTIVE -->
        <div class="col-xl-3 col-md-6 mb-3">

            <section class="card card-featured-left card-featured-danger">

                <div class="card-body">

                    <div class="widget-summary">

                        <div class="widget-summary-col widget-summary-col-icon">

                            <div class="summary-icon bg-danger">
                                <i class="fas fa-times-circle"></i>
                            </div>

                        </div>

                        <div class="widget-summary-col">

                            <div class="summary">

                                <h4 class="title">
                                    Inactive Facilities
                                </h4>

                                <div class="info">
                                    <strong class="amount">
                                        <?= number_format($inactiveFacilities) ?>
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

        <!-- SERVICES -->
        <div class="col-xl-3 col-md-6 mb-3">

            <section class="card card-featured-left card-featured-info">

                <div class="card-body">

                    <div class="widget-summary">

                        <div class="widget-summary-col widget-summary-col-icon">

                            <div class="summary-icon bg-info">
                                <i class="fas fa-stethoscope"></i>
                            </div>

                        </div>

                        <div class="widget-summary-col">

                            <div class="summary">

                                <h4 class="title">
                                    Total Services
                                </h4>

                                <div class="info">
                                    <strong class="amount">
                                        <?= number_format($totalServices ?? 0) ?>
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    </div>


    <!-- =====================================================
    ROW 2
    ===================================================== -->

    <div class="row">

        <!-- FACILITY BY CATEGORY -->
        <div class="col-lg-6 mb-4">

            <section class="card">

                <header class="card-header">
                    <h2 class="card-title">
                        Facilities by Category
                    </h2>
                </header>

                <div class="card-body">

                    <div class="table-responsive">

                        <table class="table table-hover table-bordered">

                            <thead>

                            <tr>
                                <th>Category</th>
                                <th width="120">Facilities</th>
                            </tr>

                            </thead>

                            <tbody>

                            <?php foreach ($byCategory as $row): ?>

                                <tr>

                                    <td>
                                        <?= esc($row['category']) ?>
                                    </td>

                                    <td>

                                    <span class="badge bg-primary">

                                        <?= number_format($row['total']) ?>

                                    </span>

                                    </td>

                                </tr>

                            <?php endforeach ?>

                            </tbody>

                        </table>

                    </div>

                </div>

            </section>

        </div>


        <!-- FACILITY BY REGION -->
        <div class="col-lg-6 mb-4">

            <section class="card">

                <header class="card-header">
                    <h2 class="card-title">
                        Facilities by Region
                    </h2>
                </header>

                <div class="card-body">

                    <div class="table-responsive">

                        <table class="table table-hover table-bordered">

                            <thead>

                            <tr>
                                <th>Region</th>
                                <th width="120">Facilities</th>
                            </tr>

                            </thead>

                            <tbody>

                            <?php foreach ($byRegion as $row): ?>

                                <tr>

                                    <td>
                                        <?= esc($row['region']) ?>
                                    </td>

                                    <td>

                                    <span class="badge bg-success">

                                        <?= number_format($row['total']) ?>

                                    </span>

                                    </td>

                                </tr>

                            <?php endforeach ?>

                            </tbody>

                        </table>

                    </div>

                </div>

            </section>

        </div>

    </div>


    <!-- =====================================================
    ROW 3
    ===================================================== -->

    <div class="row">

        <!-- FACILITY BY SERVICE -->
        <div class="col-lg-6 mb-4">

            <section class="card">

                <header class="card-header">
                    <h2 class="card-title">
                        Facilities by Service
                    </h2>
                </header>

                <div class="card-body">

                    <div class="table-responsive">

                        <table class="table table-bordered table-striped"
                               id="serviceTable">

                            <thead>

                            <tr>
                                <th>Service</th>
                                <th width="120">Facilities</th>
                            </tr>

                            </thead>

                            <tbody>

                            <?php foreach ($byService as $row): ?>

                                <tr>

                                    <td>
                                        <?= esc($row['service']) ?>
                                    </td>

                                    <td>

                                    <span class="badge bg-info">

                                        <?= number_format($row['total']) ?>

                                    </span>

                                    </td>

                                </tr>

                            <?php endforeach ?>

                            </tbody>

                        </table>

                    </div>

                </div>

            </section>

        </div>


        <!-- FACILITY BY INSURANCE -->
        <div class="col-lg-6 mb-4">

            <section class="card">

                <header class="card-header">
                    <h2 class="card-title">
                        Facilities by Insurance
                    </h2>
                </header>

                <div class="card-body">

                    <div class="table-responsive">

                        <table class="table table-bordered table-striped"
                               id="insuranceTable">

                            <thead>

                            <tr>
                                <th>Insurance</th>
                                <th width="120">Facilities</th>
                            </tr>

                            </thead>

                            <tbody>

                            <?php foreach ($byInsurance as $row): ?>

                                <tr>

                                    <td>
                                        <?= esc($row['insurance']) ?>
                                    </td>

                                    <td>

                                    <span class="badge bg-warning text-dark">

                                        <?= number_format($row['total']) ?>

                                    </span>

                                    </td>

                                </tr>

                            <?php endforeach ?>

                            </tbody>

                        </table>

                    </div>

                </div>

            </section>

        </div>

    </div>


    <!-- =====================================================
    ROW 4
    ===================================================== -->

    <div class="row">

        <!-- OWNERSHIP -->
        <div class="col-lg-6 mb-4">

            <section class="card">

                <header class="card-header">
                    <h2 class="card-title">
                        Facilities by Ownership
                    </h2>
                </header>

                <div class="card-body">

                    <div class="table-responsive">

                        <table class="table table-bordered table-hover">

                            <thead>

                            <tr>
                                <th>Ownership</th>
                                <th width="120">Facilities</th>
                            </tr>

                            </thead>

                            <tbody>

                            <?php foreach ($byOwnership as $row): ?>

                                <tr>

                                    <td>
                                        <?= esc($row['ownership']) ?>
                                    </td>

                                    <td>

                                    <span class="badge bg-dark">

                                        <?= number_format($row['total']) ?>

                                    </span>

                                    </td>

                                </tr>

                            <?php endforeach ?>

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

            $('#serviceTable').DataTable({

                pageLength: 10,

                order: [[1, 'desc']]

            });

            $('#insuranceTable').DataTable({

                pageLength: 10,

                order: [[1, 'desc']]

            });

        });

    </script>

<?= $this->endSection() ?>