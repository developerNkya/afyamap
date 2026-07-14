<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Edit Facility</h2>
    </header>

    <div class="row">

        <div class="col-lg-5">
            <section class="card">
                <div class="card-body">

                    <form action="<?= base_url('facility/update/'.$facility['facility_id']) ?>" method="post" enctype="multipart/form-data">
                        <?= csrf_field() ?>

                        <!-- BASIC -->
                        <div class="mb-3">
                            <label>Facility Name</label>
                            <input type="text" name="name" class="form-control"
                                   value="<?= esc($facility['name']) ?>" required>
                        </div>

                        <div class="mb-3">
                            <label>Category</label>
                            <select name="category_id" class="form-control select2" required>
                                <?php foreach ($categories as $c): ?>
                                    <option value="<?= $c['category_id'] ?>"
                                        <?= $facility['category_id'] == $c['category_id'] ? 'selected' : '' ?>>
                                        <?= $c['name'] ?>
                                    </option>
                                <?php endforeach ?>
                            </select>
                        </div>



                        <div class="mb-3">
                            <label>Ownership</label>
                            <select name="ownership_id" class="form-control select2" required>
                                <?php foreach ($ownerships as $o): ?>
                                    <option value="<?= $o['ownership_id'] ?>"
                                        <?= $facility['ownership_id'] == $o['ownership_id'] ? 'selected' : '' ?>>
                                        <?= $o['name'] ?>
                                    </option>
                                <?php endforeach ?>
                            </select>
                        </div>

                        <!-- LOCATION -->
                        <hr>

                        <div class="mb-3">
                            <label>Country</label>
                            <select id="country" name="country_id" class="form-control select2" required>
                                <?php foreach ($countries as $c): ?>
                                    <option value="<?= $c['country_id'] ?>"
                                        <?= $facility['country_id'] == $c['country_id'] ? 'selected' : '' ?>>
                                        <?= $c['name'] ?>
                                    </option>
                                <?php endforeach ?>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label>Region</label>
                            <select id="region" name="region_id" class="form-control select2" required></select>
                        </div>

                        <div class="mb-3">
                            <label>District</label>
                            <select id="district" name="district_id" class="form-control select2" required></select>
                        </div>

                        <!-- CONTACT -->
                        <hr>

                        <input type="text" name="phone" class="form-control mb-2"
                               value="<?= $facility['phone'] ?>" placeholder="Phone">

                        <input type="email" name="email" class="form-control mb-2"
                               value="<?= $facility['email'] ?>" placeholder="Email">

                        <input type="text" name="website" class="form-control mb-3"
                               value="<?= $facility['website'] ?>" placeholder="Website">

                        <!-- GEO -->
                        <hr>

                        <input type="text" name="latitude" class="form-control mb-2"
                               value="<?= $facility['latitude'] ?>" placeholder="Latitude">

                        <input type="text" name="longitude" class="form-control mb-3"
                               value="<?= $facility['longitude'] ?>" placeholder="Longitude">

                        <!-- LOGO -->
                        <hr>

                        <label>Current Logo</label><br>
                        <?php if ($facility['logo']): ?>
                            <img src="<?= base_url('uploads/facilities/'.$facility['logo']) ?>" height="60">
                        <?php endif; ?>

                        <input type="file" name="logo" class="form-control mt-2">

                        <!-- STATUS -->
                        <hr>

                        <select name="status" class="form-control">
                            <option value="1" <?= $facility['status'] ? 'selected' : '' ?>>Active</option>
                            <option value="0" <?= !$facility['status'] ? 'selected' : '' ?>>Inactive</option>
                        </select>

                        <br>

                        <button class="btn btn-warning w-100">
                            <i class="fas fa-edit"></i> Update Facility
                        </button>

                    </form>

                </div>
            </section>
        </div>

    </div>

<?= $this->endSection() ?>

<?= $this->section('scripts') ?>

    <script>

        $(document).ready(function(){

            $('.select2').select2({ theme: 'bootstrap' });

            let selectedRegion   = "<?= $facility['region_id'] ?>";
            let selectedDistrict = "<?= $facility['district_id'] ?>";

            // LOAD REGIONS FIRST
            $.get("<?= base_url('api/regions/') ?><?= $facility['country_id'] ?>", function(data){

                let html = '';
                data.forEach(r=>{
                    let selected = r.region_id == selectedRegion ? 'selected' : '';
                    html += `<option value="${r.region_id}" ${selected}>${r.name}</option>`;
                });

                $('#region').html(html).trigger('change');

                // LOAD DISTRICTS AFTER REGION
                $.get("<?= base_url('api/districts/') ?>"+selectedRegion, function(ddata){

                    let dhtml = '';
                    ddata.forEach(d=>{
                        let selected = d.district_id == selectedDistrict ? 'selected' : '';
                        dhtml += `<option value="${d.district_id}" ${selected}>${d.name}</option>`;
                    });

                    $('#district').html(dhtml);
                });

            });

            // CHANGE COUNTRY
            $('#country').change(function(){
                let id = $(this).val();

                $.get("<?= base_url('api/regions/') ?>"+id, function(data){
                    let html = '<option>Select Region</option>';
                    data.forEach(r=>{
                        html += `<option value="${r.region_id}">${r.name}</option>`;
                    });
                    $('#region').html(html).trigger('change');
                });
            });

            // CHANGE REGION
            $('#region').change(function(){
                let id = $(this).val();

                $.get("<?= base_url('api/districts/') ?>"+id, function(data){
                    let html = '<option>Select District</option>';
                    data.forEach(d=>{
                        html += `<option value="${d.district_id}">${d.name}</option>`;
                    });
                    $('#district').html(html);
                });
            });

        });

    </script>

<?= $this->endSection() ?>