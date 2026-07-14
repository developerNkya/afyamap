<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Permission Management</h2>
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

    <!-- ERROR -->
<?php if (session()->getFlashdata('error')): ?>
    <div class="alert alert-danger">
        <?= session()->getFlashdata('error') ?>
    </div>
<?php endif; ?>

    <div class="row">

        <!-- ================= LEFT ================= -->
        <div class="col-lg-4">

            <!-- CREATE BLOCK -->
            <section class="card mb-3">
                <header class="card-header">
                    <h4>Create Permission Block</h4>
                </header>

                <div class="card-body">

                    <form method="post" action="<?= base_url('permission-block/store') ?>">
                        <?= csrf_field() ?>

                        <div class="mb-3">
                            <label>Block Name</label>
                            <input type="text" name="name" class="form-control" required>
                            <small class="text-muted">Key will be generated automatically</small>
                        </div>

                        <div class="mb-3">
                            <label>Description</label>
                            <textarea name="description" class="form-control"></textarea>
                        </div>

                        <button class="btn btn-success w-100">
                            <i class="fas fa-save"></i> Save Block
                        </button>

                    </form>

                </div>
            </section>


            <!-- CREATE PERMISSION -->
            <section class="card">
                <header class="card-header">
                    <h4>Create Permission</h4>
                </header>

                <div class="card-body">

                    <form method="post" action="<?= base_url('permission/store') ?>">
                        <?= csrf_field() ?>

                        <div class="mb-3">
                            <label>Permission Name</label>
                            <input type="text" name="name" class="form-control" required>
                            <small class="text-muted">Slug will be generated automatically</small>
                        </div>

                        <div class="mb-3">
                            <label>Block</label>
                            <select name="block_id" class="form-control" required>
                                <option value="">Select Block</option>
                                <?php foreach ($blocks as $b): ?>
                                    <option value="<?= $b['block_id'] ?>">
                                        <?= esc($b['name']) ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <button class="btn btn-primary w-100">
                            <i class="fas fa-plus"></i> Save Permission
                        </button>

                    </form>

                </div>
            </section>

        </div>


        <!-- ================= RIGHT ================= -->
        <div class="col-lg-8">

            <?php foreach ($blocks as $block): ?>

                <section class="card mb-3">

                    <header class="card-header d-flex justify-content-between align-items-center">

                        <div>
                            <h5 class="mb-0"><?= esc($block['name']) ?></h5>
                            <small class="text-muted">
                                <code><?= esc($block['block_key']) ?></code>
                            </small>
                        </div>

                        <div>
    <span class="badge <?= $block['status'] ? 'bg-success' : 'bg-danger' ?>">
        <?= $block['status'] ? 'Active' : 'Inactive' ?>
    </span>

                            <a href="<?= base_url('permission-block/delete/'.$block['block_id']) ?>"
                               class="btn btn-xs btn-danger btn-delete ms-2">
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>

                    </header>

                    <div class="card-body p-0">

                        <table class="table table-bordered table-hover mb-0">

                            <thead class="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Key</th>
                                <th>Status</th>
                                <th width="120">Actions</th>
                            </tr>
                            </thead>

                            <tbody>

                            <?php if (!empty($block['permissions'])): ?>
                                <?php foreach ($block['permissions'] as $p): ?>

                                    <tr>

                                        <td><?= esc($p['name']) ?></td>

                                        <td><code><?= esc($p['slug']) ?></code></td>

                                        <td>
<span class="badge <?= $p['status'] ? 'bg-success' : 'bg-danger' ?>">
    <?= $p['status'] ? 'Active' : 'Inactive' ?>
</span>
                                        </td>

                                        <td>

                                            <a href="<?= base_url('permission/toggle/'.$p['permission_id']) ?>"
                                               class="btn btn-xs btn-info">
                                                <i class="fas fa-sync"></i>
                                            </a>

                                            <a href="<?= base_url('permission/delete/'.$p['permission_id']) ?>"
                                               class="btn btn-xs btn-danger btn-delete">
                                                <i class="fas fa-trash"></i>
                                            </a>

                                        </td>

                                    </tr>

                                <?php endforeach; ?>
                            <?php else: ?>

                                <tr>
                                    <td colspan="4" class="text-center text-muted">
                                        No permissions
                                    </td>
                                </tr>

                            <?php endif; ?>

                            </tbody>

                        </table>

                    </div>

                </section>

            <?php endforeach; ?>

        </div>

    </div>

<?= $this->endSection() ?>


<?= $this->section('scripts') ?>

    <script>

        // DELETE CONFIRM
        $(document).on('click', '.btn-delete', function(e){
            e.preventDefault();

            let url = $(this).attr('href');

            Swal.fire({
                title: 'Are you sure?',
                text: 'This action cannot be undone!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33'
            }).then((result)=>{
                if(result.isConfirmed){
                    window.location.href = url;
                }
            });
        });

    </script>

<?= $this->endSection() ?>