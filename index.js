
var engine = require("./src/modules/engine")

app.config = {

  "templatePath":__dirname+"\\src\\templates",
  "pagePath":__dirname+"\\src\\pages"
  
  };

app.render = engine.render(pagecode,templatecode);

app.getTemplateNameFromPage = function(pageName)
{
  return app.pages.get(pageName)["_TEMPLATE_"]
}



module.exports = app;

