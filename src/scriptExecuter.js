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
  script = "".concat(
    Added.toString().replace(/^function\s*\S+\s*\([^)]*\)\s*\{|\}$/g, ""),
    script
  );

  script += "\n return outString;";

  let F = new Function(script);

  return F();
}

module.exports = exec;

/* 

*/
