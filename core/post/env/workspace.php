<?php require_once __DIR__ . "/../../app/config/index.php";

use Http\Response;
use Http\Auth;
use Http\JWT;
use Http\Request;

$payload = Auth::verifyToken();

$workspace = Request::allPost();

$payload['workspace'] = $workspace;

$jwt = (new JWT())->createJWT($payload);

Response::message([
  'success' => [
    'token' => $jwt,
  ],
]);