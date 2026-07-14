<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Facility Import</h2>
    </header>

    <div class="row">

        <div class="col-lg-8 mx-auto">

            <section class="card">

                <header class="card-header">
                    <h2 class="card-title">
                        Upload Facilities Excel File
                    </h2>
                </header>

                <div class="card-body">

                    <!-- SUCCESS -->
                    <?php if(session()->getFlashdata('success')): ?>

                        <div class="alert alert-success">

                            <?= session()->getFlashdata('success') ?>

                        </div>

                    <?php endif; ?>

                    <!-- ERROR -->
                    <?php if(session()->getFlashdata('error')): ?>

                        <div class="alert alert-danger">

                            <?= session()->getFlashdata('error') ?>

                        </div>

                    <?php endif; ?>

                    <form action="<?= base_url('facilities/import/preview') ?>"
                          method="post"
                          enctype="multipart/form-data">

                        <?= csrf_field() ?>

                        <!-- FILE -->
                        <div class="mb-4">

                            <label class="form-label fw-bold">
                                Excel File
                            </label>

                            <input type="file"
                                   name="excel"
                                   class="form-control"
                                   accept=".xlsx,.xls,.csv"
                                   required>

                            <small class="text-muted">
                                Accepted formats:
                                XLSX, XLS, CSV
                            </small>

                        </div>

                        <!-- TEMPLATE INFO -->
                        <div class="alert alert-info">

                            <h5 class="mb-3">
                                Expected Excel Columns
                            </h5>

                            <div class="row">

                                <div class="col-md-6">

                                    <ul class="mb-0">

                                        <li>name</li>
                                        <li>category</li>
                                        <li>ownership</li>
                                        <li>region</li>
                                        <li>district</li>
                                        <li>street</li>
                                        <li>address</li>

                                    </ul>

                                </div>

                                <div class="col-md-6">

                                    <ul class="mb-0">

                                        <li>phone</li>
                                        <li>email</li>
                                        <li>website</li>
                                        <li>latitude</li>
                                        <li>longitude</li>
                                        <li>services</li>
                                        <li>insurances</li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                        <!-- SAMPLE FORMAT -->
                        <div class="alert alert-warning">

                            <strong>Services Format:</strong>

                            <br>

                            Pharmacy, Laboratory, Radiology

                            <hr>

                            <strong>Insurance Format:</strong>

                            <br>

                            NHIF, Jubilee, AAR

                        </div>

                        <!-- BUTTON -->
                        <div class="d-grid">

                            <button type="submit"
                                    class="btn btn-primary btn-lg">

                                <i class="fas fa-upload"></i>

                                Upload & Preview

                            </button>

                        </div>

                    </form>

                </div>

            </section>

        </div>

    </div>

<?= $this->endSection() ?>