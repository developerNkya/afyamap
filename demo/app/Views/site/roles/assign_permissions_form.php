<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Permissions: <?= esc($role['name']) ?></h2>
    </header>

<?php if (session()->getFlashdata('success')): ?>
    <script>
        Swal.fire({icon:'success',title:'Saved',timer:1500,showConfirmButton:false});
    </script>
<?php endif; ?>

    <form method="post" action="<?= base_url('roles/permissions/store/'.$role['role_id']) ?>">
        <?= csrf_field() ?>

        <div class="row">

            <?php foreach ($blocks as $block): ?>

                <div class="col-lg-4">
                    <div class="card mb-3">

                        <div class="card-header">
                            <strong><?= esc($block['name']) ?></strong>
                        </div>

                        <div class="card-body">

                            <?php if (!empty($block['permissions'])): ?>

                                <?php foreach ($block['permissions'] as $p): ?>

                                    <div class="form-check mb-1">
                                        <input type="checkbox"
                                               class="form-check-input"
                                               name="permissions[]"
                                               value="<?= $p['permission_id'] ?>"
                                            <?= in_array($p['permission_id'], $assigned) ? 'checked' : '' ?>>

                                        <label class="form-check-label">
                                            <?= esc($p['name']) ?>
                                        </label>
                                    </div>

                                <?php endforeach; ?>

                            <?php else: ?>
                                <small class="text-muted">No permissions</small>
                            <?php endif; ?>

                        </div>
                    </div>
                </div>

            <?php endforeach; ?>

        </div>

        <button class="btn btn-success w-100">
            Save Permissions
        </button>

    </form>

<?= $this->endSection() ?>