<?php require_once __DIR__ . "/../app/config/index.php";

use Http\Auth;
// use Http\Request;
use Http\Response;

// Create token session validation
// Request::authRequest() &&
Response::message(Auth::getToken());
