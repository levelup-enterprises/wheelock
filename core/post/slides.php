<?php require_once __DIR__ . '/config/index.php';

/////////////////////////////////////////////////////////
// Get Slides
/////////////////////////////////////////////////////////

if ($_POST['post'] === 'getSlides') {
  ////////////////////////
  // Vars
  ////////////////////////

  // Slide count
  $slides = htmlspecialchars($_POST['slides']);

  // Time Vars
  $week = date('Y-m-d H:i:s', strtotime('-7 days'));

  // Time Arrays
  $thisWeek = [$week, $now];

  /////////////////////////////////////////////////////////
  // Get random comments within last week
  /////////////////////////////////////////////////////////

  $db->where('date', $thisWeek, 'BETWEEN');
  $db->orderBy('RAND()');
  $results = $db->get(TABLE[2], $slides);

  // Convert data to JSON and send
  echo json_encode($results);
  $db->disconnect();
}
