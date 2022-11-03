let core_render = require("./core.render.test");
let core_scriptexec = require("./scriptexec.jsste.test");
let core_includeJSSTE = require("./includeJSSTE.test");
let core_state = require("./core.state.test");

function test() {
  describe("JSSTE CORE", function () {
    core_state();
    core_render();
    core_scriptexec();
    core_includeJSSTE();
  });
}

module.exports = test;
