<!doctype html>

<html class="fixed">

<head>

    <!-- Basic -->

    <meta charset="UTF-8">

    <title><?= $title ?? 'AfyaMap Admin' ?></title>

    <link rel="icon" type="image/png" sizes="32x32"

          href="<?= base_url('assets/img/favicon/favicon.png') ?>">

    <link rel="icon" type="image/png" sizes="16x16"

          href="<?= base_url('assets/img/favicon/favicon.png') ?>">

    <link rel="apple-touch-icon"

          href="<?= base_url('assets/img/favicon/favicon.png') ?>">

    <link rel="shortcut icon"

          href="<?= base_url('assets/img/favicon/favicon.ico') ?>">

    <meta name="keywords" content="AfyaMap Admin" />

    <meta name="description" content="AfyaMap Admin Panel">

    <meta name="author" content="AfyaMap">

    <!-- Mobile -->

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <!-- Fonts -->

    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800|Shadows+Into+Light" rel="stylesheet">

    <!-- Vendor CSS -->

    <!-- Vendor CSS -->
    <link rel="stylesheet" href="<?= base_url('assets/vendor/bootstrap/css/bootstrap.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/animate/animate.compat.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/vendor/font-awesome/css/all.min.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/boxicons/css/boxicons.min.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/magnific-popup/magnific-popup.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/jquery-ui/jquery-ui.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/jquery-ui/jquery-ui.theme.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/bootstrap-multiselect/css/bootstrap-multiselect.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/morris/morris.css') ?>" />

    <!-- Advanced Plugins -->
    <link rel="stylesheet" href="<?= base_url('assets/vendor/select2/css/select2.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/select2-bootstrap-theme/select2-bootstrap.min.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('assets/vendor/datatables/media/css/dataTables.bootstrap5.css') ?>" />

    <!-- Theme -->

    <link rel="stylesheet" href="<?= base_url('assets/css/theme.css') ?>" />

    <link rel="stylesheet" href="<?= base_url('assets/css/skins/default.css') ?>" />

    <link rel="stylesheet" href="<?= base_url('assets/css/custom.css') ?>" />

    <!-- Head Lib -->

    <script src="<?= base_url('assets/vendor/modernizr/modernizr.js') ?>"></script>

    <!-- Page-specific CSS -->

    <?= $this->renderSection('styles') ?>

</head>

<body>

<section class="body">

    <!-- HEADER -->

    <?= $this->include('site/partials/header') ?>

    <div class="inner-wrapper">

        <!-- SIDEBAR -->

        <?= $this->include('site/partials/sidebar') ?>

        <!-- CONTENT -->

        <section role="main" class="content-body">

            <?= $this->renderSection('content') ?>

        </section>

    </div>

</section>

<!-- CORE -->
<!-- ================== CORE ================== -->
<script src="<?= base_url('assets/vendor/jquery/jquery.js') ?>"></script>
<script src="<?= base_url('assets/vendor/jquery-browser-mobile/jquery.browser.mobile.js') ?>"></script>
<script src="<?= base_url('assets/vendor/bootstrap/js/bootstrap.bundle.min.js') ?>"></script>

<!-- ================== BASE UI ================== -->
<script src="<?= base_url('assets/vendor/common/common.js') ?>"></script>
<script src="<?= base_url('assets/vendor/nanoscroller/nanoscroller.js') ?>"></script>

<!-- ================== OPTIONAL GLOBAL ================== -->
<script src="<?= base_url('assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.js') ?>"></script>
<script src="<?= base_url('assets/vendor/magnific-popup/jquery.magnific-popup.js') ?>"></script>
<script src="<?= base_url('assets/vendor/jquery-placeholder/jquery.placeholder.js') ?>"></script>

<!-- ================== PAGE VENDOR ================== -->
<script src="<?= base_url('assets/vendor/select2/js/select2.js') ?>"></script>
<script src="<?= base_url('assets/vendor/datatables/media/js/jquery.dataTables.min.js') ?>"></script>
<script src="<?= base_url('assets/vendor/datatables/media/js/dataTables.bootstrap5.min.js') ?>"></script>
<script src="<?= base_url('assets/vendor/datatables/extras/TableTools/Buttons-1.4.2/js/dataTables.buttons.min.js') ?>"></script>
<script src="<?= base_url('assets/vendor/datatables/extras/TableTools/Buttons-1.4.2/js/buttons.bootstrap4.min.js') ?>"></script>
<script src="<?= base_url('assets/vendor/datatables/extras/TableTools/Buttons-1.4.2/js/buttons.html5.min.js') ?>"></script>
<script src="<?= base_url('assets/vendor/datatables/extras/TableTools/Buttons-1.4.2/js/buttons.print.min.js') ?>"></script>
<script src="<?= base_url('assets/vendor/datatables/extras/TableTools/JSZip-2.5.0/jszip.min.js') ?>"></script>
<script src="<?= base_url('assets/vendor/datatables/extras/TableTools/pdfmake-0.1.32/pdfmake.min.js') ?>"></script>
<script src="<?= base_url('assets/vendor/datatables/extras/TableTools/pdfmake-0.1.32/vfs_fonts.js') ?>"></script>

<!-- ================== THEME ================== -->
<script src="<?= base_url('assets/js/theme.js') ?>"></script>
<script src="<?= base_url('assets/js/custom.js') ?>"></script>
<script src="<?= base_url('assets/js/theme.init.js') ?>"></script>
<script src="<?= base_url('assets/js/examples/examples.datatables.default.js') ?>"></script>
<script src="<?= base_url('assets/js/examples/examples.datatables.row.with.details.js') ?>"></script>
<script src="<?= base_url('assets/js/examples/examples.datatables.tabletools.js') ?>"></script>
<link rel="stylesheet" href="<?= base_url('assets/vendor/select2/css/select2.css') ?>">
<link rel="stylesheet" href="<?= base_url('assets/vendor/select2-bootstrap-theme/select2-bootstrap.min.css') ?>">
<!-- Page-specific JS -->

<?= $this->renderSection('scripts') ?>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>

    $(document).on('click', '.btn-delete', function (e) {

        e.preventDefault();

        let url = $(this).attr('href');

        Swal.fire({

            title: 'Are you sure?',

            text: "This record will be permanently deleted!",

            icon: 'warning',

            showCancelButton: true,

            confirmButtonColor: '#d33',

            cancelButtonColor: '#6c757d',

            confirmButtonText: 'Yes, delete it'

        }).then((result) => {

            if (result.isConfirmed) {

                window.location.href = url;

            }

        });

    });

</script>
<?php if (session()->getFlashdata('success')): ?>
    <script>
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: '<?= session()->getFlashdata('success') ?>',
            timer: 2000,
            showConfirmButton: false
        });
    </script>
<?php endif; ?>
<script src="<?= base_url('assets/vendor/select2/js/select2.js') ?>"></script>
</body>

</html>