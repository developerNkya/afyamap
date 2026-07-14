<aside id="sidebar-left" class="sidebar-left">

    <div class="sidebar-header">
        <div class="sidebar-title">Navigation</div>

        <div class="sidebar-toggle d-none d-md-block"
             data-toggle-class="sidebar-left-collapsed"
             data-target="html">
            <i class="fas fa-bars"></i>
        </div>
    </div>

    <div class="nano">
        <div class="nano-content">

            <nav id="menu" class="nav-main">
                <ul class="nav nav-main">

                    <!-- DASHBOARD -->
                    <li>
                        <a href="<?= base_url('dashboard') ?>">
                            <i class="bx bx-home-alt"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>


                    <!-- FACILITIES -->
                    <li class="nav-parent">
                        <a>
                            <i class="bx bx-building"></i>
                            <span>Facilities</span>
                        </a>

                        <ul class="nav nav-children">

                            <li>
                                <a href="<?= base_url('facilities') ?>">
                                    All Facilities
                                </a>
                            </li>

                            <li>
                                <a href="<?= base_url('facility/create') ?>">
                                    Add Facility
                                </a>
                            </li>

                            <li>
                                <a href="<?= base_url('facility-category') ?>">
                                    Facility Types
                                </a>
                            </li>

                            <li>
                                <a href="<?= base_url('facility-levels') ?>">
                                    Facility Levels
                                </a>
                            </li>

                        </ul>
                    </li>


                    <!-- INSURANCE -->
                    <li class="nav-parent">
                        <a>
                            <i class="bx bx-credit-card"></i>
                            <span>Insurance</span>
                        </a>

                        <ul class="nav nav-children">

                            <li>
                                <a href="<?= base_url('insurance') ?>">
                                    Providers
                                </a>
                            </li>

                            <li>
                                <a href="<?= base_url('insurance/create') ?>">
                                    Add Provider
                                </a>
                            </li>

                        </ul>
                    </li>


                    <!-- SERVICES -->
                    <li class="nav-parent">
                        <a>
                            <i class="bx bx-plus-medical"></i>
                            <span>Services</span>
                        </a>

                        <ul class="nav nav-children">

                            <li>
                                <a href="<?= base_url('service') ?>">
                                    All Services
                                </a>
                            </li>

                            <li>
                                <a href="<?= base_url('service/create') ?>">
                                    Add Service
                                </a>
                            </li>

                            <li>
                                <a href="<?= base_url('service-category') ?>">
                                    Categories
                                </a>
                            </li>

                        </ul>
                    </li>


                    <!-- RATINGS -->
                    <li class="nav-parent">
                        <a>
                            <i class="fas fa-star"></i>
                            <span>Ratings</span>
                        </a>

                        <ul class="nav nav-children">

                            <li>
                                <a href="<?= base_url('rating-criteria') ?>">
                                    Rating Criteria
                                </a>
                            </li>

                            <li>
                                <a href="<?= base_url('facility/select-for-rating') ?>">
                                    Rate Facility
                                </a>
                            </li>

                        </ul>
                    </li>


                    <!-- USERS -->
                    <?php if (hasAnyPermission(['view_users', 'create_users'])): ?>
                    <li class="nav-parent">
                        <a>
                            <i class="bx bx-user"></i>
                            <span>Users</span>
                        </a>

                        <ul class="nav nav-children">

                            <?php if (can('view_users')): ?>
                            <li>
                                <a href="<?= base_url('users') ?>">
                                    All Users
                                </a>
                            </li>
                            <?php endif; ?>

                            <?php if (can('create_users')): ?>
                            <li>
                                <a href="<?= base_url('users/create') ?>">
                                    Add User
                                </a>
                            </li>
                            <?php endif; ?>

                        </ul>
                    </li>
                    <?php endif; ?>


                    <!-- ACCESS CONTROL -->
                    <?php if (hasAnyPermission(['view_roles', 'manage_permissions', 'assign_permissions'])): ?>
                    <li class="nav-parent">
                        <a>
                            <i class="fas fa-user-shield"></i>
                            <span>Access Control</span>
                        </a>

                        <ul class="nav nav-children">

                            <?php if (can('view_roles')): ?>
                            <li>
                                <a href="<?= base_url('roles') ?>">
                                    Roles
                                </a>
                            </li>
                            <?php endif; ?>

                            <?php if (can('manage_permissions')): ?>
                            <li>
                                <a href="<?= base_url('permissions') ?>">
                                    Permissions
                                </a>
                            </li>
                            <?php endif; ?>

                            <?php if (can('assign_permissions')): ?>
                            <li>
                                <a href="<?= base_url('roles/permissions') ?>">
                                    Role Permissions
                                </a>
                            </li>

                            <li>
                                <a href="<?= base_url('users/permissions') ?>">
                                    User Permissions
                                </a>
                            </li>
                            <?php endif; ?>

                        </ul>
                    </li>
                    <?php endif; ?>


                    <!-- AUDIT LOGS -->
                    <?php if (can('view_audit_logs')): ?>
                    <li>
                        <a href="<?= base_url('audit-logs') ?>">
                            <i class="fas fa-clipboard-list"></i>
                            <span>Audit Logs</span>
                        </a>
                    </li>
                    <?php endif; ?>


                    <!-- MY SECURITY (2FA) - visible to every logged-in user -->
                    <li>
                        <a href="<?= base_url('security/2fa') ?>">
                            <i class="fas fa-shield-alt"></i>
                            <span>My Security (2FA)</span>
                        </a>
                    </li>


                    <!-- REPORTS -->
                    <li>
                        <a href="<?= base_url('reports') ?>">
                            <i class="bx bx-bar-chart"></i>
                            <span>Reports</span>
                        </a>
                    </li>


                    <!-- SETTINGS -->
                    <li class="nav-parent">
                        <a>
                            <i class="bx bx-cog"></i>
                            <span>Settings</span>
                        </a>

                        <ul class="nav nav-children">

                            <li>
                                <a href="<?= base_url('settings/general') ?>">
                                    General
                                </a>
                            </li>

                            <li>
                                <a href="<?= base_url('settings/system') ?>">
                                    System
                                </a>
                            </li>

                        </ul>
                    </li>

                </ul>
            </nav>

        </div>
    </div>

</aside>