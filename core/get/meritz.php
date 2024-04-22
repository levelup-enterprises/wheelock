<?php require_once __DIR__ . "/../app/config/index.php";

/**
 ** Meritz --------------------------------------------------
 * Get all comments submitted within the last hour and
 *  export to meritz as excel.
 * - get hourly
 * - get weekly
 */

use Http\Auth;
use Http\Response;
use Http\Request;
use Models\Meritz;

// $user = Auth::verifyToken();

// Check for additional params
$weekly = Request::get("weekly");

if ($weekly) {
  // Export data weekly
  $time = [
    date('Y-m-d H:i:s', strtotime('-1 week')),
    date('Y-m-d H:i:s', strtotime('now')),
  ];

  $return = Meritz::export($time, getenv('WEEKLY_EXPORT_FILE'));
} else {
  // Export data very hour
  $time = [
    date('Y-m-d H:i:s', strtotime('-1 hour')),
    date('Y-m-d H:i:s', strtotime('now')),
  ];

  $return = Meritz::export($time, getenv('HR_EXPORT_FILE'));
}

// Return validation
$return ? print_r($return) : print_r($db->getLastError());