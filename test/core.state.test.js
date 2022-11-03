let libfolder = "../src/";
let JSSTE_Engine = require(libfolder);
const { assert } = require("chai");

function test() {
  describe("test State", function () {
    it(" set stateFunction", function () {
      JSSTE_Engine.setStateFunction(({ status, statusMSG }) => {});
      assert.typeOf(JSSTE_Engine.setStateFunction, "function");
    });
    it(" is setState a function", function () {
        assert.typeOf(JSSTE_Engine.setState,"function")
      });
  });
}

module.exports = test;
