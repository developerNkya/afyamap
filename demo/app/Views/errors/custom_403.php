<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>403 Forbidden</title>

    <style>
        body {
            font-family: "Poppins", sans-serif;
            background: #f4f6f9;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }

        .box {
            text-align: center;
            background: #fff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        h1 {
            font-size: 70px;
            color: #dc3545;
            margin: 0;
        }

        p {
            margin: 10px 0 20px;
            color: #555;
        }

        a {
            display: inline-block;
            padding: 10px 20px;
            background: #0d6efd;
            color: #fff;
            border-radius: 5px;
            text-decoration: none;
        }

        a:hover {
            background: #084298;
        }
    </style>
</head>
<body>

<div class="box">
    <h1>403</h1>
    <h3>Access Denied</h3>
    <p>You don’t have permission to access this page.</p>

    <a href="<?= base_url('dashboard') ?>">Go to Dashboard</a>
</div>

</body>
</html>