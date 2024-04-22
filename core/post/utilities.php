<?php require_once __DIR__ . '/config/index.php';

use Http\Request;
use Http\Session;

// Set workspace env as session
if (isset($_POST['workspace'])) {
  $form = Request::allPost();
  // Update workspace env array
  foreach (WORKSPACE as $env) {
    $env['type'] === $form['workspace'] &&
      Session::set('workspace', $env, true);
  }
}
