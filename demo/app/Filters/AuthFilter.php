<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $session = session();

        // ---------------------------------------------------
        // Allow public routes (NO AUTH REQUIRED)
        // ---------------------------------------------------
        $uri = trim(service('uri')->getPath(), '/');

        $allowedRoutes = [
            '',        // home page
            'login',
            'logout',
            '2fa',     // second login step (protected by 2fa_pending_user session)
        ];

        if (in_array($uri, $allowedRoutes, true)) {
            return;
        }

        // Public mobile / frontend API stays open
        if (str_starts_with($uri, 'api/')) {
            return;
        }

        // ---------------------------------------------------
        // Check authentication
        // ---------------------------------------------------
        if (!$session->get('user_id') || !$session->get('logged_in')) {

            // AJAX / API requests → return 401 (no redirect loop)
            if ($request->isAJAX()) {
                return service('response')
                    ->setStatusCode(401)
                    ->setJSON([
                        'status'  => 'error',
                        'message' => 'Unauthorized',
                    ]);
            }

            // Normal request → redirect to login
            return redirect()
                ->to('/login')
                ->with('error', 'Please login first');
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // no action needed
    }
}
