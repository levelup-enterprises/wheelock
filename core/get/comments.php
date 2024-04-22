<?php require_once __DIR__ . "/../app/config/index.php";

/////////////////////////////////////////////////////////
// Comment Handling
/////////////////////////////////////////////////////////

use Http\Auth;
use Http\Response;
use Http\Request;

// print_r($_GET);
// die();

$user = Auth::verifyToken();

// Check for additional params
$params = Request::allGet();

$workspace = isset($params['brand'])
  ? WORKSPACE[$params['brand']]
  : WORKSPACE[$user['workspace']["value"]];

if ($params['date']) {
  // Date range chosen
  $selected = $params["date"];

  // Build search query for RAW queries
  $searchRaw = "";

  // Get time values
  require_once __DIR__ . "/../app/partials/time.php";

  // Weighted average
  $weight = [
    'mobile' => 0.4,
    'desktop' => 0.6,
  ];

  // Corona virus filter
  $coronaFilters = [
    "Covid",
    "Corona",
    "Coronavirus",
    "Virus",
    "CARE",
    "Lockdown",
    "Crisis",
    "Pandemic",
    "Mask",
    "Masks",
    "Social distance",
    "Distancing",
  ];

  // Set search columns by workspace
  $searchColumns = WORKSPACE_COLUMNS[$workspace['type']];

  $search = $params;

  // Run through search query
  include __DIR__ . "/../app/partials/search.php";

  // Default
  $results = $db->get($workspace['db']);
  // print_r($db);
  // die();
  foreach ($results as $k => $a) {
    isset($a['comments']) &&
      ($results[$k]['comments'] = htmlspecialchars_decode($a['comments']));
    isset($a['comments_covid']) &&
      ($results[$k]['comments_covid'] = htmlspecialchars_decode(
        $a['comments_covid']
      ));
    isset($a['other_reason']) &&
      ($results[$k]['other_reason'] = htmlspecialchars_decode(
        $a['other_reason']
      ));
    isset($a['comments_es']) &&
      ($results[$k]['comments_es'] = htmlspecialchars_decode(
        $a['comments_es']
      ));
    isset($a['comments_covid_es']) &&
      ($results[$k]['comments_covid_es'] = htmlspecialchars_decode(
        $a['comments_covid_es']
      ));
  }

  // Default uses both tables
  if ($workspace['type'] === 'default') {
    // Set search columns to app
    $searchColumns = WORKSPACE_COLUMNS['app'];

    // Run through search query
    include __DIR__ . "/../app/partials/search.php";

    $appResults = $db->get(TABLE[3]);
    foreach ($appResults as $k => $a) {
      isset($a['comments']) &&
        ($appResults[$k]['comments'] = htmlspecialchars_decode($a['comments']));
      isset($a['other_reason']) &&
        ($appResults[$k]['other_reason'] = htmlspecialchars_decode(
          $a['other_reason']
        ));
    }
    $results = array_merge($results, $appResults);
    usort($results, function ($a, $b) {
      return $b['date'] <=> $a['date'];
    });
  }

  if (!isset($export)) {
    $send['total'] = count($results);
    $send['comments'] = $results;

    // Convert data to JSON and send
    Response::message(['success' => $send]);
  }

  $db->disconnect();
}