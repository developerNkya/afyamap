<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header d-flex justify-content-between align-items-center">
        <div>
            <h2>User Permissions</h2>
            <p class="text-muted mb-0">
                <?= esc($user['name'] ?? $user['username']) ?>
            </p>
        </div>
    </header>

<?php if (session()->getFlashdata('success')): ?>
    <script>
        Swal.fire({icon:'success',title:'Saved',timer:1500,showConfirmButton:false});
    </script>
<?php endif; ?>

    <!-- SUPER ADMIN ALERT -->
<?php if (!empty($isSuper)): ?>
    <div class="alert alert-info">
        <strong>Super Admin:</strong> This role has access to all permissions by default.
    </div>
<?php endif; ?>

    <form method="post" action="<?= base_url('users/permissions/store/'.$user['user_id']) ?>">
        <?= csrf_field() ?>

        <div class="row">

            <?php foreach ($blocks as $index => $block): ?>

                <div class="col-lg-4 col-md-6">

                    <section class="card mb-3 shadow-sm border-0">

                        <!-- HEADER -->
                        <header class="card-header d-flex justify-content-between align-items-center toggle-block"
                                data-target="block_<?= $index ?>" style="cursor:pointer;">

                            <strong><?= esc($block['name']) ?></strong>

                            <div class="d-flex align-items-center gap-2">

                                <button type="button" class="btn btn-xs btn-success bulk-allow" data-block="<?= $index ?>">
                                    Allow All
                                </button>

                                <button type="button" class="btn btn-xs btn-danger bulk-deny" data-block="<?= $index ?>">
                                    Deny All
                                </button>

                                <i class="fas fa-chevron-down toggle-icon ms-2"></i>
                            </div>
                        </header>

                        <!-- BODY -->
                        <div id="block_<?= $index ?>" class="card-body d-none">

                            <?php if (!empty($block['permissions'])): ?>

                                <?php foreach ($block['permissions'] as $p):

                                    // ✅ SUPER ADMIN FIX
                                    if (!empty($isSuper)) {
                                        $roleHas = true;
                                    } else {
                                        $roleHas = in_array($p['permission_id'], $rolePermissions ?? []);
                                    }

                                    // FINAL STATE
                                    if (isset($assigned[$p['permission_id']])) {
                                        $current = $assigned[$p['permission_id']];
                                    } else {
                                        $current = $roleHas ? 'allow' : 'deny';
                                    }
                                    ?>

                                    <div class="permission-item mb-3 p-3 border rounded">

                                        <div class="d-flex justify-content-between align-items-center">

                                            <span class="fw-semibold"><?= esc($p['name']) ?></span>

                                            <!-- INDICATOR -->
                                            <?php if (!empty($isSuper)): ?>
                                                <span class="badge bg-primary">Super Access</span>
                                            <?php elseif ($roleHas): ?>
                                                <span class="badge bg-success">From Role</span>
                                            <?php else: ?>
                                                <span class="badge bg-warning text-dark">Not in Role</span>
                                            <?php endif; ?>

                                        </div>

                                        <div class="mt-2 d-flex gap-2 flex-wrap">

                                            <!-- ALLOW -->
                                            <label class="badge border <?= $current === 'allow' ? 'bg-success text-white' : 'bg-light text-success' ?>">
                                                <input type="radio"
                                                       class="perm-radio block-<?= $index ?>"
                                                       name="permissions[<?= $p['permission_id'] ?>]"
                                                       value="allow"
                                                        <?= $current === 'allow' ? 'checked' : '' ?>>
                                                Allow
                                            </label>

                                            <!-- DENY -->
                                            <label class="badge border <?= $current === 'deny' ? 'bg-danger text-white' : 'bg-light text-danger' ?>">
                                                <input type="radio"
                                                       class="perm-radio block-<?= $index ?>"
                                                       name="permissions[<?= $p['permission_id'] ?>]"
                                                       value="deny"
                                                        <?= $current === 'deny' ? 'checked' : '' ?>>
                                                Deny
                                            </label>

                                        </div>

                                    </div>

                                <?php endforeach; ?>

                            <?php else: ?>
                                <div class="text-muted text-center">No permissions</div>
                            <?php endif; ?>

                        </div>

                    </section>
                </div>

            <?php endforeach; ?>

        </div>

        <div class="position-sticky bottom-0 bg-white border-top p-3 mt-3">
            <button class="btn btn-success w-100">
                <i class="fas fa-save"></i> Save Permissions
            </button>
        </div>

    </form>

    <style>
        .permission-item:hover {
            background: #f9fafb;
            transition: 0.2s;
        }
        .toggle-block:hover {
            background: #f1f3f5;
        }
        .permission-item input {
            margin-right: 5px;
        }
    </style>

<?= $this->endSection() ?>

<?= $this->section('scripts') ?>

    <script>

        // COLLAPSE
        $(document).on('click', '.toggle-block', function(e){
            if($(e.target).is('button')) return;

            let target = $('#' + $(this).data('target'));
            let icon = $(this).find('.toggle-icon');

            target.toggleClass('d-none');
            icon.toggleClass('fa-chevron-down fa-chevron-up');
        });

        // BULK ALLOW
        $(document).on('click', '.bulk-allow', function(){
            let block = $(this).data('block');
            $('.block-' + block + '[value="allow"]').prop('checked', true);
        });

        // BULK DENY
        $(document).on('click', '.bulk-deny', function(){
            let block = $(this).data('block');
            $('.block-' + block + '[value="deny"]').prop('checked', true);
        });

    </script>

<?= $this->endSection() ?>