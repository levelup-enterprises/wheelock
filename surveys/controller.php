<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header(
  'Access-Control-Allow-Headers: Authorization, Origin, Content-Type, Access'
);
header("Content-Type: application/json; charset=UTF-8");

/**
 ** Return survey file names by directory ----------------------------
 * - Pass parameter "d" as directory name
 */
if (!empty($_GET['d'])) {
  $directory = $_GET['d'];
  $files = [];

  foreach (glob($directory . '/*.*') as $file) {
    $file = explode($directory . "/", $file);
    $files[] = $file[1];
  }
  // Return file names
  echo json_encode($files);
}