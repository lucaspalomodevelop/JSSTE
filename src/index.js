var engine = require("./engine");
const mergeJson = require("./jsonMerger");
const fs = require("fs");
const path = require("path");
var app = {};

app.render = engine.render;
app.CONST = engine.CONST;
app.renderFile = (filePath) => {
  let file = fs.readFileSync(filePath, "utf8");
  file = JSON.parse(file);
  file["_SELFPATH_"] = path.dirname(filePath);
  return engine.render(file);
};
// engine.config = app.config;
app.__config = require("./config");
app.config = app.__config.getConfig();
engine.config = app.config;

// app.expressEngine = (
//   config = {
//     templatePath: "templates",
//     pagePath: "pages",
//   }
// ) => {
//   config = mergeJson.mergeJson(app.config, config);
//   let hasrendered = false;
//   return (filePath, options, callback) => {
//     if (!hasrendered) {
//       app.config.templatePath = path.join(
//         options.settings.views,
//         config.templatePath
//       );
//       app.config.pagePath = path.join(options.settings.views, config.pagePath);
//       hasrendered = true;
//     }
//     // define the template engine
//     fs.readFile(filePath, function (err, content) {
//       content = content.toString();
//       // content = mergeJson.mergeJson(JSON.parse(content), options);

//       if (err) return callback(new Error(err));
//       // this is an extremely simple template engine
//       var rendered = app.render(content);
//       return callback(null, rendered);
//     });
//   };
// };

module.exports = app;
