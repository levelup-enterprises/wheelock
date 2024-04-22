<?php require_once __DIR__ . "/../../app/config/index.php";

use Http\Auth;
use Http\Request;
use Http\Response;
use Mail\Email;

Auth::verifyToken();

if (isset($_POST['email'])) {
  $email = Request::post('email');

  $db->where('email', $email);
  $user = $db->getOne(TABLE[0]);

  $db->count < 1 &&
    Response::message(['error' => ['message' => 'Could not send email!']]);

  $user['token'] = bin2hex(openssl_random_pseudo_bytes(5));

  $db->startTransaction();
  $db->where('email', $email);
  if ($db->update(TABLE[0], ['token' => $user['token']])) {
    if ((new Email())->passwordReset($user)) {
      $db->commit();
      Response::message([
        'success' => [
          'message' => 'Email sent!',
        ],
      ]);
    } else {
      $db->rollback();
      Response::message(['error' => ['message' => 'Could not send email!']]);
    }
  }
}

$db->disconnect();