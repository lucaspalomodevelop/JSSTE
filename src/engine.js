const fs = require("fs");
const path = require("path");
var appdir = path.join(__dirname, "..");
var app = {};

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

app.CONST = function(pagecode,constant,callback)
{
  if(pagecode[constant] !== undefined)
  {
    callback(pagecode,pagecode[constant]);
  }
  else
  {
    return 0;
  }
}


app.render = function (pagecode, templatecode) {


  result = "";

  if (!pagecode == JSON) pagecode = JSON.parse(pagecode);

  //TODO
  if (templatecode === null || templatecode == undefined) {
    templatecode == fs.readFileSync(pagecode["_TEMPLATE_"] + ".html");
  }

  app.CONST(pagecode, "_STYLES_", (pagecode, value) => {
    var rex = /<head>(.|\n|\t|\r)*?<\/head>/;
    var header = templatecode.match(rex);
    header = header[0].replace("</head>", "");
    value.forEach((element) => {
      header += `\n<link href="${element}.css" rel="stylesheet"></link>`;
    });

    header += "\n</head>";
  //  console.log(header);
    templatecode = templatecode.replace(/<head>(.|\n|\t|\r)*?<\/head>/, header);
  });


  for (var i in pagecode) {
    var value = undefined;

    var re = new RegExp(/\d*_([A-Z]|[a-z])\w*_/g);
    if (re.test(i)) continue;

    value = pagecode[i].toString();
    templatecode = replaceAll(templatecode, "<[" + i + "]>", value);
  }

  return templatecode.replace(new RegExp(/\d*<\[([A-Z])\w*\]>/g), "");
};

module.exports = app;
