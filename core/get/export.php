<?php require_once __DIR__ . "/../app/config/index.php";

/////////////////////////////////////////////////////////
// Comment Handling
/////////////////////////////////////////////////////////

use Http\Request;
use Http\Response;
use Utilities\Exports;

$export = true;

// Run through comments
include_once __DIR__ . "/../get/comments.php";

$date = Request::get('date');
$export = (new Exports($results, $date, $workspace))->export();

Response::message(["success" => $export]);
