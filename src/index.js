var engine = require("./engine");
const mergeJson = require("./jsonMerger");
const fs = require("fs");
const path = require("path");
var app = {};

app.render = engine.render;
app.CONST = engine.CONST;
/**
 * Render File
 * @param {*} filePath 
 * @returns 
 */
app.renderFile = (filePath) => {
  this.setState({ status: 0, statusMSG: "read file" });
  let file = fs.readFileSync(filePath, "utf8");
  this.setState({ status: 0, statusMSG: "parse file" });
  file = JSON.parse(file);
  this.setState({ status: 0, statusMSG: "set Selfpath" });
  file["_SELFPATH_"] = path.dirname(filePath);
  return engine.render(file);
};

/**
 * set State
 * @param {*} param0 
 */
app.setState = ({ status, statusMSG }) => {
  if (app.stateCallback != undefined) {
    app.stateCallback({ status, statusMSG });
  }
};

/**
 * Set function that would called by new state
 * @param {*} callback 
 */
app.setStateFunction = function (callback) {
  app.stateCallback = callback;
  this.setState({ status: 0, statusMSG: "set Statefunction" });
  this.setState({ status: 0, statusMSG: "JSSTE is ready" });
};

app.__config = require("./config");
app.config = app.__config.getConfig();
engine.log = app.log;
engine.setState = app.setState;


module.exports = app;
