<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Edit Rating Criteria</h2>
    </header>

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

        <!-- ================= LEFT: FORM ================= -->
        <div class="col-lg-4">
            <section class="card">
                <header class="card-header">
                    <h2 class="card-title">Edit Criteria</h2>
                </header>

                <div class="card-body">

                    <?php if (isset($validation)): ?>
                        <div class="alert alert-danger">
                            <?= $validation->listErrors() ?>
                        </div>
                    <?php endif; ?>

                    <form action="<?= base_url('rating-criteria/update/'.$item['criteria_id']) ?>" method="post">
                        <?= csrf_field() ?>

                        <div class="mb-3">
                            <label class="form-label">Criteria Name</label>
                            <input type="text" name="name" class="form-control"
                                   value="<?= old('name', $item['name']) ?>" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Description</label>
                            <textarea name="description" class="form-control"><?= old('description', $item['description']) ?></textarea>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Max Score</label>
                            <input type="number" name="max_score" class="form-control"
                                   value="<?= old('max_score', $item['max_score']) ?>" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Status</label>
                            <select name="status" class="form-control">
                                <option value="1" <?= old('status', $item['status']) ? 'selected' : '' ?>>Active</option>
                                <option value="0" <?= !old('status', $item['status']) ? 'selected' : '' ?>>Inactive</option>
                            </select>
                        </div>

                        <div class="d-grid">
                            <button class="btn btn-warning">
                                <i class="fas fa-save"></i> Update
                            </button>
                        </div>

                    </form>

                </div>
            </section>
        </div>


        <!-- ================= RIGHT: TABLE ================= -->
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

                                <tr class="<?= $row['criteria_id'] == $item['criteria_id'] ? 'table-warning' : '' ?>">

                                    <td><?= $i++ ?></td>
                                    <td><?= esc($row['name']) ?></td>
                                    <td><?= esc($row['max_score']) ?></td>

                                    <td>
        <span class="badge <?= $row['status'] ? 'bg-success' : 'bg-danger' ?>">
            <?= $row['status'] ? 'Active' : 'Inactive' ?>
        </span>
                                    </td>

                                    <td>
                                        <a href="<?= base_url('rating-criteria/edit/'.$row['criteria_id']) ?>"
                                           class="btn btn-warning btn-xs me-1">
                                            <i class="fas fa-edit"></i>
                                        </a>

                                        <a href="<?= base_url('rating-criteria/toggle/'.$row['criteria_id']) ?>"
                                           class="btn btn-info btn-xs me-1">
                                            <i class="fas fa-sync"></i>
                                        </a>

                                        <a href="<?= base_url('rating-criteria/delete/'.$row['criteria_id']) ?>"
                                           class="btn btn-danger btn-xs btn-delete">
                                            <i class="fas fa-trash"></i>
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

        $(document).on('click','.btn-delete',function(e){
            e.preventDefault();

            let url = $(this).attr('href');

            Swal.fire({
                title:'Delete?',
                icon:'warning',
                showCancelButton:true,
                confirmButtonColor:'#d33'
            }).then(res=>{
                if(res.isConfirmed) window.location.href = url;
            });

        });

    </script>

<?= $this->endSection() ?>