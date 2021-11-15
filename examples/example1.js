let app = require("express")();
let path = require("path");
let jsste = require("../src");
jsste.__config.set("templatePath", __dirname + "/templates");
jsste.__config.set("pagePath", __dirname + "/pages");
let fs = require("fs");
//let supertest = require("supertest");

// app.set("views", path.join(__dirname)); // specify the views directory
// app.set("view engine", "jsste");
// app.engine("jsste", require("../src").expressEngine());
// app.get("/:id", function (req, res) {
//   if (/\w+\.[a-z]*[A-Z]*/.test(req.params.id)) {
//     res.sendFile(path.join(__dirname, "pages", req.params.id));
//   } else {
//     let filePath = path.join(__dirname, "pages", req.params.id + ".jsste");

//     let content = jsste.renderFile(filePath);
//     res.send(content);
//   }

//   // res.send("File Not found");
// });

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
    __dirname,
    getFolderFromFileEnding(req.url),
    req.url
  );

  if (regex_isAnDotfile.test(req.url) && !filePath.endsWith(".jsste")) {
    res.sendFile(filePath);
  } else if (fs.existsSync(filePath + ".jsste")) {
    let content = jsste.renderFile(filePath + ".jsste");
    res.send(content);
  } else if (fs.lstatSync(filePath).isDirectory()) {
    let content = jsste.renderFile(path.join(filePath, "index.jsste"));
    res.send(content);
  } else next();
}

app.use(defaultUse);
// app.use((req, res, next) => {
//   if (/\w+\.[a-z]*[A-Z]*/.test(req.url)) {
//     res.sendFile(path.join(__dirname, "pages", req.url));
//   } else if (fs.existsSync(path.join(__dirname, "pages", req.url + ".jsste"))) {
//     let filePath = path.join(__dirname, "pages", req.url + ".jsste");

//     let content = jsste.renderFile(filePath);
//     res.send(content);
//   } else {
//     next();
//   }
// });

app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
