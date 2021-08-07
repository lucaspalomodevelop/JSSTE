function mergeJson(org, ext) {
  // let placeholder = undefined;
  if (org !== JSON) {
    try {
      org = JSON.parse(org);
    } catch (error) {}
  }
  if (ext !== JSON) {
    try {
      ext = JSON.parse(ext);
    } catch (error) {}
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
