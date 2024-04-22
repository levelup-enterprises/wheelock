<?php require_once __DIR__ . "/../../app/config/index.php";

use Http\Auth;
use Http\Request;
use Http\Response;
use Http\JWT;
use Utilities\Utility;

Auth::verifyToken();

$form = Request::allPost();

// -------------------------------------------------------------------- //

try {
  $db->where('email', $form['email']);
  $user = $db->getOne(TABLE[0]);
  if ($db->count > 0) {
    if ($user['confirmed'] == 1) {
      // Check pass
      if (password_verify($form['password'], $user['password'])) {
        $payload = [
          'name' => $user['fName'],
          'role' => $user['role'],
          'loggedIn' => true,
          'workspace' => Utility::buildWorkspaces($user['workspace']),
          'token' => $user['token'],
          'widgets' => json_decode($user['widgets']),
        ];

        $jwt = (new JWT())->createJWT($payload);
        Response::message([
          'success' => [
            'token' => $jwt,
          ],
        ]);
      } else {
        echo false;
        Response::message([
          'error' => [
            'message' => 'Incorrect username or password',
          ],
        ]);
      }
    } else {
      Response::message([
        'error' => [
          'message' => 'Account is not activated',
        ],
      ]);
    }
  } else {
    Response::message([
      'error' => [
        'message' => 'Incorrect username or password',
      ],
    ]);
  }
} catch (Exception $e) {
  echo false . $e;
}