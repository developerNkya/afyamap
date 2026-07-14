<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Assign Permissions</h2>
    </header>

    <table class="table table-bordered table-striped">

        <thead>
        <tr>
            <th>#</th>
            <th>Role</th>
            <th>Action</th>
        </tr>
        </thead>

        <tbody>

        <?php $i=1; foreach ($roles as $r): ?>

            <tr>
                <td><?= $i++ ?></td>
                <td><?= esc($r['name']) ?></td>
                <td>
                    <a href="<?= base_url('roles/permissions/'.$r['role_id']) ?>"
                       class="btn btn-primary btn-sm">
                        Manage Permissions
                    </a>
                </td>
            </tr>

        <?php endforeach; ?>

        </tbody>

    </table>

<?= $this->endSection() ?>