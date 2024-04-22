<?php

use Http\Auth;
use Http\Response;
use REST\Reliant;
use REST\Cirro;

$_headers->get();

// Object passed from routes
$req = $_router->req;

// print_r($req);

//# Reliant Routes
if (str_starts_with($req->route, "reliant/")) {
  //@ Check for right permissions
  !VPN && Auth::verifyToken("Reliant");

  if ($req->route === "reliant/web/all") {
    $return = Reliant::all([]);
  }

  if ($req->route === "reliant/app/all") {
    $return = Reliant::app([]);
  }

  if ($req->route === "reliant/web/find/:id") {
    $return = Reliant::findWeb($req->id);
  }

  if ($req->route === "reliant/app/find/:id") {
    $return = Reliant::findApp($req->id);
  }
}

//# Cirro Routes
if (str_starts_with($req->route, "cirro/")) {
  //@ Check for right permissions
  !VPN && Auth::verifyToken("Cirro");

  if ($req->route === "cirro/web/all") {
    $return = Cirro::all([]);
  }

  if ($req->route === "cirro/app/all") {
    $return = Cirro::app([]);
  }

  if ($req->route === "cirro/web/find/:id") {
    $return = Cirro::findWeb($req->id);
  }

  if ($req->route === "cirro/app/find/:id") {
    $return = Cirro::findApp($req->id);
  }
}

Response::message([
  "results" => isset($return) ? $return : "Invalid route!",
]);