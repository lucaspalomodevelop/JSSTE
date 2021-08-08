const checker = require("./checker");

function mergeJson(org, ext) {
  // let placeholder = undefined;

  if (!checker.isObject(org)) {
    org = JSON.parse(org);
  }
  if (!checker.isObject(ext)) {
    ext = JSON.parse(ext);
  }

  Object.keys(ext).forEach(function (key) {
    let value = ext[key];

    if (Array.isArray(ext[key])) {
      if (Array.isArray(org[key])) {
        value.forEach((item) => {
          org[key].push(item);
        });
      }
    } else {
      org[key] = value;
    }
  });

  return org;
}

function mergeJsons(org, ...ext) {
  ext.forEach((element) => {
    org = mergeJson(org, element);
  });
  return org;
}

module.exports = { mergeJson, mergeJsons };
