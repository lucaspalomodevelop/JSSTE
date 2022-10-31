const fs = require("fs");
const checker = require("typechecker");
const path = require("path");
const jsonmerger = require("./jsonMerger");
//let appdir = path.join(__dirname, "..");
let app = {};

app.__config = require("./config");
app.config = app.__config.getConfig();

//function to escape regex
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

app.CONST = function (pagecode, constant, callback) {
  if (pagecode[constant] !== undefined) {
    callback(pagecode, pagecode[constant]);
  } else {
    return 0;
  }
};

app.render = function (pagecode, templatecode) {
  //let result = "";

  //if (!pagecode == JSON) pagecode = JSON.parse(pagecode);
  app.setState({ status: 0, statusMSG: "Render Page" });
  if (
    (pagecode != null || pagecode != undefined) &&
    checker.isString(pagecode)
  ) {
    pagecode = JSON.parse(pagecode);
    app.setState({ status: 0, statusMSG: "Parse Pagecode" });
  }

  //TODO
  if (!templatecode) {
    try {
      app.setState({ status: 0, statusMSG: "Load Templatecode" });
      templatecode = fs.readFileSync(
        path.join(app.config.templatePath, pagecode["_TEMPLATE_"] + ".tjsste"),
        "utf-8"
      );
    } catch (error) {
      app.setState({ status: 1, statusMSG: "Cant load Templatecode" });
      return 404;
    }
  }

  let DissolveImports = function (_pagecode, imports) {
    app.setState({ status: 0, statusMSG: "Dissolve Imports" });
    let ImportSet = new Set();

    let recursive = function (importNames) {
      importNames.forEach(function (importName) {
        let importCodeString = "";
        let importPath = importName.startsWith(".")
          ? path.join(_pagecode["_SELFPATH_"].toString(), importName.toString())
          : path.join(app.config.pagePath, importName);
        // console.log(importPath);
        // console.log(_pagecode);
        try {
          importCodeString = fs.readFileSync(importPath, "utf-8");
        } catch (error) {
          app.setState({ status: 1, statusMSG: "Import File Failed" });
          return "Ups... Import File Failed";
        }

        let importCode = JSON.parse(importCodeString);
        if (importCode["_IMPORTS_"] !== undefined) {
          recursive(importCode["_IMPORTS_"]);
        }
        ImportSet.add(importPath);
      });
    };

    recursive(imports);

    //console.log(ImportSet);

    let currentPagecode = _pagecode;

    ImportSet.forEach(function (importPath) {
      app.setState({ status: 0, statusMSG: "Import Importfiles" });

      let importCodeString = fs.readFileSync(importPath, "utf-8");
      let importCode = JSON.parse(importCodeString);
      currentPagecode = jsonmerger.mergeJson(currentPagecode, importCode);
    });
    pagecode = currentPagecode;
  };

  //TODO Killed Root Import
  app.CONST(pagecode, "_IMPORTS_", DissolveImports);
  //console.log(pagecode);
  app.CONST(pagecode, "_STYLES_", (pagecode, value) => {
    app.setState({ status: 0, statusMSG: "Import Styles" });
    let rex = /<head>(.|\n|\t|\r)*?<\/head>/;
    let header = templatecode.match(rex);
    header = header[0].replace("</head>", "");
    value.forEach((element) => {
      header += `\n<link href="${element}.css" rel="stylesheet"></link>`;
    });

    header += "\n</head>";
    // console.log(header);
    templatecode = templatecode.replace(/<head>(.|\n|\t|\r)*?<\/head>/, header);
    //  replaceAll(templatecode,rex,value)
  });

  for (let i in pagecode) {
    app.setState({ status: 0, statusMSG: "Set vars" });
    let value = undefined;

    if (new RegExp(/\d*_([A-Z]*|[a-z])\w*_/g).test(i)) continue;
    if (new RegExp(/\/\//g).test(i)) continue;
    if (new RegExp(/js\$([A-Z]*|[a-z]*)\w+/g).test(i)) {
      app.setState({ status: 0, statusMSG: "Execute Serverside Script" });
      let SE = require("./scriptExecuter");
      pagecode[i] = SE(pagecode[i]);
    }
    value = pagecode[i].toString();
    templatecode = replaceAll(templatecode, "<[" + i + "]>", value);
  }

  app.setState({ status: 0, statusMSG: "Delete unused Placeholder" });

  templatecode = templatecode.replace(
    new RegExp(/<\[([A-Z]*|[a-z]*)\w*\]>/g),
    ""
  );

  templatecode = templatecode.replace(
    new RegExp(/<\[([A-Z]*|[a-z]*)\$([A-Z]*|[a-z]*)\w*\]>/g),
    ""
  );

  templatecode = templatecode.replace(new RegExp(/<\[\/\/]\>/g), "");

  return templatecode;
};

module.exports = app;
