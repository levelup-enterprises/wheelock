<?php

use Http\Auth;
use Http\Response;

// $_headers->get();

// Get all web & app
if ($_router->req->route === "token") {
  Auth::verifyOATH();
  Response::message(['token' => Auth::getToken()]);
}