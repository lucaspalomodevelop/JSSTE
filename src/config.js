let config = {};
let configvar = {
  templatePath: __dirname + "\\src\\templates",
  pagePath: __dirname + "\\src\\pages",
  assetsPath: __dirname + "\\src\\assets",
  stylesheets: __dirname + "\\src\\styles",
};

/**
 * get config var by key
 * @param {*} key 
 * @returns 
 */
config.get = function (key) {
  return configvar[key];
};

/**
 * get full config
 * @returns 
 */
config.getConfig = function () {
  return configvar;
};

/**
 * set full config
 * @param {*} param0 
 */
config.setConfig = function ({
  templatePath,
  pagePath,
  assetsPath,
  stylesheets,
}) {
  configvar.templatePath = templatePath;
  configvar.pagePath = pagePath;
  configvar.assetsPath = assetsPath;
  configvar.stylesheets = stylesheets;
};

/**
 * set config via key
 * @param {*} key 
 * @param {*} value 
 */
config.set = function (key, value) {
  configvar[key] = value;
};

module.exports = config;
