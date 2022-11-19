/**
 * that functions defines functions to use it in JSSTE JS var (js$varname)
 */
function Added() {
  let outString = "";
  
  //[jsste_info]

  function jsste_info()
  {
    let jssteinfo = jsste_input_file
    result = `\tINFOS\n\t${Object.keys(jssteinfo).map((key) => key + " : " + jssteinfo[key] ).join("\n\t") }`

    return result;
  }

  function out(arg) {
    outString += arg;
  }

  function outLine(arg) {
    outString += "\n" + arg;
  }
}

/**
 * exectue JSSTE JS var (js$varname)
 * @param {*} script
 * @returns
 */
function exec(script) {
  let result = undefined;

  script = "".concat(
    Added.toString().replace(/^function\s*\S+\s*\([^)]*\)\s*\{|\}$/g, ""),
    script
  );

  script = script.replace("//[jsste_info]",`let jsste_input_file = ${JSON.stringify(require("./index").info)}`),

  script += "\n return outString;";

  try {
    let F = new Function(script);

    result = F();
  } catch (error) {
    result = error;
  }
  return result;
}

module.exports = exec;
