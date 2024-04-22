<?php require_once __DIR__ . "/../../app/config/index.php";

use Http\Auth;
use Http\Request;
use Http\Response;

Auth::verifyToken();

if (isset($_POST['token'])) {
  $token = Request::post('token');

  $db->where('token', $token);
  $db->getOne(TABLE[0]);

  $db->count < 1
    ? Response::message(['error' => ['message' => 'User not found!']])
    : Response::message(['success' => ['message' => 'User exist!']]);
}

$db->disconnect();
