<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Rating Criteria</h2>

        <div class="right-wrapper text-end">
            <a href="<?= base_url('rating-criteria/create') ?>" class="btn btn-success">
                <i class="fas fa-plus"></i> Add Criteria
            </a>
        </div>
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

    <section class="card">
        <div class="card-body">

            <table id="criteriaTable" class="table table-bordered table-striped table-hover">

                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Max Score</th>
                    <th>Status</th>
                    <th width="200">Actions</th>
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
                                    <i class="fas fa-sync"></i> Status
                                </a>

                                <a href="<?= base_url('rating-criteria/delete/'.$row['criteria_id']) ?>"
                                   class="btn btn-danger btn-xs btn-delete">
                                    <i class="fas fa-trash"></i> Delete
                                </a>

                            </td>
                        </tr>

                    <?php endforeach; ?>
                <?php else: ?>

                    <tr>
                        <td colspan="5" class="text-center">No criteria found</td>
                    </tr>

                <?php endif; ?>

                </tbody>

            </table>

        </div>
    </section>

<?= $this->endSection() ?>

<?= $this->section('scripts') ?>

    <script>

        $(document).ready(function () {

            $('#criteriaTable').DataTable({
                pageLength: 10,
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
                text:'This action cannot be undone',
                icon:'warning',
                showCancelButton:true,
                confirmButtonColor:'#d33'
            }).then(res=>{
                if(res.isConfirmed) window.location.href = url;
            });
        });

    </script>

<?= $this->endSection() ?>