<?= $this->extend('site/partials/main') ?>

<?= $this->section('content') ?>

    <header class="page-header">
        <h2>Facility Gallery - <?= esc($facility['name'] ?? '') ?></h2>
    </header>

    <!-- SUCCESS MESSAGE -->
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

    <div class="row">

        <!-- ================= LEFT: UPLOAD ================= -->
        <div class="col-lg-4">
            <section class="card">
                <div class="card-body">

                    <form action="<?= base_url('facility/gallery/upload/'.$facility['facility_id']) ?>"
                          method="post"
                          enctype="multipart/form-data">

                        <?= csrf_field() ?>

                        <label class="form-label fw-bold mb-2">Upload Facility Images</label>

                        <!-- DROP ZONE -->
                        <div id="dropZone" class="border rounded p-3 text-center mb-3" style="cursor:pointer;">
                            <p class="text-muted mb-1">Drag & Drop images here</p>
                            <p class="text-muted small">or click to select (Max: 20 images)</p>

                            <input type="file"
                                   id="imageInput"
                                   name="images[]"
                                   multiple
                                   accept="image/*"
                                   hidden>
                        </div>

                        <!-- PREVIEW -->
                        <div id="previewContainer" class="row"></div>

                        <button type="submit" class="btn btn-success w-100 mt-3">
                            <i class="fas fa-upload"></i> Upload Images
                        </button>

                    </form>

                </div>
            </section>
        </div>


        <!-- ================= RIGHT: GALLERY ================= -->
        <div class="col-lg-8">
            <section class="card">
                <div class="card-body">

                    <div class="row">

                        <?php if (!empty($images)): ?>
                            <?php foreach ($images as $img): ?>

                                <div class="col-md-4 mb-3">
                                    <div class="card shadow-sm">

                                        <!-- IMAGE -->
                                        <img src="<?= base_url('uploads/facilities/gallery/'.$img['image_path']) ?>"
                                             class="img-fluid rounded"
                                             style="height:180px; object-fit:cover; cursor:pointer;"
                                             onclick="previewImage(this.src)">

                                        <!-- ACTIONS -->
                                        <div class="p-2 text-center">

                                            <?php if (!empty($img['is_primary'])): ?>
                                                <span class="badge bg-success mb-2">Primary</span><br>
                                            <?php endif; ?>

                                            <a href="<?= base_url('facility/gallery/delete/'.$img['image_id']) ?>"
                                               class="btn btn-danger btn-sm btn-delete">
                                                <i class="fas fa-trash"></i>
                                            </a>

                                        </div>

                                    </div>
                                </div>

                            <?php endforeach ?>
                        <?php else: ?>

                            <div class="text-center">
                                <p>No images uploaded yet</p>
                            </div>

                        <?php endif; ?>

                    </div>

                </div>
            </section>
        </div>

    </div>

    <!-- ================= IMAGE PREVIEW MODAL ================= -->
    <div id="previewModal"
         style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:#000000cc; z-index:9999; text-align:center;">
        <img id="previewImg"
             style="max-width:90%; max-height:90%; margin-top:3%;">
    </div>

<?= $this->endSection() ?>


<?= $this->section('scripts') ?>

    <script>

        // ================= UPLOAD LOGIC =================

        const input = document.getElementById('imageInput');
        const dropZone = document.getElementById('dropZone');
        const preview = document.getElementById('previewContainer');

        const MAX_FILES = 20;
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB per image

        dropZone.addEventListener('click', () => input.click());

        dropZone.addEventListener('dragover', e => {
            e.preventDefault();
            dropZone.style.background = '#f8f9fa';
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.style.background = '';
        });

        dropZone.addEventListener('drop', e => {
            e.preventDefault();
            input.files = e.dataTransfer.files;
            handleFiles(input.files);
        });

        input.addEventListener('change', () => {
            handleFiles(input.files);
        });

        function handleFiles(files) {

            preview.innerHTML = '';

            if (files.length > MAX_FILES) {
                alert("Maximum 20 images allowed");
                input.value = '';
                return;
            }

            Array.from(files).forEach(file => {

                if (!file.type.startsWith('image/')) {
                    alert("Only image files allowed");
                    input.value = '';
                    return;
                }

                if (file.size > MAX_SIZE) {
                    alert("Each image must be less than 5MB");
                    input.value = '';
                    return;
                }

                const col = document.createElement('div');
                col.className = 'col-md-4 mb-2';

                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.className = 'img-fluid rounded';
                img.style.height = '120px';
                img.style.objectFit = 'cover';

                col.appendChild(img);
                preview.appendChild(col);
            });
        }


        // ================= DELETE =================

        $(document).on('click', '.btn-delete', function (e) {
            e.preventDefault();

            let url = $(this).attr('href');

            Swal.fire({
                title: 'Delete image?',
                text: 'This cannot be undone',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = url;
                }
            });
        });


        // ================= PREVIEW MODAL =================

        function previewImage(src) {
            $('#previewImg').attr('src', src);
            $('#previewModal').fadeIn();
        }

        $('#previewModal').click(function(){
            $(this).fadeOut();
        });

    </script>

<?= $this->endSection() ?>