# Wheelock Survey Solutions

## Site information

> URL: wheelock.nrg.com

> Code languages: `php, react.js, sass, node.js`

> Framework used: `create-react-app (frontend) | Tommy's PHP v2.6 (backend) | express-node (api v2)`

> DBs: `AWS - wheelock | wheelock_stg`

> Additional connections: `nrg.allegiancetech.com (call center ftp)`

## Purpose

The Wheelock Survey Solution (WSS) is a full fledged application with 3 major parts. Each designed for a specific purpose.

### 1. Deploying surveys

The public facing aspects of the WSS are the surveys injected onto the page. Each survey is a self contained react application that can be deployed by script onto any web page. `Currently, the injection script is placed on a site by Adobe Launch.` Each survey has its own ecosystem which allows for multiple surveys to exist on the same page, at the same time, without conflict. Each survey POSTs to the WSS API v3.

### 2. Handling data (API)

All survey data is submitted to the API. The API can handle any method desired, but currently it supports POST and GET methods.

The WSS API comes in 2 flavors v1 and v3. v1 is legacy code that is still being used by the Reliant App for form submits. All future connections should be established through v3.

`View API documentation for more detailed information.`

### 3. Consuming survey data (UI Dashboard)

The dashboard is where employees interact with the captured survey data. The dashboard can be accessed as a guest user while on the company VPN or by creating a user login. Anyone can create a login.

> If the user does not have a nrg.com email address, an approval email will be sent to the WSS admin for verification.

The dashboard displays survey data in a graphical representation (Summary) and in table format (Comments).

- Summary - displays interactive charts with an easy to consume UI.
- Comments - displays survey comments with all captured information through a filterable search engine.

> If a user is logged in they have the ability to customize their summary page, through widgets (charts).

## How it works

Here is a basic outline of the most common flows.

### Submit flow

1. A survey form is injected onto a page.
2. The survey is initiated (automatically, manually or by rage detection)
3. User submits the survey to the WSS API.
   - The API directs it to the correct DB and inserts the data.
   - A digital receipt is returned with the id of the inserted data.

### View flow

1. User logs into the WSS dashboard.
   - The date range is set automatically for the last week.
   - The summary page is displayed.
   - Brand is set to Reliant - Web & App.
2. User clicks on chart element.
   - Comments page is rendered.
   - Search filter is applied based on predetermined element click handler.
   - Filtered comments are returned.
3. User applies further search filters.
   - Updated results are returned.

### `Technical details`

      The backend is php while the frontend is react. Because of this arrangement there is a security vulnerability between the two. In order to prevent exploitation, every call from the frontend relies on JWT token. The token is generated on the backend and passed to the frontend on the initial login, this acts as a session token.

      The benefit to this stack is faster content updates and state mutations. The end user does not need a full page load on every request. When applicable the content updates from state, rendering the content almost instantaneously.

## Managing environments

There are 3 environments that the WWS exist in.

- Development - local machine
- Stage - www/stage/wheelock.nrg.com (https://stg-wheelock.nrg.com)
- Production - www/wheelock.nrg.com (https://wheelock.nrg.com)

> The development env is the most complicated to set up while both stage and prod are very easy to manage.

### Setting up the dev env

_The file structure should resemble the following:_

      --- PHP ---
      api/
         v1/
         v3/ <- latest api path
      core/
         app/ <- primary functions
         get/ <- internal GET request
         post/ <- internal POST request
         public/ <- accessible files for emails and up uploads (needs rwr permissions)
         vendor/ <- composer vender files
         - .env <- project variables
         - config.php <- project variables

      --- React ---
      dev/
         build/ <- run 'yarn build' / 'npm run build' to get this directory
         node_modules/ <- npm vendor files
         public/
         src/
            assets/ <- css/images/fonts
            components/
               charts/ <- chart/widget components
               comments/ <- comment components
               common/ <- reusable components
            context/ <- global state variables
            forms/ <- forms and form components
            pages/ <- views
            services/ <- requests / utilities
            - App.js <- routing of application
            - index.js <- root of application
         - .env.development <- local settings
         - .env.production <- stage/production settings
      surveys/
         (directories of surveys) <- reliant/cirro/gme...
         - controller.php <- returns list of current surveys to injection script

> There may be other files in the root of these directories. This is not an exhaustive list.

In both stage and production the dev directory is absent. Instead of uploading the dev directory you simply upload all of the files in the dev/build directory to the root directory.

> Currently, (10/11/2021) the WSS is housed on Vegeta (18.209.96.6).

_Stage and Prod should resemble the following structure:_

      api/
      core/
      static/ <- generated from build
      surveys/
      .htaccess
      index.html <- generated from build
      asset-manifest.json <- generated from build
      manifest.json <- generated from build
      logo.png <- generated from build
      robots.txt <- generated from build

Once the files have been moved and tested in stage, navigate to the prod directory and run 'make list'. If the list returned contains the files you updated run 'make thump'. You have now pushed your changes to production.

Surveys is the exception. The makefile is setup to ignore anything in the surveys directory.

## Updating surveys

Within each survey there is a bash file that runs after the project is built. The bash file removes everything from the directory except for the files needed.

When uploading the survey, first remove the existing content in stage or prod. Once removed replace the content with the files in the build directory.

> If you do not first remove them, you will have duplicate surveys attempting to run, causing havoc.

## API Routing

Routing is applied in a single object.

> The root key describes the method or root directory (get, post...)

      [
         'auth' => ['allow' => 'token'], <- unrestricted route, notice key "allow"
         'get' => [
            'reliant/web/find/:id', <- ":" indicates a variable
            'gme/app/all',
         ],
         'post' => [
            'reliant/app/en',
            'cirro/web/en'
         ],
      ]

All API returns are handled through the `REST` class.

## External resources

### Call center inMoment FTP

Every hour a script is triggered through a cronjob on the server (ran as root user). When the script is triggered the last hour of survey responses are exported to a csv file and placed on the `nrg.allegiancetech.com` server for processing into the inMoment. As a backup there is an additional call at the end of the week that exports all of the responses that week and uploads it to they're server.

### Adobe Launch

Adobe handles the survey injection for each site. Most of the surveys will use identical settings for injecting the survey. When deploying a new survey it is easiest to copy an existing Launch rule.

Copy the survey's inject.js file's code into the injection code section in the Launch rule to utilize the script.
