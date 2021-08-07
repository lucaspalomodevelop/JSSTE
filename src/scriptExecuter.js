function Added() {
  let outString = "";

  function out(arg) {
    outString += arg;
  }

  function outLine(arg) {
    outString += "\n" + arg;
  }
}

function exec(script) {
  let result = undefined;

  script = "".concat(
    Added.toString().replace(/^function\s*\S+\s*\([^)]*\)\s*\{|\}$/g, ""),
    script
  );

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

/* 

*/
