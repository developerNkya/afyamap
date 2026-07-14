<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Rating Criteria</h2>
    </header>

    <!-- SUCCESS -->
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

    <div class="row">

        <!-- ================= LEFT: CREATE FORM ================= -->
        <div class="col-lg-4">
            <section class="card">
                <header class="card-header">
                    <h2 class="card-title">Add Criteria</h2>
                </header>

                <div class="card-body">

                    <?php if (isset($validation)): ?>
                        <div class="alert alert-danger">
                            <?= $validation->listErrors() ?>
                        </div>
                    <?php endif; ?>

                    <form action="<?= base_url('rating-criteria/store') ?>" method="post">
                        <?= csrf_field() ?>

                        <!-- NAME -->
                        <div class="mb-3">
                            <label class="form-label">Criteria Name</label>
                            <input type="text" name="name" class="form-control"
                                   value="<?= old('name') ?>" required>
                        </div>

                        <!-- DESCRIPTION -->
                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea name="description" class="form-control"><?= old('description') ?></textarea>
                        </div>

                        <!-- MAX SCORE -->
                        <div class="mb-3">
                            <label class="form-label">Max Score</label>
                            <input type="number" name="max_score" class="form-control"
                                   value="<?= old('max_score') ?>" required>
                        </div>

                        <!-- STATUS -->
                        <div class="mb-3">
                            <label class="form-label">Status</label>
                            <select name="status" class="form-control">
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>

                        <!-- SUBMIT -->
                        <div class="d-grid">
                            <button class="btn btn-success">
                                <i class="fas fa-save"></i> Save Criteria
                            </button>
                        </div>

                    </form>

                </div>
            </section>
        </div>


        <!-- ================= RIGHT: LIST ================= -->
        <div class="col-lg-8">
            <section class="card">
                <header class="card-header">
                    <h2 class="card-title">All Criteria</h2>
                </header>

                <div class="card-body">

                    <table id="criteriaTable" class="table table-bordered table-striped table-hover">

                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Max Score</th>
                            <th>Status</th>
                            <th width="150">Actions</th>
                        </tr>
                        </thead>

                        <tbody>

                        <?php if (!empty($criteria)): ?>
                            <?php $i=1; foreach ($criteria as $row): ?>

                                <tr>
                                    <td><?= $i++ ?></td>
                                    <td><?= esc($row['name']) ?></td>
                                    <td><?= esc($row['max_score']) ?></td>

                                    <td>
        <span class="badge <?= $row['status'] ? 'bg-success' : 'bg-danger' ?>">
            <?= $row['status'] ? 'Active' : 'Inactive' ?>
        </span>
                                    </td>

                                    <td class="text-nowrap">

                                        <a href="<?= base_url('rating-criteria/edit/'.$row['criteria_id']) ?>"
                                           class="btn btn-warning btn-xs me-1">
                                            <i class="fas fa-edit"></i> Edit
                                        </a>

                                        <a href="<?= base_url('rating-criteria/toggle/'.$row['criteria_id']) ?>"
                                           class="btn btn-info btn-xs me-1">
                                            <i class="fas fa-sync"></i> Sync
                                        </a>

                                        <a href="<?= base_url('rating-criteria/delete/'.$row['criteria_id']) ?>"
                                           class="btn btn-danger btn-xs btn-delete">
                                            <i class="fas fa-trash"></i> Delete
                                        </a>

                                    </td>

                                </tr>

                            <?php endforeach ?>
                        <?php else: ?>

                            <tr>
                                <td colspan="5" class="text-center">No criteria found</td>
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

        $(document).ready(function(){

            $('#criteriaTable').DataTable({
                pageLength: 8,
                order: [[0, 'asc']],
                columnDefs: [
                    { orderable: false, targets: [4] }
                ]
            });

        });

        // DELETE CONFIRM
        $(document).on('click','.btn-delete',function(e){
            e.preventDefault();

            let url = $(this).attr('href');

            Swal.fire({
                title:'Delete this criteria?',
                icon:'warning',
                showCancelButton:true,
                confirmButtonColor:'#d33'
            }).then(res=>{
                if(res.isConfirmed) window.location.href = url;
            });

        });

    </script>

<?= $this->endSection() ?>