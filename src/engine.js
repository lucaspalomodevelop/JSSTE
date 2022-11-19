const fs = require("fs");
const path = require("path");
const jsonmerger = require("./jsonMerger");
let app = {};

app.__config = require("./config");
app.config = app.__config.getConfig();

/**
 * function to escape regex
 * @param {*} string
 * @returns
 */
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}

/**
 * replace all placeholder in a string
 * @param {*} str
 * @param {*} find
 * @param {*} replace
 * @returns
 */
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

/**
 * function to handle consts 
 * @param {*} pagecode
 * @param {*} constant
 * @param {*} callback
 * @returns
 */
app.CONST = function (pagecode, constant, callback) {
  if (pagecode[constant] !== undefined) {
    callback(pagecode, pagecode[constant]);
  } else {
    return 0;
  }
};

/**
 * renders Pagecode in Templatecode
 * @param {*} pagecode
 * @param {*} templatecode
 * @returns
 */
app.render = function (pagecode, templatecode) {
  app.setState({ status: 0, statusMSG: "Render Page" });
  if (
    (pagecode != null || pagecode != undefined) &&
    typeof pagecode === "string"
  ) {
    pagecode = JSON.parse(pagecode);
    app.setState({ status: 0, statusMSG: "Parse Pagecode" });
  } else {
    if(typeof pagecode === "object")
     {
      app.setState({ status: 0, statusMSG: "Pagecode is an object" });
     }
     else{
      app.setState({ status: 1, statusMSG: "Pagecode is undefined" });
     }
   
  }

  if (!templatecode) {
    try {
      app.setState({ status: 0, statusMSG: "Load Templatecode" });
      console.log(app.config.templatePath)
      templatecode = fs.readFileSync(
        path.join(app.config.templatePath, pagecode["_TEMPLATE_"] + ".tjsste"),
        "utf-8"
      );
    } catch (error) {
      app.setState({ status: 1, statusMSG: "Cant load Templatecode" });
      return 404;
    }
  }

  /**
   * Dissolve Fileimports
   * @param {*} _pagecode
   * @param {*} imports
   */
  let DissolveImports = function (_pagecode, imports) {
    app.setState({ status: 0, statusMSG: "Dissolve Imports" });
    let ImportSet = new Set();

    let recursive = function (importNames) {
      importNames.forEach(function (importName) {
        let importCodeString = "";
        let importPath = importName.startsWith(".")
          ? path.join(_pagecode["_SELFPATH_"].toString(), importName.toString())
          : path.join(app.config.pagePath, importName);
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

    let currentPagecode = _pagecode;

    ImportSet.forEach(function (importPath) {
      app.setState({ status: 0, statusMSG: "Import Importfiles" });

      let importCodeString = fs.readFileSync(importPath, "utf-8");
      let importCode = JSON.parse(importCodeString);
      currentPagecode = jsonmerger.mergeJson(currentPagecode, importCode);
    });
    pagecode = currentPagecode;
  };

  // Handle _IMPORTS_ const 
  app.CONST(pagecode, "_IMPORTS_", DissolveImports);

  // Handle _STYLES_ const 
  app.CONST(pagecode, "_STYLES_", (pagecode, value) => {
    app.setState({ status: 0, statusMSG: "Import Styles" });
    let rex = /<head>(.|\n|\t|\r)*?<\/head>/;
    let header = templatecode.match(rex);
    header = header[0].replace("</head>", "");
    value.forEach((element) => {
      header += `\n<link href="${element}.css" rel="stylesheet"></link>`;
    });

    header += "\n</head>";

    templatecode = templatecode.replace(/<head>(.|\n|\t|\r)*?<\/head>/, header);
  });

  app.setState({ status: 0, statusMSG: "Set vars" });
  for (let i in pagecode) {
    app.setState({ status: 0, statusMSG: "Set " + pagecode[i] });
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

  app.setState({ status: 0, statusMSG: "Return HTML" });
  return templatecode;
};

module.exports = app;
