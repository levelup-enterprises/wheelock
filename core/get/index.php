<?php require_once __DIR__ . "/../app/config/index.php";

// Get user info
try {
  $db->where("username", $_SESSION['user']);
  $users = $db->get(TABLE[0]);
  if ($db->count !== 0) {
    $user = $users;
  }
} catch (Throwable $e) {
  die("Error could not get users: " . $e);
}

// Get widgets
try {
  $db->orderBy("sort", "asc");
  $widgets = $db->get(TABLE[1]);
  if ($db->count === 0) {
    die("No widgets available.");
  } else {
    if (isset($user[0])) {
      // Split into arrays
      $ids = explode(",", $user[0]["widgets"]);
      $sort = explode(",", $user[0]["widgetSort"]);

      // Combine to associative array
      for ($i = 0; $i < count($ids); $i++) {
        $userLayout[$ids[$i]] = $sort[$i];
      }

      // Check if user has widget and change its sort
      foreach ($widgets as $k => $widget) {
        if (array_key_exists($widget["id"], $userLayout)) {
          $widget["sort"] = $userLayout[$widget["id"]];
        } else {
          unset($widgets[$k]);
        }
      }
    }

    $widget = $widgets;
  }
} catch (Throwable $e) {
  die("Error could not get widgets: " . $e);
}

// Get Sidenav widgets
try {
  $db->orderBy("sort", "asc");
  $widgets = $db->get(TABLE[1]);
  if ($db->count === 0) {
    die("No widgets available.");
  } else {
    if (isset($user[0])) {
      // Split into arrays
      $ids = explode(",", $user[0]["widgets"]);

      // Check if user has widget and change its sort
      foreach ($widgets as $k => $list) {
        if (in_array($list["id"], $ids)) {
          unset($widgets[$k]);
        }
      }
    }

    $widgetList = $widgets;
  }
} catch (Throwable $e) {
  die("Error could not get widgets: " . $e);
}

$db->disconnect();
