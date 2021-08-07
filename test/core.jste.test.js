
let  core_render = require("./core.render.test");
let  core_scriptexec = require("./scriptexec.jste.test");

function test()
{
    describe("JSTE CORE", function () {
      
      core_render();
      core_scriptexec();
      });
}

module.exports = test;