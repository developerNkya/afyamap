<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header d-flex justify-content-between align-items-center">
        <h2>Security &mdash; Two-Factor Authentication</h2>
    </header>

<?php if (session()->getFlashdata('success')): ?>
    <div class="alert alert-success"><?= session()->getFlashdata('success') ?></div>
<?php endif; ?>

<?php if (session()->getFlashdata('error')): ?>
    <div class="alert alert-danger"><?= session()->getFlashdata('error') ?></div>
<?php endif; ?>

<?php if ($enabled): ?>

    <!-- ================= ALREADY ENABLED ================= -->
    <div class="card">
        <div class="card-body">
            <div class="alert alert-success mb-4">
                <i class="fas fa-shield-alt"></i>
                <strong>Two-factor authentication is ENABLED</strong> on your account.
                You will be asked for a code from Google Authenticator every time you sign in.
            </div>

            <h5>Disable 2FA</h5>
            <p class="text-muted">To disable, confirm your account password:</p>

            <form action="<?= base_url('security/2fa/disable') ?>" method="post" class="row g-2" style="max-width: 480px;">
                <?= csrf_field() ?>
                <div class="col-8">
                    <input type="password" name="password" class="form-control" placeholder="Your password" required>
                </div>
                <div class="col-4">
                    <button type="submit" class="btn btn-danger w-100"
                            onclick="return confirm('Disable two-factor authentication?')">
                        Disable 2FA
                    </button>
                </div>
            </form>
        </div>
    </div>

<?php else: ?>

    <!-- ================= SETUP ================= -->
    <div class="row">
        <div class="col-lg-5">
            <div class="card mb-3">
                <div class="card-body text-center">
                    <h5 class="mb-3">1. Scan this QR code</h5>

                    <div id="qrcode" class="d-inline-block p-3 bg-white border rounded"></div>

                    <p class="text-muted mt-3 mb-1">
                        Can't scan? Enter this key manually in the app:
                    </p>
                    <code style="font-size: 1.1rem; letter-spacing: 2px;"><?= esc($secret) ?></code>
                </div>
            </div>
        </div>

        <div class="col-lg-7">
            <div class="card">
                <div class="card-body">
                    <h5 class="mb-3">2. Enter the 6-digit code from the app</h5>

                    <ol class="text-muted">
                        <li>Install <strong>Google Authenticator</strong> (Android / iPhone)</li>
                        <li>Tap <strong>+</strong> &rarr; <em>Scan a QR code</em></li>
                        <li>Scan the code on the left</li>
                        <li>Type the 6-digit code below and click <em>Enable</em></li>
                    </ol>

                    <form action="<?= base_url('security/2fa/enable') ?>" method="post" class="row g-2 mt-2" style="max-width: 420px;">
                        <?= csrf_field() ?>
                        <div class="col-7">
                            <input type="text" name="code" maxlength="6" pattern="[0-9]{6}"
                                   inputmode="numeric" autocomplete="one-time-code"
                                   class="form-control form-control-lg text-center"
                                   placeholder="123456" required>
                        </div>
                        <div class="col-5">
                            <button type="submit" class="btn btn-success btn-lg w-100">
                                <i class="fas fa-check"></i> Enable
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- QR generator (pure client-side) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script>
        new QRCode(document.getElementById('qrcode'), {
            text: <?= json_encode($qrUri) ?>,
            width: 200,
            height: 200
        });
    </script>

<?php endif; ?>

<?= $this->endSection() ?>
