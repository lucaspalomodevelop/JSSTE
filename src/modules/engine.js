const fs = require("fs");
const path = require("path");
var appdir = path.join(__dirname, '..');
var app = {}

app.render = function(pagecode, templatecode) {
    result = "";

    pagecode = JSON.parse(pagecode);

    //TODO
    if(templatecode === null)
    {
      templatecode == fs.readdirSync(pagecode["_TEMPLATE_"]);
    }


    for (var i in pagecode) {
        var value = undefined;

        if(new RegExp("\d*_([A-Z])\w*_",i))
        continue;

          value = pagecode[i].toString();
          templatecode = templatecode.replace("<["+i+"]>",value)
       }

  return templatecode;
}


module.exports = app;