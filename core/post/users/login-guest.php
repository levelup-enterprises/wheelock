<?php require_once __DIR__ . "/../../app/config/index.php";

use Http\Response;
use Http\Auth;
use Http\JWT;
use Utilities\Utility;

Auth::verifyToken();

$workspaces = Utility::buildWorkspaces();

$payload = [
  'name' => 'Guest',
  'role' => 'guest',
  'loggedIn' => true,
  'workspace' => $workspaces['Reliant'][0],
  'widgets' => WIDGETS,
];

!VPN &&
  Response::message([
    'error' => [
      'message' =>
        "It looks like your not on the company VPN. Please use your email or create an account to login.",
    ],
  ]);

$jwt = (new JWT())->createJWT($payload);
Response::message([
  'success' => [
    'token' => $jwt,
  ],
]);