let express = require("express");
let app = express();
let jsste = require("../src");
const bodyParser = require("body-parser");
let path = require("path");
let fs = require("fs");
var decode = require("urldecode");

jsste.__config.set("templatePath", __dirname + "/templates");
jsste.__config.set("pagePath", __dirname + "/pages");
jsste.__config.set("assetsPath", "./assets");
jsste.__config.set("stylesheets", "./styles");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let folders = {
  jsste: "pages",
  css: "styles",
};

function getFolderFromFileEnding(filename) {
  let regex_isAnDotfile = /\w+\.[a-z]*[A-Z]*/;
  if (regex_isAnDotfile.test(filename)) {
    let ending = filename.split(".").pop();
    return folders[ending];
  }
  return folders.jsste;
}

function defaultUse(req, res, next) {
  let regex_isAnDotfile = /\w+\.[a-z]*[A-Z]*/;
  let filePath = path.join(
    __dirname.toString(),
    getFolderFromFileEnding(req.url).toString(),
    req.url.toString()
  );
  if (regex_isAnDotfile.test(req.url) && !filePath.endsWith(".jsste")) {
    res.sendFile(filePath);
  } else if (fs.existsSync(filePath + ".jsste")) {
    let content = jsste.renderFile(filePath + ".jsste");
    res.send(content);
  } else if (fs.lstatSync(filePath).isDirectory()) {
    let content = jsste.renderFile(decode(path.join(filePath, "index.jsste")));
    res.send(content);
  } else next();
}
app.get("/assets/*", (req, res) => {
  console.log(req.url);
  console.log(__dirname);
  res.sendFile(decode(path.join(__dirname, req.url)));
});

app.get("/*", defaultUse);

app.listen(8000, function () {
  console.log("Example app listening on port http://127.0.0.1:8000 !");
});
