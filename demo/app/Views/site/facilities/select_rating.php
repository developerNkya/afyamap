<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Select Facility to Rate</h2>
    </header>

    <!-- SUCCESS MESSAGE -->
<?php if (session()->getFlashdata('success')): ?>
    <script>
        Swal.fire({
            icon:'success',
            title:'Success',
            text:'<?= session()->getFlashdata('success') ?>',
            timer:1500,
            showConfirmButton:false
        });
    </script>
<?php endif; ?>

    <section class="card">
        <div class="card-body">

            <table id="facilityTable" class="table table-bordered table-striped table-hover">

                <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Level</th>
                    <th>Location</th>
                    <th>Rating</th>
                    <th width="120">Action</th>
                </tr>
                </thead>

                <tbody>

                <?php if (!empty($facilities) && is_array($facilities)): ?>
                    <?php foreach ($facilities as $f): ?>

                        <tr>

                            <!-- NAME -->
                            <td><?= esc($f['name'] ?? '-') ?></td>

                            <!-- CATEGORY -->
                            <td><?= esc($f['category_name'] ?? '-') ?></td>

                            <!-- LEVEL -->
                            <td><?= esc($f['level_name'] ?? '-') ?></td>

                            <!-- LOCATION -->
                            <td>
                                <?= esc($f['region_name'] ?? '-') ?>,
                                <?= esc($f['country_name'] ?? '-') ?>
                            </td>

                            <!-- RATING -->
                            <td>
                                <?php
                                $rating = is_numeric($f['average_rating'] ?? null)
                                    ? (float)$f['average_rating']
                                    : 0;

                                // Color logic
                                if ($rating >= 4) {
                                    $color = 'bg-success';
                                } elseif ($rating >= 3) {
                                    $color = 'bg-warning';
                                } else {
                                    $color = 'bg-danger';
                                }
                                ?>

                                <!-- Badge -->
                                <span class="badge <?= $color ?>">
            <?= number_format($rating, 2) ?> / 5
        </span>

                                <!-- Stars -->
                                <div class="mt-1">
                                    <?php
                                    $stars = round($rating);
                                    for ($i = 1; $i <= 5; $i++) {
                                        echo $i <= $stars
                                            ? '<i class="fas fa-star text-warning"></i>'
                                            : '<i class="far fa-star text-muted"></i>';
                                    }
                                    ?>
                                </div>
                            </td>

                            <!-- ACTION -->
                            <td>
                                <a href="<?= base_url('facility/rating/'.$f['facility_id']) ?>"
                                   class="btn btn-success btn-sm">
                                    <i class="fas fa-star"></i> Rate
                                </a>
                            </td>

                        </tr>

                    <?php endforeach ?>
                <?php else: ?>

                    <tr>
                        <td colspan="6" class="text-center">No facilities found</td>
                    </tr>

                <?php endif; ?>

                </tbody>

            </table>

        </div>
    </section>

<?= $this->endSection() ?>


<?= $this->section('scripts') ?>

    <script>

        $(document).ready(function(){

            $('#facilityTable').DataTable({
                responsive: true,
                pageLength: 10,
                order: [[0, 'asc']]
            });

        });

    </script>

<?= $this->endSection() ?>