<?php require_once __DIR__ . "/../../app/config/index.php";

/////////////////////////////////////////////////////////
// Comment Handling
/////////////////////////////////////////////////////////

use Http\Auth;
use Http\Request;
use Http\Response;

////////////////////////////////////////////////////////////////////
// Update notes
////////////////////////////////////////////////////////////////////

$user = Auth::verifyToken();

$post = Request::allPost();

if ($post['id'] !== '') {
  // Select DB
  $table = WORKSPACE[$user['workspace']['value']]['db'];

  //# Get existing note
  $db->where("id", $post['id']);
  $old = $db->getOne($table, 'notes');

  $update = json_decode($old['notes'], true);
  $updates[] = $update && $update[0];

  if (!empty($post['note'])) {
    $update[] = [
      'user' => $user['name'],
      'email' => isset($user['email']) ? $user['email'] : null,
      'date' => (new DateTime())->format('Y-m-d H:i:s'),
      'note' => $post['note'],
    ];
  }

  // Jsonify data
  $update = json_encode($update);

  $db->where("id", $post['id']);
  $db->update($table, ['notes' => $update]);

  $db->getLastErrno() &&
    Response::message(['error' => ['message' => $db->getLastError()]]);

  Response::message([
    'success' => [
      'message' => 'Note added!',
    ],
  ]);
}

$db->disconnect();