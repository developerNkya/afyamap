<!doctype html>
<html class="fixed">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Two-Factor Authentication</title>

    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800" rel="stylesheet">
    <link rel="stylesheet" href="<?= base_url('assets/vendor/bootstrap/css/bootstrap.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/font-awesome/css/all.min.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/boxicons/css/boxicons.min.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/css/theme.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/css/skins/default.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/css/custom.css') ?>" />
</head>

<body>

<section class="body-sign">
    <div class="center-sign">

        <a href="/" class="logo float-start">
            <img src="<?= base_url('assets/img/logo.png') ?>" height="60" alt="Logo" />
        </a>

        <div class="panel card-sign">

            <div class="card-title-sign mt-3 text-end">
                <h2 class="title text-uppercase font-weight-bold m-0">
                    <i class="bx bx-shield-quarter me-1 text-6 position-relative top-5"></i>
                    Verify Code
                </h2>
            </div>

            <div class="card-body">

                <p class="text-center text-muted mb-3">
                    Open your <strong>Google Authenticator</strong> app and enter the 6-digit code.
                </p>

                <?php if (session()->getFlashdata('error')): ?>
                    <div class="alert alert-danger">
                        <?= session()->getFlashdata('error') ?>
                    </div>
                <?php endif; ?>

                <form action="<?= base_url('2fa') ?>" method="post" novalidate>
                    <?= csrf_field() ?>

                    <div class="form-group mb-3">
                        <label>Authentication Code</label>
                        <input name="code"
                               type="text"
                               inputmode="numeric"
                               autocomplete="one-time-code"
                               maxlength="6"
                               pattern="[0-9]{6}"
                               class="form-control form-control-lg text-center"
                               style="font-size: 1.6rem; letter-spacing: 0.6rem;"
                               placeholder="••••••"
                               autofocus
                               required />
                    </div>

                    <button type="submit" class="btn btn-primary btn-lg w-100 mb-2">
                        Verify &amp; Sign In
                    </button>

                    <div class="text-center">
                        <a href="<?= base_url('logout') ?>" class="text-muted">
                            <small>Cancel and go back to login</small>
                        </a>
                    </div>
                </form>

            </div>
        </div>

        <p class="text-center text-muted mt-3 mb-3">
            &copy; <?= date('Y') ?> AfyaMap. All rights reserved.
        </p>
    </div>
</section>

</body>
</html>
