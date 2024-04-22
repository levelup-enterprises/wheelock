<?php require_once __DIR__ . "/../app/config/index.php";

use Http\Auth;
use Http\Response;
use Utilities\Utility;

Auth::verifyToken();

$brands = [];
$workspace = Utility::buildWorkspaces();

Response::message([
  "success" => ["workspaces" => $workspace, "brands" => array_keys($workspace)],
]);