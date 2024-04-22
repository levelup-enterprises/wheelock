<?php require_once __DIR__ . "/../app/config/index.php";

/////////////////////////////////////////////////////////
//# Score Handling
/////////////////////////////////////////////////////////

use Http\Request;
use Http\Response;
use Models\Scores;
use Http\Auth;

// Fix JSON float bug
ini_set('precision', 10);
ini_set('serialize_precision', 10);

// Get workspace and settings
$user = Auth::verifyToken();

$workspace = WORKSPACE[$user['workspace']["value"]];

// Get workspace env
$params = Request::allGet();

$selected = $params['dates'];

// Weighted average
$weight = [
  'mobile' => 0.5,
  'desktop' => 0.5,
];

// Queries
$select = [
  'id',
  'accomplish',
  'date',
  'device',
  "rating",
  "nps",
  "reason",
  "survey_trigger",
];

////////////////////////////////////////////////////////////////////
//# Get data from selected range
////////////////////////////////////////////////////////////////////

// Get time values
require_once __DIR__ . "/../app/partials/time.php";

//?------------------------------------------------------------
//# TOU Feedback
($workspace['type'] === 'mixed' || $workspace['type'] === 'sf') &&
  (require_once __DIR__ . "/../app/queries/summary-sf.php");

//?------------------------------------------------------------
//# QP Feedback
($workspace['type'] === 'mixed' || $workspace['type'] === 'sf') &&
  (require_once __DIR__ . "/../app/queries/summary-qp.php");

//?------------------------------------------------------------
//# CSAT By Tasks
require_once __DIR__ . "/../app/queries/summary-csatByTask.php";

//?------------------------------------------------------------
//# NPS By Tasks
require_once __DIR__ . "/../app/queries/summary-npsByTask.php";

//?------------------------------------------------------------
//# Tasks Summary
require_once __DIR__ . "/../app/queries/summary-taskSummary.php";

//?------------------------------------------------------------
//# NPS & CSAT Scores
require_once __DIR__ . "/../app/queries/summary-csatNpsScores.php";

//?------------------------------------------------------------
//# Both
//?------------------------------------------------------------

$db->where('date', $selected, 'BETWEEN');
$results = $db->get($workspace['db'], null, $select);
// Get both
if ($workspace['type'] === 'mixed') {
  $db->where('date', $selected, 'BETWEEN');
  $results = array_merge($results, $db->get(TABLE[3], null, $select));
}
$return['count'] = count($results);
$return['csat']['score'] = Scores::average($results);
$return['csat']['trend'] = $return['trend'];
$return["nps"]['score'] = Scores::nps($results);
$return["nps"]['trend'] = $return["trend"];
$return["tasksAccomplished"]['task'] = Scores::taskAverage($results);
$return["tasksAccomplished"]['trend'] = $return['trend'];

//?------------------------------------------------------------
//# Desktop
//?------------------------------------------------------------

$db->where('date', $selected, 'BETWEEN');
$db->where('device', 'desktop');
$results = $db->get($workspace['db'], null, $select);
// Get both
if ($workspace['type'] === 'mixed') {
  $db->where('date', $selected, 'BETWEEN');
  $db->where('device', 'desktop');
  $results = array_merge($results, $db->get(TABLE[3], null, $select));
}
$return['desktop']['count'] = count($results);
$return['csat']['desktop'] = Scores::csat($results);
$return["tasksAccomplished"]['desktop'] = Scores::taskAverage($results);
$return["nps"]['desktop'] = Scores::nps($results);

//?------------------------------------------------------------
//# Mobile & Tablet
//?------------------------------------------------------------

$db->having('date', $selected, 'BETWEEN');
$db->where('device', 'mobile');
$db->orWhere('device', 'tablet');
$results = $db->get($workspace['db'], null, $select);
// Get both
if ($workspace['type'] === 'mixed') {
  $db->having('date', $selected, 'BETWEEN');
  $db->where('device', 'mobile');
  $db->orWhere('device', 'tablet');
  $results = array_merge($results, $db->get(TABLE[3], null, $select));
}
$return['mobile']['count'] = count($results);
$return['csat']['mobile'] = Scores::csat($results);
$return["tasksAccomplished"]['mobile'] = Scores::taskAverage($results);
$return["nps"]['mobile'] = Scores::nps($results);

//?------------------------------------------------------------
//# No results available
//?------------------------------------------------------------

if ($return['desktop']['count'] < 1 && $return['mobile']['count'] < 1) {
  Response::message(['empty' => true]);
  die();
}

///////////////////////////////////////////////////////////////////////////////////
//# Previous time period
///////////////////////////////////////////////////////////////////////////////////

if (isset($previous)) {
  // Both
  $db->where('date', $previous, 'BETWEEN');
  $results = $db->get($workspace['db'], null, $select);
  // Get both
  if ($workspace['type'] === 'mixed') {
    $db->where('date', $previous, 'BETWEEN');
    $results = array_merge($results, $db->get(TABLE[3], null, $select));
  }
  $return['previous']['count'] = count($results);
  $return['csat']['previous']['score'] = Scores::average($results);
  $return["tasksAccomplished"]['previous']['task'] = Scores::taskAverage(
    $results
  );
  $return["nps"]['previous'] = Scores::nps($results);

  // Desktop
  $db->where('date', $previous, 'BETWEEN');
  $db->where('device', 'desktop');
  $results = $db->get($workspace['db'], null, $select);
  // Get both
  if ($workspace['type'] === 'mixed') {
    $db->where('date', $previous, 'BETWEEN');
    $db->where('device', 'desktop');
    $results = array_merge($results, $db->get(TABLE[3], null, $select));
  }
  $return['previous']['desktop']['count'] = count($results);
  $return['csat']['previous']['desktop']['average'] = Scores::average($results);
  $return["tasksAccomplished"]['previous']['desktop'] = Scores::taskAverage(
    $results
  );
  $return["nps"]['previous']['desktop'] = Scores::nps($results);

  // Mobile & Tablet
  $db->where('date', $previous, 'BETWEEN');
  $db->where('device', 'mobile');
  $db->orWhere('device', 'tablet');
  $results = $db->get($workspace['db'], null, $select);
  // Get both
  if ($workspace['type'] === 'mixed') {
    $db->where('date', $previous, 'BETWEEN');
    $db->where('device', 'mobile');
    $db->orWhere('device', 'tablet');
    $results = array_merge($results, $db->get(TABLE[3], null, $select));
  }
  $return['previous']['mobile']['count'] = count($results);
  $return['csat']['previous']['mobile']['average'] = Scores::average($results);
  $return["tasksAccomplished"]['previous']['mobile'] = Scores::taskAverage(
    $results
  );
  $return["nps"]['previous']['mobile'] = Scores::nps($results);
}

//////////////////////////////////////////////////////////////////////////////////////

//?------------------------------------------------------------
//# Remove empty results
//?------------------------------------------------------------

// Tasks Accomplished
if (isset($return["tasksAccomplished"])) {
  if (
    $return["tasksAccomplished"]['desktop'] === 0 &&
    $return["tasksAccomplished"]['mobile'] === 0
  ) {
    unset($return["tasksAccomplished"]);
  }
}

// Convert data to JSON and send
Response::message(['success' => $return]);
$db->disconnect();