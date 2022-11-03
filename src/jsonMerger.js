/**
 * merge two JSONs
 * @param {*} org 
 * @param {*} ext 
 * @returns 
 */
function mergeJson(org, ext) {

  if (!(typeof org === 'object' && org !== null)) {
    org = JSON.parse(org);
  }
  if (!(typeof ext === 'object' && ext !== null)) {
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
      else {
        org[key] = value;
      }
    } else {
      org[key] = value;
    }
  });

  return org;
}

/**
 * Merge multiple JSONs
 * @param {*} org 
 * @param  {...any} ext 
 * @returns 
 */
function mergeJsons(org, ...ext) {
  ext.forEach((element) => {
    org = mergeJson(org, element);
  });
  return { ...org };
}

module.exports = { mergeJson, mergeJsons };
