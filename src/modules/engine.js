const fs = require("fs");
const path = require("path");
var appdir = path.join(__dirname, '..');
var app = {}


app.config = {

    "templatePath":__dirname+"\\templates",
    "pagePath":__dirname+"\\pages"
    
    };

app.render = function(pagecode, templatecode) {
    result = "";

    pagecode = JSON.parse(pagecode);

    //TODO
    //if(templatecode === null)


    for (var i in pagecode) {
        var value = undefined;

        if(i.startsWith("_"))
        continue;

          value = pagecode[i].toString();
          templatecode = templatecode.replace("<["+i+"]>",value)
       }

  return templatecode;
}


module.exports = app;