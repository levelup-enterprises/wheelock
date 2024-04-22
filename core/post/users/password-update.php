<?php require_once __DIR__ . "/../../app/config/index.php";

use Http\Auth;
use Http\Request;
use Http\Response;

Auth::verifyToken();

if (isset($_POST['token'])) {
  $form = Request::allPost();

  $db->where('token', $form['token']);
  $user = $db->getOne(TABLE[0]);

  $db->count < 1 &&
    Response::message(['error' => ['message' => 'Token not found!']]);

  $newPass = password_hash($form['password'], PASSWORD_DEFAULT);

  $db->where('token', $form['token']);
  $db->update(TABLE[0], ['password' => $newPass]);

  // Return error
  $db->getLastErrno() &&
    Response::message(['error' => ['message' => $db->getLastError()]]);

  // Return success
  Response::message(['success' => ['message' => 'Password updated!']]);
}

$db->disconnect();
