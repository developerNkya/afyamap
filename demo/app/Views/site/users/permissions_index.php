<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>User Permission Management</h2>
    </header>

    <table class="table table-bordered table-striped">

        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
        </tr>
        </thead>

        <tbody>

        <?php $i=1; foreach ($users as $u): ?>

            <tr>
                <td><?= $i++ ?></td>
                <td><?= esc($u['name']) ?></td>
                <td><?= esc($u['email']) ?></td>
                <td>
                    <a href="<?= base_url('users/permissions/'.$u['user_id']) ?>"
                       class="btn btn-primary btn-sm">
                        Manage Permissions
                    </a>
                </td>
            </tr>

        <?php endforeach; ?>

        </tbody>

    </table>

<?= $this->endSection() ?>