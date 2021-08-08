const fs = require("fs");
const checker = require("typechecker");
//const path = require("path");
//let appdir = path.join(__dirname, "..");
let app = {};

app.__config = require("./config");
app.config = app.__config.getConfig();

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
  if (
    (pagecode != null || pagecode != undefined) &&
    checker.isString(pagecode)
  ) {
    pagecode = JSON.parse(pagecode);
  }

  //TODO
  if (templatecode === null || templatecode == undefined) {
    templatecode == fs.readFileSync(pagecode["_TEMPLATE_"] + ".html");
  }

  app.CONST(pagecode, "_STYLES_", (pagecode, value) => {
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
    let value = undefined;

    if (new RegExp(/\d*_([A-Z]|[a-z])\w*_/g).test(i)) continue;
    if (new RegExp(/js\$([A-Z]*[a-z]*)\w+/g).test(i)) {
      let SE = require("./scriptExecuter");
      pagecode[i] = SE(pagecode[i]);
    }

    value = pagecode[i].toString();
    templatecode = replaceAll(templatecode, "<[" + i + "]>", value);
  }

  return templatecode.replace(new RegExp(/\d*<\[([A-Z]*[a-z]*)\w*\]>/g), "");
};

module.exports = app;
