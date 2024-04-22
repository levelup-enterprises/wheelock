<?php require_once __DIR__ . "/../../app/config/index.php";

use Http\Request;
use Http\Response;
use Http\Auth;
use Http\JWT;

$user = Auth::verifyToken();

if ($_POST['widgets']) {
  $raw = Request::post('widgets');

  $raw = explode(",", $raw);

  foreach ($raw as $widget) {
    $widgets[] = $widget;
  }

  $db->where('token', $user['token']);
  $db->update(TABLE[0], ['widgets' => json_encode($widgets)]);

  $user['widgets'] = $widgets;

  $db->getLastErrno() &&
    Response::message([
      'error' => [
        'message' => $db->getLastError(),
      ],
    ]);

  $jwt = (new JWT())->createJWT($user);
  Response::message([
    'success' => [
      'token' => $jwt,
    ],
  ]);
} else {
  Response::message([
    'error' => [
      'message' => 'Something went wrong!',
    ],
  ]);
}
