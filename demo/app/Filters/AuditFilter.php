<?php

namespace App\Filters;

use App\Services\AuditService;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * ============================================================
 * AUDIT FILTER (runs AFTER every request)
 * ============================================================
 * Automatically logs every state-changing action:
 *   - POST / PUT / PATCH / DELETE requests
 *   - GET requests to /delete/ or /toggle/ URLs
 *
 * Skips:
 *   - Plain GET page views (too noisy)
 *   - Requests already logged explicitly via audit_log()
 */
class AuditFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // nothing
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Already logged explicitly in the controller? Skip auto-log.
        if (AuditService::$alreadyLogged) {
            return;
        }

        $method = strtoupper($request->getMethod());
        $path   = trim(service('uri')->getPath(), '/');

        $isStateChanging = in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true)
            || preg_match('#/(delete|toggle|reset-2fa)(/|$)#', '/' . $path);

        if (!$isStateChanging) {
            return;
        }

        // Skip login attempts here (logged explicitly with more detail)
        if ($path === 'login' || str_starts_with($path, '2fa')) {
            return;
        }

        // ================= DERIVE ACTION + MODULE =================
        $segments = explode('/', $path);
        $module   = $segments[0] ?? 'system';

        $action = $method;
        foreach (['store' => 'CREATE', 'create' => 'CREATE', 'update' => 'UPDATE',
                  'edit' => 'UPDATE', 'delete' => 'DELETE', 'toggle' => 'TOGGLE',
                  'import' => 'IMPORT', 'upload' => 'UPLOAD', 'store-block' => 'CREATE'] as $key => $mapped) {
            if (in_array($key, $segments, true)) {
                $action = $mapped;
                break;
            }
        }

        // Last numeric segment = record id (if any)
        $recordId = null;
        foreach (array_reverse($segments) as $seg) {
            if (ctype_digit($seg)) {
                $recordId = (int) $seg;
                break;
            }
        }

        $statusCode = $response->getStatusCode();

        AuditService::log(
            $action,
            $module,
            sprintf('%s %s (HTTP %d)', $method, '/' . $path, $statusCode),
            $recordId,
            null,
            $method === 'GET' ? null : (array) $request->getPost()
        );
    }
}
