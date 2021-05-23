var engine = require("./src/modules/engine");
var app = {};
app.config = {
  templatePath: __dirname + "\\src\\templates",
  pagePath: __dirname + "\\src\\pages",
};

<<<<<<< HEAD
  "templatePath":__dirname+"\\src\\templates",
  "pagePath":__dirname+"\\src\\pages"
  
  };

app.render = engine.render;

// app.getTemplateNameFromPage = function(pageName)
// {
//   return app.pages.get(pageName)["_TEMPLATE_"]
// }

=======
app.render = engine.render;
>>>>>>> 15070407cefad5bcf866cedb53b9e41d47333d9b

// app.getTemplateNameFromPage = function(pageName)
// {
//   return app.pages.get(pageName)["_TEMPLATE_"]
// }

module.exports = app;
