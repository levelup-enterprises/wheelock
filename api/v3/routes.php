<?php require_once __DIR__ . "/../../core/app/config/index.php";

use Controllers\Router;

/** --------------------------------
 ** Set allowed routes here
 * ---------------------------------
 * Add paths to desired method.
 * Adding the key "allow" to a path will prevent
 *  authentication checks.
 *
 * - EX:
 *     'auth' => ['allow' => 'token'] <- unprotected route
 *     'get' => ['test/test1', 'test/test2']
 *     'post' => ['test/', 'example/test/here']
 *
 *! Methods must exist in target directory
 * @param [array] paths
 * @param [string] version root for api directory - optional
 * @return includes with object $req
 */
$_router = (new Router())->apiRoutes(
  [
    'auth' => ['allow' => 'token'],
    'get' => [
      // Reliant
      'reliant/web/all',
      'reliant/app/all',
      'reliant/web/find/:id',
      'reliant/app/find/:id',
      // Cirro
      'cirro/web/all',
      'cirro/app/all',
      'cirro/web/find/:id',
      'cirro/app/find/:id',
    ],
    'post' => [
      // Reliant
      'reliant/web/en',
      'reliant/web/es',
      'reliant/simple-form/oam',
      'reliant/app/en',
      // Cirro
      'cirro/web/en',
      'cirro/web/es',
      'cirro/app/en',
      // Gme
      'gme/web/en',
      'gme/web/es',
      'gme/app/en',
    ],
  ],
  "v3"
);

require __DIR__ . $_router->route;