const fs = require("fs");
const path = require("path");
var appdir = path.join(__dirname, '..');
var app = {}

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

app.render = function(pagecode, templatecode) {
    result = "";

    if(!pagecode == JSON)
    pagecode = JSON.parse(pagecode);

    //TODO
    if(templatecode === null || templatecode == undefined)
    {
      templatecode == fs.readFileSync(pagecode["_TEMPLATE_"]+".html");
    }


    for (var i in pagecode) {
        var value = undefined;

        var re = new RegExp("\d*_([A-Z])\w*_");
        if(re.test(i))
        continue;

          value = pagecode[i].toString();
          templatecode = replaceAll(templatecode,"<["+i+"]>",value);
       }

  return templatecode;
}


module.exports = app;