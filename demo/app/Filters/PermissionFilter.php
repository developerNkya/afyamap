<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class PermissionFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Must be logged in
        if (!session()->get('logged_in')) {
            return redirect()->to('/login');
        }

        // No permission passed
        if (empty($arguments)) {
            return;
        }

        $permission = $arguments[0];

        // Check permission
        if (!hasPermission($permission)) {

            // AJAX request → return JSON
            if ($request->isAJAX()) {
                return service('response')
                    ->setStatusCode(403)
                    ->setJSON([
                        'status' => 403,
                        'message' => 'Access denied'
                    ]);
            }

            // NORMAL request → show 403 page (NO redirect!)
            return service('response')
                ->setStatusCode(403)
                ->setBody(view('errors/custom_403'));
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // nothing
    }
}