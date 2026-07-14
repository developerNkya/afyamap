<aside id="sidebar-right" class="sidebar-right">
    <div class="nano">
        <div class="nano-content">

            <a href="#" class="mobile-close d-md-none">
                Collapse <i class="fas fa-chevron-right"></i>
            </a>

            <div class="sidebar-right-wrapper">

                <!-- ===================== -->
                <!-- QUICK ACTIONS -->
                <!-- ===================== -->
                <div class="sidebar-widget">
                    <h6>Quick Actions</h6>
                    <ul class="simple-list">
                        <li><a href="<?= base_url('facilities/create') ?>">+ Add Facility</a></li>
                        <li><a href="<?= base_url('services/create') ?>">+ Add Service</a></li>
                        <li><a href="<?= base_url('users/create') ?>">+ Add User</a></li>
                        <li><a href="<?= base_url('insurance/create') ?>">+ Add Insurance</a></li>
                    </ul>
                </div>

                <hr class="separator" />

                <!-- ===================== -->
                <!-- SYSTEM TASKS -->
                <!-- ===================== -->
                <div class="sidebar-widget widget-calendar">
                    <h6>Tasks & Schedule</h6>

                    <!-- Calendar -->
                    <div data-plugin-datepicker data-plugin-skin="dark"></div>

                    <!-- Dynamic Tasks -->
                    <ul>
                        <?php if (!empty($tasks)): ?>
                            <?php foreach ($tasks as $task): ?>
                                <li>
                                    <time><?= date('d/m/Y', strtotime($task['date'])) ?></time>
                                    <span><?= esc($task['title']) ?></span>
                                </li>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <li>
                                <span>No upcoming tasks</span>
                            </li>
                        <?php endif; ?>
                    </ul>
                </div>

                <hr class="separator" />

                <!-- ===================== -->
                <!-- SYSTEM STATUS -->
                <!-- ===================== -->
                <div class="sidebar-widget">
                    <h6>System Status</h6>
                    <ul class="simple-list">
                        <li>
                            Server:
                            <strong class="text-success">Online</strong>
                        </li>
                        <li>
                            Active Users:
                            <strong><?= $active_users ?? 0 ?></strong>
                        </li>
                        <li>
                            Pending Reviews:
                            <strong><?= $pending_reviews ?? 0 ?></strong>
                        </li>
                    </ul>
                </div>

                <hr class="separator" />

                <!-- ===================== -->
                <!-- RECENT ACTIVITY -->
                <!-- ===================== -->
                <div class="sidebar-widget">
                    <h6>Recent Activity</h6>
                    <ul class="simple-user-list">

                        <?php if (!empty($activities)): ?>
                            <?php foreach ($activities as $activity): ?>
                                <li>
                                    <figure class="image rounded">
                                        <img src="<?= base_url('uploads/users/' . ($activity['image'] ?? 'default.png')) ?>" class="rounded-circle">
                                    </figure>
                                    <span class="title"><?= esc($activity['name']) ?></span>
                                    <span class="message"><?= esc($activity['action']) ?></span>
                                </li>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <li>No recent activity</li>
                        <?php endif; ?>

                    </ul>
                </div>

            </div>
        </div>
    </div>
</aside>