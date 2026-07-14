<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Facility Management</h2>
    </header>

    <!-- SUCCESS -->
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

        <!-- ================= LEFT: FORM ================= -->
        <div class="col-lg-5">
            <section class="card">
                <div class="card-body">

                    <form action="<?= base_url('facility/store') ?>" method="post" enctype="multipart/form-data">
                        <?= csrf_field() ?>

                        <h5 class="mb-3">Basic Information</h5>

                        <div class="mb-3">
                            <label class="form-label">Facility Name</label>
                            <input type="text" name="name" class="form-control" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Category</label>
                            <select name="category_id" class="form-control select2" required>
                                <option value="">Select Category</option>
                                <?php foreach ($categories as $c): ?>
                                    <option value="<?= $c['category_id'] ?>">
                                        <?= esc($c['name']) ?>
                                    </option>
                                <?php endforeach ?>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Ownership Type</label>
                            <select name="ownership_id" class="form-control select2" required>
                                <option value="">Select Ownership</option>
                                <?php foreach ($ownerships as $o): ?>
                                    <option value="<?= $o['ownership_id'] ?>">
                                        <?= esc($o['name']) ?>
                                    </option>
                                <?php endforeach ?>
                            </select>
                        </div>

                        <hr>

                        <h5 class="mb-3">Location</h5>

                        <div class="mb-3">
                            <label class="form-label">Country</label>
                            <select id="country" name="country_id" class="form-control select2" required>
                                <option value="">Select Country</option>

                                <?php foreach ($countries as $c): ?>
                                    <option value="<?= $c['country_id'] ?>">
                                        <?= esc($c['name']) ?>
                                    </option>
                                <?php endforeach ?>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Region</label>

                            <select id="region" name="region_id" class="form-control select2" required>
                                <option value="">Select Region</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">District</label>

                            <select id="district" name="district_id" class="form-control select2" required>
                                <option value="">Select District</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Street</label>
                            <input type="text" name="street" class="form-control">
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Address</label>
                            <textarea name="address" class="form-control"></textarea>
                        </div>

                        <hr>

                        <h5 class="mb-3">Contact</h5>

                        <div class="mb-3">
                            <label class="form-label">Phone</label>
                            <input type="text" name="phone" class="form-control">
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" name="email" class="form-control">
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Website</label>
                            <input type="text" name="website" class="form-control">
                        </div>

                        <hr>

                        <h5 class="mb-3">Geo Location</h5>

                        <div class="mb-3">
                            <label class="form-label">Latitude</label>
                            <input type="text" name="latitude" class="form-control">
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Longitude</label>
                            <input type="text" name="longitude" class="form-control">
                        </div>

                        <hr>

                        <h5 class="mb-3">Facility Logo</h5>

                        <div class="mb-3">
                            <label class="form-label">Upload Logo</label>
                            <input type="file" name="logo" class="form-control" id="logoInput">
                        </div>

                        <div class="mb-3">
                            <img id="logoPreview" style="max-height:80px; display:none;">
                        </div>

                        <hr>

                        <h5 class="mb-3">Status</h5>

                        <div class="mb-3">
                            <label class="form-label">Facility Status</label>

                            <select name="status" class="form-control">
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>

                        <div class="d-grid">
                            <button type="submit" class="btn btn-success">
                                <i class="fas fa-save"></i> Save Facility
                            </button>
                        </div>

                    </form>

                </div>
            </section>
        </div>

        <!-- ================= RIGHT: TABLE ================= -->
        <div class="col-lg-7">
            <section class="card">
                <div class="card-body">

                    <table id="facilityTable" class="table table-bordered table-striped">

                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th width="120">Actions</th>
                        </tr>
                        </thead>

                        <tbody>

                        <?php foreach ($facilities as $f): ?>
                            <tr>

                                <td><?= esc($f['name']) ?></td>

                                <td><?= $f['category_name'] ?? '-' ?></td>

                                <td>
                                <span class="badge <?= $f['status'] ? 'bg-success' : 'bg-danger' ?>">
                                    <?= $f['status'] ? 'Active' : 'Inactive' ?>
                                </span>
                                </td>

                                <td>

                                    <a href="<?= base_url('facility/edit/'.$f['facility_id']) ?>"
                                       class="btn btn-warning btn-sm">
                                        <i class="fas fa-edit"></i>
                                    </a>

                                    <a href="<?= base_url('facility/delete/'.$f['facility_id']) ?>"
                                       class="btn btn-danger btn-sm btn-delete">
                                        <i class="fas fa-trash"></i>
                                    </a>

                                </td>

                            </tr>
                        <?php endforeach ?>

                        </tbody>

                    </table>

                </div>
            </section>
        </div>

    </div>

<?= $this->endSection() ?>

<?= $this->section('scripts') ?>

    <script>

        $(document).ready(function(){

            // SELECT2
            $('.select2').select2({
                theme: 'bootstrap'
            });

            // DATATABLE
            $('#facilityTable').DataTable();

            // COUNTRY → REGION
            $('#country').on('change', function(){

                let id = $(this).val();

                $.get("<?= base_url('api/regions/') ?>" + id, function(data){

                    let html = '<option value="">Select Region</option>';

                    data.forEach(r => {
                        html += `<option value="${r.region_id}">${r.name}</option>`;
                    });

                    $('#region').html(html).trigger('change');
                });

            });

            // REGION → DISTRICT
            $('#region').on('change', function(){

                let id = $(this).val();

                $.get("<?= base_url('api/districts/') ?>" + id, function(data){

                    let html = '<option value="">Select District</option>';

                    data.forEach(d => {
                        html += `<option value="${d.district_id}">${d.name}</option>`;
                    });

                    $('#district').html(html);
                });

            });

            // LOGO PREVIEW
            $('#logoInput').on('change', function(e){

                const file = e.target.files[0];

                if(file){
                    $('#logoPreview')
                        .attr('src', URL.createObjectURL(file))
                        .show();
                }

            });

        });

        // DELETE
        $(document).on('click','.btn-delete',function(e){

            e.preventDefault();

            let url = $(this).attr('href');

            Swal.fire({
                title:'Are you sure?',
                icon:'warning',
                showCancelButton:true
            }).then((r)=>{

                if(r.isConfirmed){
                    window.location.href = url;
                }

            });

        });

    </script>

<?= $this->endSection() ?>