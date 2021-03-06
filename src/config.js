let config = {};
let configvar = {
  templatePath: __dirname + "\\src\\templates",
  pagePath: __dirname + "\\src\\pages",
  assetsPath: __dirname + "\\src\\assets",
  stylesheets: __dirname + "\\src\\styles",
};

config.get = function (key) {
  return configvar[key];
};

config.getConfig = function () {
  return configvar;
};

config.set = function (key, value) {
  configvar[key] = value;
};

module.exports = config;
