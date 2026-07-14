<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Facility Rating</h2>
    </header>

    <!-- SUCCESS -->
<?php if (session()->getFlashdata('success')): ?>
    <script>
        Swal.fire({
            icon:'success',
            title:'Saved',
            text:'<?= session()->getFlashdata('success') ?>',
            timer:1500,
            showConfirmButton:false
        });
    </script>
<?php endif; ?>

<?php if (session()->getFlashdata('error')): ?>
    <div class="alert alert-danger">
        <?= session()->getFlashdata('error') ?>
    </div>
<?php endif; ?>

    <div class="row">

        <!-- ================= LEFT ================= -->
        <div class="col-lg-7">
            <section class="card">

                <header class="card-header">
                    <h4><?= esc($facility['name']) ?></h4>
                </header>

                <div class="card-body">

                    <form method="post" action="<?= base_url('facility/rating/store/'.$facility['facility_id']) ?>">
                        <?= csrf_field() ?>

                        <table class="table table-bordered table-striped">

                            <thead>
                            <tr>
                                <th>Criteria</th>
                                <th width="180">Score (1–5)</th>
                                <th>Notes</th>
                            </tr>
                            </thead>

                            <tbody>

                            <?php foreach ($criteria as $c): ?>
                                <tr>

                                    <td>
                                        <strong><?= esc($c['name']) ?></strong><br>
                                        <small class="text-muted"><?= esc($c['description']) ?></small>
                                    </td>

                                    <td>
                                        <!-- ✅ CONTROLLED INPUT -->
                                        <select name="scores[<?= $c['criteria_id'] ?>]" class="form-control score-select" required>
                                            <option value="">Select</option>
                                            <?php for ($i = 1; $i <= 5; $i++): ?>
                                                <option value="<?= $i ?>"
                                                        <?= (isset($ratings[$c['criteria_id']]['score']) && $ratings[$c['criteria_id']]['score'] == $i) ? 'selected' : '' ?>>
                                                    <?= $i ?>
                                                </option>
                                            <?php endfor; ?>
                                        </select>
                                    </td>

                                    <td>
                                        <input type="text"
                                               name="notes[<?= $c['criteria_id'] ?>]"
                                               class="form-control"
                                               value="<?= $ratings[$c['criteria_id']]['notes'] ?? '' ?>">
                                    </td>

                                </tr>
                            <?php endforeach; ?>

                            </tbody>
                        </table>

                        <!-- LIVE CALCULATION -->
                        <div class="d-flex justify-content-between align-items-center mt-3">

                            <div>
                                <strong>Total Score:</strong>
                                <span id="totalScore">0</span>
                            </div>

                            <div>
                                <strong>Estimated Rating:</strong>
                                <span id="avgRating">0 / 5</span>
                            </div>

                        </div>

                        <hr>

                        <button class="btn btn-success w-100">
                            <i class="fas fa-save"></i> Save Rating
                        </button>

                    </form>

                </div>
            </section>
        </div>


        <!-- ================= RIGHT ================= -->
        <div class="col-lg-5">
            <section class="card">

                <header class="card-header">
                    <h4>Current Rating</h4>
                </header>

                <div class="card-body text-center">

                    <?php
                    $rating = is_numeric($facility['average_rating'] ?? null)
                            ? (float)$facility['average_rating']
                            : 0;
                    ?>

                    <h1 class="text-primary">
                        <?= number_format($rating, 2) ?> / 5
                    </h1>

                    <div class="mb-3">
                        <?php
                        $stars = round($rating);
                        for ($i = 1; $i <= 5; $i++) {
                            echo $i <= $stars
                                    ? '<i class="fas fa-star text-warning fa-lg"></i>'
                                    : '<i class="far fa-star text-muted fa-lg"></i>';
                        }
                        ?>
                    </div>

                    <hr>

                    <p class="text-muted">
                        Average rating based on selected criteria (1–5 scale).
                    </p>

                </div>

            </section>
        </div>

    </div>

<?= $this->endSection() ?>


<?= $this->section('scripts') ?>

    <script>

        function calculateRating() {

            let total = 0;
            let count = 0;

            $('.score-select').each(function(){

                let val = parseFloat($(this).val());

                if (!isNaN(val)) {
                    total += val;
                    count++;
                }

            });

            let avg = count > 0 ? total / count : 0;

            $('#totalScore').text(total.toFixed(2));
            $('#avgRating').text(avg.toFixed(2) + ' / 5');
        }

        // Auto update
        $(document).on('change', '.score-select', function(){
            calculateRating();
        });

        // Initial load
        $(document).ready(function(){
            calculateRating();
        });

    </script>

<?= $this->endSection() ?>