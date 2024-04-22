<?php require_once __DIR__ . "/../../app/config/index.php";

/////////////////////////////////////////////////////////
// Comment Handling
/////////////////////////////////////////////////////////

use Http\Auth;
use Http\Request;
use Http\Response;
use Mail\Email;

$user = Auth::verifyToken();
$post = Request::allPost();

if (!empty($post['id'])) {
  $form = [
    'id' => $post['id'],
    'name' => $user['name'],
    'from' => isset($user['email']) ? $user['email'] : null,
    'email' => $post['email'],
  ];

  if ((new Email())->sendNote($form)) {
    Response::message([
      'success' => [
        'message' => 'Email sent!',
      ],
    ]);
  } else {
    Response::message(['error' => ['message' => 'Could not send email!']]);
  }
}

$db->disconnect();