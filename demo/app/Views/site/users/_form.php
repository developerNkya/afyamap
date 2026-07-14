<div class="row">

    <div class="col-md-6 mb-3">
        <label>Full Name</label>
        <input type="text" name="name" class="form-control"
               value="<?= old('name', $user['name'] ?? '') ?>" required>
    </div>

    <div class="col-md-6 mb-3">
        <label>Email</label>
        <input type="email" name="email" class="form-control"
               value="<?= old('email', $user['email'] ?? '') ?>" required>
    </div>

    <div class="col-md-6 mb-3">
        <label>Phone</label>
        <input type="text" name="phone" class="form-control"
               value="<?= old('phone', $user['phone'] ?? '') ?>">
    </div>

    <div class="col-md-6 mb-3">
        <label>Role</label>
        <select name="role_id" class="form-control" required>
            <option value="">Select Role</option>
            <?php foreach ($roles as $r): ?>
                <option value="<?= $r['role_id'] ?>"
                    <?= old('role_id', $user['role_id'] ?? '') == $r['role_id'] ? 'selected' : '' ?>>
                    <?= esc($r['name']) ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

    <div class="col-md-6 mb-3">
        <label>Password <?= isset($user) ? '(leave blank to keep current)' : '' ?></label>
        <input type="password" name="password" class="form-control">
    </div>

</div>