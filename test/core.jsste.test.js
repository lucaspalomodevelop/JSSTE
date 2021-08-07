
let  core_render = require("./core.render.test");
let  core_scriptexec = require("./scriptexec.jsste.test");

function test()
{
    describe("JSSTE CORE", function () {
      
      core_render();
      core_scriptexec();
      });
}

module.exports = test;