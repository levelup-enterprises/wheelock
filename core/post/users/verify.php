<?php require_once __DIR__ . "/../../app/config/index.php";

use Http\Auth;
use Http\Request;
use Http\Response;
use Mail\Email;
use Utilities\Utility;

Auth::verifyToken();

// -------------------------------------------------------------------- //

if (isset($_POST['token'])) {
  $form = Request::allPost();

  $db->where('token', $form['token']);
  $user = $db->getOne(TABLE[0]);

  //# --------------------------------------------------

  // Create new user
  if ($db->count === 1) {
    $db->startTransaction();
    $db->where('token', $form['token']);

    // Validate corp account
    if ($form['valid'] == 1) {
      $update = [
        'confirmed' => true,
        'token' => Utility::generateToken(),
      ];

      if ($db->update(TABLE[0], $update)) {
        $db->commit();
        Response::message([
          'success' => [
            'message' => 'All set!',
          ],
        ]);
      }
    }

    // Confirm or deny external
    if ($form['confirmed'] == 1) {
      $update = [
        'confirmed' => true,
        'token' => Utility::generateToken(),
      ];

      if ($db->update(TABLE[0], $update)) {
        // Send email
        if ((new Email())->approved($user)) {
          $db->commit();
          Response::message([
            'success' => [
              'message' => $user['fName'] . ' has been approved!',
            ],
          ]);
        } else {
          $db->rollback();
        }
      }
    } else {
      if ($db->delete(TABLE[0])) {
        // Send email
        if ((new Email())->denied($user)) {
          $db->commit();
          Response::message([
            'error' => [
              'message' => $user['fName'] . ' has been denied!',
            ],
          ]);
        } else {
          $db->rollback();
        }
      }
    }

    //# --------------------------------------------------

    $db->getLastErrno() &&
      Response::message([
        'error' => [
          'message' => $db->getLastError(),
        ],
      ]);
  } else {
    Response::message([
      'error' => [
        'message' => "Link has expired! \nCreate a new request.",
      ],
    ]);
  }
}