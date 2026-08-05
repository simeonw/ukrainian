<?php
/**
 * Generic static SPA wrapper for phpmvc.
 * Drop into apps/{name}/controllers/controller.index.php
 * to put any static HTML app behind phpmvc authentication.
 */
class index extends controller {
    function __construct() {
        parent::__construct();
      //  auth::handleLogin();
    }

    public function index($page = null) {
        $appName  = rtrim(APP_NAME, '/');
        $basePath = ROOT . APPS . APP_NAME;

        foreach (['index.html', 'index.php'] as $file) {
            $fullPath = $basePath . $file;

            if (file_exists($fullPath)) {
                if (substr($file, -4) === 'html') {
                    $content = file_get_contents($fullPath);
                    // Fix Vite absolute asset paths: /{appName}/ → /apps/{appName}/
                    $content = str_replace('"/' . $appName . '/', '"/' . APPS . $appName . '/', $content);
                    $content = str_replace("'/" . $appName . "/", "'/" . APPS . $appName . "/", $content);
                    header('Content-Type: text/html; charset=UTF-8');
                    echo $content;
                } else {
                    require $fullPath;
                }
                exit;
            }
        }

        echo '<p style="padding:2rem">App entry point not found (tried index.html, index.php).</p>';
        exit;
    }
}
