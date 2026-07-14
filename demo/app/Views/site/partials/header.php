<!-- start: header -->
<header class="header">
    <div class="logo-container">
        <a href="<?= base_url('admin') ?>" class="logo">
            <img src="<?= base_url('assets/img/logo.png') ?>" width="75" height="35" alt="AfyaMap" />
        </a>

        <div class="d-md-none toggle-sidebar-left"
             data-toggle-class="sidebar-left-opened"
             data-target="html"
             data-fire-event="sidebar-left-opened">
            <i class="fas fa-bars" aria-label="Toggle sidebar"></i>
        </div>
    </div>

    <!-- RIGHT SIDE -->
    <div class="header-right">


        <span class="separator"></span>

        <!-- NOTIFICATIONS (SIMPLIFIED) -->
        <ul class="notifications">
            <li>
                <a href="#" class="dropdown-toggle notification-icon" data-bs-toggle="dropdown">
                    <i class="bx bx-bell"></i>
                    <span class="badge">3</span>
                </a>

                <div class="dropdown-menu notification-menu">
                    <div class="notification-title">
                        Alerts
                    </div>

                    <div class="content">
                        <ul>
                            <li>
                                <a href="#" class="clearfix">
                                    <div class="image">
                                        <i class="fas fa-info bg-primary text-light"></i>
                                    </div>
                                    <span class="title">System running</span>
                                    <span class="message">All good</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>

        <span class="separator"></span>

        <!-- USER BOX -->
        <div id="userbox" class="userbox">
            <a href="#" data-bs-toggle="dropdown">
                <figure class="profile-picture">
                    <img src="<?= base_url('assets/img/user.png') ?>"
                         class="rounded-circle"
                         alt="User" />
                </figure>

                <div class="profile-info">
                    <span class="name"><?= session('name') ?? 'Admin' ?></span>
                    <span class="role">Administrator</span>
                </div>

                <i class="fa custom-caret"></i>
            </a>

            <div class="dropdown-menu">
                <ul class="list-unstyled mb-2">
                    <li>
                        <a href="#"><i class="bx bx-user-circle"></i> Profile</a>
                    </li>
                    <li>
                        <a href="#"><i class="bx bx-lock"></i> Lock Screen</a>
                    </li>
                    <li>
                        <a href="<?= base_url('logout') ?>">
                            <i class="bx bx-power-off"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</header>
<!-- end: header -->