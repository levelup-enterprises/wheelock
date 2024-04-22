/** ------------------------------------------------------
 * Use this script to inject the desired survey
 * - Change the project var to the name of the survey
 *    directory.
 *    ie: reliant, reliant-oam...
 * - Change the get and path based on prod or stage use.
 * - If injecting into an existing element comment out
 *    line 53 addHtml("...").
 * -------------------------------------------------------
 */
var project = "reliant",
  get = "https://wheelock.nrg.com/surveys/controller.php?d=" + project,
  path = "https://wheelock.nrg.com/surveys/" + project + "/";

function addCss(fileName) {
  var head = document.head,
    link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = path + fileName;
  head.appendChild(link);
}

function addScript(fileName) {
  var body = document.body,
    script = document.createElement("script");

  script.type = "text/javascript";
  script.src = path + fileName;

  body.appendChild(script);
  return true;
}

function addHtml(id) {
  var body = document.body,
    div = document.createElement("div");
  div.id = id;
  div.style.cssText = "display:none";
  body.appendChild(div);
}

function getFiles() {
  $.get(get, function (data) {
    data.forEach(function (file) {
      var css = file.endsWith(".css") && addCss(file);
      var js = file.endsWith(".js") && addScript(file);
    });
  });
}

addHtml("wheelock-inject");
getFiles();
