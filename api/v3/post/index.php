<?php

use Http\Auth;
use Http\Response;
use REST\Reliant;
use REST\Cirro;
use REST\GME;
use REST\DP;

$_headers->post();

// Object passed from routes
$req = $_router->req;

//# Reliant Routes
if (str_starts_with($req->route, "reliant/")) {
  //@ Check for right permissions
  !VPN && Auth::verifyToken("Reliant");

  if ($req->route === "reliant/web/en") {
    $return = (new Reliant())->postEN([]);
  }

  if ($req->route === "reliant/web/es") {
    $return = (new Reliant())->postES([]);
  }

  if ($req->route === "reliant/app/en") {
    $return = (new Reliant())->postApp([]);
  }

  if ($req->route === "reliant/simple-form/oam") {
    $return = (new Reliant())->postSF([]);
  }
}

//# Cirro Routes
if (str_starts_with($req->route, "cirro/")) {
  //@ Check for right permissions
  !VPN && Auth::verifyToken("Cirro");

  if ($req->route === "cirro/web/en") {
    $return = (new Cirro())->postEN([]);
  }

  if ($req->route === "cirro/web/es") {
    $return = (new Cirro())->postES([]);
  }

  if ($req->route === "cirro/app/en") {
    $return = (new Cirro())->postApp([]);
  }
}

//# GME Routes
if (str_starts_with($req->route, "gme/")) {
  //@ Check for right permissions
  !VPN && Auth::verifyToken("GME");

  if ($req->route === "gme/web/en") {
    $return = (new GME())->postEN([]);
  }

  if ($req->route === "gme/web/es") {
    $return = (new GME())->postES([]);
  }

  if ($req->route === "gme/app/en") {
    $return = (new GME())->postApp([]);
  }
}

//# DP Routes
if (str_starts_with($req->route, "dp/")) {
  //@ Check for right permissions
  !VPN && Auth::verifyToken("DP");

  if ($req->route === "dp/web/en") {
    $return = (new DP())->postEN([]);
  }

  if ($req->route === "dp/web/es") {
    $return = (new DP())->postES([]);
  }

  if ($req->route === "dp/app/en") {
    $return = (new DP())->postApp([]);
  }
}

Response::message([
  "results" => isset($return) ? $return : "Invalid route!",
]);