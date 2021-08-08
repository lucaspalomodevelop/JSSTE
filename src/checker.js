function isObject(obj) {
  return obj !== undefined && obj !== null && obj.constructor == Object;
}
function isArray(obj) {
  return obj !== undefined && obj !== null && obj.constructor == Array;
}

function isBoolean(obj) {
  return obj !== undefined && obj !== null && obj.constructor == Boolean;
}

function isFunction(obj) {
  return obj !== undefined && obj !== null && obj.constructor == Function;
}

function isNumber(obj) {
  return obj !== undefined && obj !== null && obj.constructor == Number;
}

function isString(obj) {
  return obj !== undefined && obj !== null && obj.constructor == String;
}

function isInstanced(obj) {
  if (obj === undefined || obj === null) {
    return false;
  }

  if (isArray(obj)) {
    return false;
  }
  if (isBoolean(obj)) {
    return false;
  }
  if (isFunction(obj)) {
    return false;
  }
  if (isNumber(obj)) {
    return false;
  }
  if (isObject(obj)) {
    return false;
  }
  if (isString(obj)) {
    return false;
  }

  return true;
}

module.exports = {
  isObject: isObject,
  isArray: isArray,
  isBoolean: isBoolean,
  isFunction: isFunction,
  isNumber: isNumber,
  isString: isString,
  isInstanced: isInstanced,
};
