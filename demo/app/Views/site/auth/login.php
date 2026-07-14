<!doctype html>
<html class="fixed">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="<?= csrf_hash() ?>">

    <title>Login</title>

    <!-- GOOGLE FONTS -->
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800" rel="stylesheet">

    <!-- VENDOR CSS -->
    <link rel="stylesheet" href="<?= base_url('assets/vendor/bootstrap/css/bootstrap.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/font-awesome/css/all.min.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/boxicons/css/boxicons.min.css') ?>" />

    <!-- THEME CSS -->
    <link rel="stylesheet" href="<?= base_url('assets/css/theme.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/css/skins/default.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/css/custom.css') ?>" />

</head>

<body>

<section class="body-sign">
    <div class="center-sign">

        <a href="/" class="logo float-start">
            <img src="<?= base_url('assets/img/logo.png') ?>"
                 alt="Logo"
                 class="rounded-circle shadow-sm"
                 style="height: 80px; width: 80px; object-fit: cover;" />
        </a>

        <div class="panel card-sign">

            <div class="card-title-sign mt-3 text-end">
                <h2 class="title text-uppercase font-weight-bold m-0">
                    <i class="bx bx-user-circle me-1 text-6 position-relative top-5"></i>
                    Sign In
                </h2>
            </div>

            <div class="card-body">

                <?php if (session()->getFlashdata('error')): ?>
                    <div class="alert alert-danger">
                        <?= session()->getFlashdata('error') ?>
                    </div>
                <?php endif; ?>

                <form action="<?= base_url('login') ?>" method="post" novalidate>
                    <?= csrf_field() ?>

                    <div class="form-group mb-3">
                        <label>Email</label>
                        <div class="input-group">
                            <input name="email"
                                   id="email"
                                   type="email"
                                   class="form-control form-control-lg"
                                   placeholder="Enter your email"
                                   value="<?= old('email') ?>"
                                   required />
                            <span class="input-group-text">
                                <i class="bx bx-envelope text-4"></i>
                            </span>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label>Password</label>
                        <div class="input-group">
                            <input name="password"
                                   id="password"
                                   type="password"
                                   class="form-control form-control-lg"
                                   placeholder="Enter your password"
                                   required />
                            <span class="input-group-text" style="cursor:pointer;" id="togglePassword">
                                <i class="bx bx-hide text-4" id="toggleIcon"></i>
                            </span>
                        </div>
                    </div>

                    <div class="text-end">
                        <button type="submit" class="btn btn-primary mt-2 w-100">
                            Sign In
                        </button>
                    </div>

                </form>

            </div>
        </div>

        <p class="text-center text-muted mt-3 mb-3">
            &copy; <?= date('Y') ?> All Rights Reserved.
        </p>

    </div>
</section>

<!-- ✅ FIXED: LOAD SCRIPTS IN CORRECT ORDER -->
<script src="<?= base_url('assets/vendor/jquery/jquery.js') ?>"></script>
<script src="<?= base_url('assets/vendor/bootstrap/js/bootstrap.bundle.min.js') ?>"></script>

<!-- ✅ FIX: Add polyfill for chrome object -->
<script>
// Fix for theme.js chrome error
if (typeof window.chrome === 'undefined') {
    window.chrome = {
        runtime: {
            onMessage: {
                addListener: function() {}
            },
            sendMessage: function() {}
        },
        storage: {
            local: {
                get: function() {},
                set: function() {}
            }
        },
        tabs: {
            query: function() {},
            create: function() {}
        }
    };
}

// Fix for theme.init.js initialize error
window.theme = window.theme || {};
window.theme.initialize = window.theme.initialize || function() {
    console.log('Theme initialized (polyfill)');
};
</script>

<!-- ✅ Load theme scripts with error handling -->
<script>
try {
    // Load theme.js
    const themeScript = document.createElement('script');
    themeScript.src = '<?= base_url('assets/js/theme.js') ?>';
    themeScript.onerror = function() {
        console.warn('theme.js failed to load - continuing anyway');
    };
    document.body.appendChild(themeScript);
} catch(e) {
    console.warn('Theme.js error caught:', e);
}

// Load custom.js
try {
    const customScript = document.createElement('script');
    customScript.src = '<?= base_url('assets/js/custom.js') ?>';
    document.body.appendChild(customScript);
} catch(e) {
    console.warn('Custom.js error caught:', e);
}
</script>

<!-- ✅ Initialize theme after scripts load -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme if available
    if (typeof theme !== 'undefined' && theme.initialize) {
        try {
            theme.initialize();
        } catch(e) {
            console.warn('Theme initialization failed:', e);
        }
    }
    
    // Toggle password
    $('#togglePassword').on('click', function() {
        const password = $('#password');
        const icon = $('#toggleIcon');
        
        if (password.attr('type') === 'password') {
            password.attr('type', 'text');
            icon.removeClass('bx-hide').addClass('bx-show');
        } else {
            password.attr('type', 'password');
            icon.removeClass('bx-show').addClass('bx-hide');
        }
    });
    
    // Form validation
    $('form').on('submit', function(e) {
        const email = $('#email').val().trim();
        const emailError = $('#emailError');
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!regex.test(email)) {
            e.preventDefault();
            if (emailError.length) {
                emailError.removeClass('d-none');
            } else {
                alert('Please enter a valid email address');
            }
            $('#email').addClass('is-invalid');
        } else {
            if (emailError.length) {
                emailError.addClass('d-none');
            }
            $('#email').removeClass('is-invalid');
        }
    });
});
</script>

</body>
</html>