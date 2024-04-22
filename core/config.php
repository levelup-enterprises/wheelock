<?php

/**
 ** DB Usage ----------------------------------------------------------------
 * If you intend to connect to a db within your project
 * add the table names below in the TABLE definition.
 * - Use the array key to reference the table
 * - Ex: TABLE[0] = 'demo'
 *
 * The framework is built on the
 * thingengineer/mysqli-database-class library.
 * Learn more at https://github.com/ThingEngineer/PHP-MySQLi-Database-Class
 */

/**
 *# Table variables:
 * @var \Table
 * Enter table names as array for easy changes
 *
 * 0 = Users
 *
 * 1 = Widgets
 *
 * 2 = Reliant Web
 *
 * 3 = Reliant App
 *
 * 4 = Reliant TOU
 *
 * 5 = Reliant Simple Form
 *
 * 6 = Cirro App
 *
 * 7 = Cirro Web
 *
 * 8 = GME App
 *
 * 9 = GME Web
 *
 * 10 = DP App
 *
 * 11 = DP Web
 */
define('TABLE', [
  "users",
  "widgets",
  "reliant_web",
  "reliant_app",
  "reliant_tou",
  "reliant_sf",
  "cirro_app",
  "cirro_web",
  "gme_app",
  "gme_web",
  "dp_app",
  "dp_web",
]);

/**
 ** Admin email ----------------------------------------------------------------
 * Support emails will be sent to these email addresses.
 */
define('ADMIN_EMAIL', ["admin@email.com", "admin2@email.com"]);

/**
 ** CORS Usage ----------------------------------------------------------------
 * Pass allowable urls for cors permissions.
 * - Set to null for local environment.
 */
if (LOCAL) {
  define('CORS_URLS', null);
} else {
  define('CORS_URLS', [
    "https://www.reliant.com",
    "https://prelive1-www.reliant.com",
    "https://stg1-www.reliant.com",
    "https://dev1-www.reliant.com",
    "https://www.cirroenergy.com",
    "https://www.greenmountainenergy.com",
  ]);
}

/**
 ** Custom Global Variables ------------------------------------------------
 * Set custom global variables here.
 * - API_CREDS set API access users, pw and permissions
 * - WIDGETS set guest's and initial widgets to display
 * - WORKSPACE set survey specific values for data & display
 * - COLUMNS available db columns to pull from for every survey query
 */

// API OAuth access credentials
define('API_CREDS', [
  'API-user' => [
    'pw' => 'SOMEPASSWORD',
    'restrictedTo' => [],
  ],
  'APP-user' => [
    'pw' => 'SOMEPASSWORD',
    'restrictedTo' => ['GME', 'Cirro'],
  ],
  // Brands
  'API-reliant' => [
    'pw' => 'SOMEPASSWORD',
    'restrictedTo' => ['Reliant'],
  ],
  'API-gme' => [
    'pw' => 'SOMEPASSWORD',
    'restrictedTo' => ['GME'],
  ],
  'API-cirro' => [
    'pw' => 'SOMEPASSWORD',
    'restrictedTo' => ['Cirro'],
  ],
  'API-dp' => [
    'pw' => 'SOMEPASSWORD',
    'restrictedTo' => ['DP'],
  ],
]);

// Available widgets
define('WIDGETS', [
  'nps',
  'npsCsatScores',
  'csat',
  'npsByTasks',
  'touFeedback',
  'sfFeedback',
  'tasksAccomplished',
  'csatByTasks',
  'taskSummary',
]);

// Set workspace env
define('WORKSPACE', [
  'reliant' => [
    'brand' => 'Reliant',
    'title' => 'Web & App',
    'type' => 'mixed',
    'name' => 'reliant',
    'db' => TABLE[2],
  ],
  'reliant-web' => [
    'brand' => 'Reliant',
    'title' => 'Web',
    'name' => 'reliant-web',
    'type' => 'web',
    'db' => TABLE[2],
  ],
  'reliant-app' => [
    'brand' => 'Reliant',
    'title' => 'App',
    'name' => 'reliant-app',
    'type' => 'app',
    'db' => TABLE[3],
  ],
  'reliant-sf' => [
    'brand' => 'Reliant',
    'title' => 'OAM Feedback',
    'name' => 'reliant-sf',
    'type' => 'sf',
    'widget' => 'sfFeedback',
    'db' => TABLE[5],
  ],
  'reliant-tou' => [
    'brand' => 'Reliant',
    'title' => 'Tou Feedback',
    'name' => 'reliant-tou',
    'type' => 'sf',
    'db' => TABLE[4],
  ],
  'cirro-app' => [
    'brand' => 'Cirro',
    'title' => 'App',
    'name' => 'cirro-app',
    'type' => 'app',
    'db' => TABLE[6],
  ],
  'cirro-web' => [
    'brand' => 'Cirro',
    'title' => 'Web',
    'name' => 'cirro-web',
    'type' => 'web',
    'db' => TABLE[7],
  ],
  'gme-app' => [
    'brand' => 'GME',
    'title' => 'App',
    'name' => 'gme-app',
    'type' => 'app',
    'db' => TABLE[8],
  ],
  'gme-web' => [
    'brand' => 'GME',
    'title' => 'Web',
    'name' => 'gme-web',
    'type' => 'web',
    'db' => TABLE[9],
  ],
  'dp-app' => [
    'brand' => 'DP',
    'title' => 'App',
    'name' => 'dp-app',
    'type' => 'app',
    'db' => TABLE[10],
  ],
  'dp-web' => [
    'brand' => 'DP',
    'title' => 'Web',
    'name' => 'dp-web',
    'type' => 'web',
    'db' => TABLE[11],
  ],
]);

// DB columns for API get calls
define('COLUMNS', [
  'web' => [
    'id',
    'date',
    'rating',
    'nps',
    'accomplish',
    'reason',
    'other_reason',
    'comments',
    'reason_es',
    'comments_es',
    'url',
    'previous_url',
    'ip_address',
    'analytics_id',
    'session_id',
    'performance_id',
    'ca_number',
    'survey_trigger',
    'device',
    'language',
  ],
  'default' => [
    'id',
    'date',
    'rating',
    'nps',
    'accomplish',
    'reason',
    'other_reason',
    'comments',
    'comments_covid',
    'reason_es',
    'comments_es',
    'comments_covid_es',
    'url',
    'previous_url',
    'ip_address',
    'analytics_id',
    'session_id',
    'performance_id',
    'ca_number',
    'survey_trigger',
    'device',
    'mobile_os',
    'language',
    'user_email',
    'user_phone',
    'user_followup',
  ],
  'reliant-web' => [
    'id',
    'date',
    'rating',
    'nps',
    'accomplish',
    'reason',
    'other_reason',
    'comments',
    'comments_covid',
    'reason_es',
    'comments_es',
    'comments_covid_es',
    'url',
    'previous_url',
    'ip_address',
    'analytics_id',
    'session_id',
    'performance_id',
    'ca_number',
    'survey_trigger',
    'device',
    'language',
  ],
  'reliant-app' => [
    'id',
    'date',
    'rating',
    'nps',
    'accomplish',
    'reason',
    'comments',
    'analytics_id',
    'performance_id',
    'ca_number',
    'survey_trigger',
    'device',
    'mobile_os',
    'user_email',
    'user_phone',
    'user_followup',
  ],
  'reliant-feedback' => [
    'id',
    'date',
    'helpful',
    'comments',
    'plan',
    'page',
    'previous_url',
    'ip_address',
    'analytics_id',
    'performance_id',
    'ca_number',
    'device',
    'language',
  ],
  'meritz-web' => [
    'id',
    'date',
    'rating',
    'nps',
    'accomplish',
    'reason',
    'other_reason',
    'comments',
    'reason_es',
    'comments_es',
    'url',
    'previous_url',
    'ip_address',
    'analytics_id',
    'session_id',
    'performance_id',
    'ca_number',
    'survey_trigger',
    'device',
    'language',
    'brand',
  ],
  'meritz-app' => [
    'id',
    'date',
    'rating',
    'nps',
    'accomplish',
    'reason',
    'comments',
    'analytics_id',
    'performance_id',
    'ca_number',
    'survey_trigger',
    'device',
    'mobile_os',
    'user_email',
    'user_phone',
    'user_followup',
    'language',
    'brand',
  ],
  'gme-app' => [
    'id',
    'date',
    'rating',
    'nps',
    'accomplish',
    'reason',
    'other_reason',
    'comments',
    'analytics_id',
    'performance_id',
    'ca_number',
    'survey_trigger',
    'mobile_os',
    'device_details',
    'user_email',
    'user_phone',
    'user_followup',
  ],
  'cirro-app' => [
    'id',
    'date',
    'rating',
    'nps',
    'accomplish',
    'reason',
    'other_reason',
    'comments',
    'analytics_id',
    'performance_id',
    'ca_number',
    'survey_trigger',
    'mobile_os',
    'device_details',
    'user_email',
    'user_phone',
    'user_followup',
  ],
]);

// CSAT task
define('REASON_LIST', [
  "default" => [
    "Pay my bill",
    "View my bill",
    "Sign up for an electricity plan",
    "View my electricity usage",
    "Move my service",
    "Renew or change my plan",
    "Report an outage",
  ],
  "gme" => [
    "Pay bill",
    "Check usage",
    "View plan details",
    "Renew my service",
    "Log in",
  ],
]);

/** -----------------------------
 ** General search columns
 * ------------------------------
 * Use columns to search correct
 *  columns for each table
 */
define('WORKSPACE_COLUMNS', [
  'mixed' => [
    'rating' => 'rating',
    'nps' => 'nps',
    'reason' => 'reason',
    'other_reason' => 'other_reason',
    'comments' => 'comments',
    'accomplish' => 'accomplish',
    'comments_covid' => 'comments_covid',
    'previous_url' => 'previous_url',
    'ip_address' => 'ip_address',
    'analytics_id' => 'analytics_id',
    'session_id' => 'session_id',
    'performance_id' => 'performance_id',
    'ca_number' => 'ca_number',
    'device' => 'device',
  ],
  'web' => [
    'rating' => 'rating',
    'nps' => 'nps',
    'reason' => 'reason',
    'other_reason' => 'other_reason',
    'reason_es' => 'reason_es',
    'comments' => 'comments',
    'comments_es' => 'comments_es',
    'accomplish' => 'accomplish',
    'comments_covid' => 'comments_covid',
    'comments_covid_es' => 'comments_covid_es',
    'url' => 'url',
    'previous_url' => 'previous_url',
    'ip_address' => 'ip_address',
    'analytics_id' => 'analytics_id',
    'session_id' => 'session_id',
    'performance_id' => 'performance_id',
    'ca_number' => 'ca_number',
    'device' => 'device',
  ],
  'app' => [
    'rating' => 'rating',
    'nps' => 'nps',
    'reason' => 'reason',
    'other_reason' => 'other_reason',
    'comments' => 'comments',
    'accomplish' => 'accomplish',
    'ca_number' => 'ca_number',
    'device' => 'device',
    'device_details' => 'device_details',
    'mobile_os' => 'mobile_os',
    'brand' => 'brand',
  ],
  'sf' => [
    'helpful' => 'helpful',
    'comments' => 'comments',
    'plan' => 'plan',
    'page' => 'page',
    'previous_url' => 'previous_url',
    'ip_address' => 'ip_address',
    'ip_address' => 'ip_address',
    'analytics_id' => 'analytics_id',
    'session_id' => 'session_id',
    'performance_id' => 'performance_id',
    'ca_number' => 'ca_number',
    'device' => 'device',
    'brand' => 'brand',
  ],
]);