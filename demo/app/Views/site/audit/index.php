<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header d-flex justify-content-between align-items-center">
        <h2>Audit Logs</h2>
    </header>

    <!-- ================= FILTERS ================= -->
    <div class="card mb-3">
        <div class="card-body">
            <form method="get" action="<?= base_url('audit-logs') ?>" class="row g-2 align-items-end">

                <div class="col-md-2">
                    <label class="form-label">User</label>
                    <select name="user_id" class="form-select form-select-sm">
                        <option value="">All Users</option>
                        <?php foreach ($users as $u): ?>
                            <option value="<?= $u['user_id'] ?>" <?= ($filters['user_id'] == $u['user_id']) ? 'selected' : '' ?>>
                                <?= esc($u['name']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-md-2">
                    <label class="form-label">Action</label>
                    <select name="action" class="form-select form-select-sm">
                        <option value="">All Actions</option>
                        <?php foreach ($actions as $a): ?>
                            <option value="<?= esc($a) ?>" <?= ($filters['action'] === $a) ? 'selected' : '' ?>><?= esc($a) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-md-2">
                    <label class="form-label">Module</label>
                    <select name="module" class="form-select form-select-sm">
                        <option value="">All Modules</option>
                        <?php foreach ($modules as $m): ?>
                            <option value="<?= esc($m) ?>" <?= ($filters['module'] === $m) ? 'selected' : '' ?>><?= esc($m) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-md-2">
                    <label class="form-label">From</label>
                    <input type="date" name="date_from" class="form-control form-control-sm" value="<?= esc($filters['date_from']) ?>">
                </div>

                <div class="col-md-2">
                    <label class="form-label">To</label>
                    <input type="date" name="date_to" class="form-control form-control-sm" value="<?= esc($filters['date_to']) ?>">
                </div>

                <div class="col-md-2">
                    <label class="form-label">Search</label>
                    <input type="text" name="search" class="form-control form-control-sm" placeholder="Description, IP, URL..." value="<?= esc($filters['search']) ?>">
                </div>

                <div class="col-12 d-flex gap-2 mt-2">
                    <button type="submit" class="btn btn-primary btn-sm"><i class="fas fa-filter"></i> Filter</button>
                    <a href="<?= base_url('audit-logs') ?>" class="btn btn-secondary btn-sm">Reset</a>
                </div>
            </form>
        </div>
    </div>

    <!-- ================= TABLE ================= -->
    <div class="card">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-sm align-middle">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Date / Time</th>
                        <th>User</th>
                        <th>Action</th>
                        <th>Module</th>
                        <th>Description</th>
                        <th>IP Address</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php if (empty($logs)): ?>
                        <tr><td colspan="8" class="text-center text-muted py-4">No audit logs found</td></tr>
                    <?php endif; ?>

                    <?php foreach ($logs as $log): ?>
                        <tr>
                            <td><?= $log['id'] ?></td>
                            <td class="text-nowrap"><?= esc($log['created_at']) ?></td>
                            <td>
                                <?= esc($log['user_name'] ?: 'System / Guest') ?>
                                <?php if (!empty($log['user_email'])): ?>
                                    <br><small class="text-muted"><?= esc($log['user_email']) ?></small>
                                <?php endif; ?>
                            </td>
                            <td>
                                <?php
                                $badge = match (true) {
                                    str_contains((string) $log['action'], 'DELETE')                                   => 'danger',
                                    str_contains((string) $log['action'], 'FAILED') || str_contains((string) $log['action'], 'BLOCKED') => 'warning',
                                    str_contains((string) $log['action'], 'CREATE') || $log['action'] === 'LOGIN'     => 'success',
                                    default => 'secondary',
                                };
                                ?>
                                <span class="badge bg-<?= $badge ?>"><?= esc($log['action']) ?></span>
                            </td>
                            <td><?= esc($log['table_name']) ?></td>
                            <td style="max-width: 340px;"><small><?= esc($log['description']) ?></small></td>
                            <td class="text-nowrap"><small><?= esc($log['ip_address']) ?></small></td>
                            <td>
                                <?php if (!empty($log['new_data']) || !empty($log['old_data'])): ?>
                                    <button type="button" class="btn btn-outline-info btn-sm"
                                            onclick='showAuditDetail(<?= json_encode([
                                                'old' => $log['old_data'],
                                                'new' => $log['new_data'],
                                                'ua'  => $log['user_agent'],
                                                'url' => $log['url'],
                                            ]) ?>)'>
                                        <i class="fas fa-eye"></i>
                                    </button>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

            <?= $pager->links() ?>
        </div>
    </div>

    <script>
        function showAuditDetail(data) {
            let html = '';
            if (data.url) html += '<b>URL:</b> ' + data.url + '<br>';
            if (data.ua)  html += '<b>Browser:</b> ' + data.ua + '<br>';
            if (data.old) html += '<hr><b>Old Data:</b><pre style="text-align:left;max-height:200px;overflow:auto">' + JSON.stringify(JSON.parse(data.old), null, 2) + '</pre>';
            if (data.new) html += '<hr><b>New Data:</b><pre style="text-align:left;max-height:200px;overflow:auto">' + JSON.stringify(JSON.parse(data.new), null, 2) + '</pre>';

            Swal.fire({
                title: 'Audit Detail',
                html: html || 'No extra data',
                width: 700,
                confirmButtonText: 'Close'
            });
        }
    </script>

<?= $this->endSection() ?>
