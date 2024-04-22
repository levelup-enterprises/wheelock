<?php require_once __DIR__ . "/../../app/config/index.php";

use Http\Auth;
use Http\Request;
use Http\Response;
use Mail\Email;
use Utilities\Utility;

Auth::verifyToken();

// -------------------------------------------------------------------- //

if (isset($_POST['email'])) {
  $form = Request::allPost();

  $db->where('email', $form['email']);
  $db->getOne(TABLE[0]);

  // Create new user
  if ($db->count < 1) {
    // Check if corporate email
    $corp = ["nrg.com", "reliant.com"];
    $email = explode("@", $form["email"]);
    if (!in_array($email[1], $corp)) {
      $external = true;
    }

    // Create full name
    $fullName = $form['fName'] . " " . $form['lName'];

    // Create username
    $form['username'] =
      $form['fName'][0] . str_replace(' ', '', $form['lName']);

    // Generate hash from password
    $form['password'] = password_hash($form['password'], PASSWORD_DEFAULT);

    // Generate token
    $form['token'] = Utility::generateToken();

    $form['widgets'] = json_encode(WIDGETS);

    $db->startTransaction();
    if ($db->insert(TABLE[0], $form)) {
      $form['fullName'] = $fullName;
      // Check if external email
      if (isset($external)) {
        if ((new Email())->createAccount($form)) {
          $db->commit();
          Response::message([
            'success' => [
              'message' =>
                'Your request will need to be reviewed before approval is granted.',
            ],
          ]);
        } else {
          $db->rollback();
        }
        // Send confirmation email to internal
      } else {
        if ((new Email())->confirmAccount($form)) {
          $db->commit();
          Response::message([
            'success' => [
              'message' => 'Please verify your Reliant/NRG email address',
            ],
          ]);
        } else {
          $db->rollback();
        }
      }
    }

    $db->getLastErrno() &&
      Response::message([
        'error' => [
          'message' => $db->getLastError(),
        ],
      ]);
  } else {
    Response::message([
      'error' => [
        'message' => 'Email already exist',
      ],
    ]);
  }
}