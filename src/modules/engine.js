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

            try {

                if(i.startsWith("{"))
                {
                    var args = [];

                    pagecode[i].args.forEach(element => {
                        args.push(pagecode[element]);
                    });
                    //args.push()
                    value = new Function(pagecode[i].args, pagecode[i].body);
                }
                else
                {
                    value = pagecode[i].toString();
                }

            } catch (error) {
                value = error;
            }
            templatecode = templatecode.replace("<["+i+"]>",value)
         }
  //  }
  return templatecode;
}


module.exports = app;