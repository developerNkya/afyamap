<!-- TOPBAR -->
<nav class="navbar navbar-expand navbar-light bg-white shadow-sm" style="margin-left:250px;">

    <div class="container-fluid">

        <!-- Left: Page Title -->
        <div>
            <h5 class="mb-0"><?= $title ?? 'Dashboard' ?></h5>
        </div>

        <!-- Right: User Menu -->
        <ul class="navbar-nav ms-auto align-items-center">

            <!-- Optional: Notifications (future use) -->
            <li class="nav-item dropdown me-3">
                <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
                    <i class="fas fa-bell"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><span class="dropdown-item text-muted">No notifications</span></li>
                </ul>
            </li>

            <!-- User Dropdown -->
            <li class="nav-item dropdown">
                <a class="nav-link d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">

                    <!-- Avatar -->
                    <img src="<?= base_url('assets/img/user.png') ?>"
                         class="rounded-circle me-2" width="35" height="35">

                    <!-- Username -->
                    <span><?= session('name') ?? 'Admin' ?></span>
                </a>

                <!-- Dropdown -->
                <ul class="dropdown-menu dropdown-menu-end">

                    <li>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-user me-2"></i> Profile
                        </a>
                    </li>

                    <li>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-cog me-2"></i> Settings
                        </a>
                    </li>

                    <li><hr class="dropdown-divider"></li>

                    <li>
                        <a class="dropdown-item text-danger" href="<?= base_url('logout') ?>">
                            <i class="fas fa-sign-out-alt me-2"></i> Logout
                        </a>
                    </li>

                </ul>
            </li>

        </ul>

    </div>
</nav>