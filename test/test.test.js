require("chai").should();
let test_jsonMerger = require("./jsonMerger.test");
let test_core = require("./core.jste.test");


describe("Core Tests", function () {

  test_jsonMerger();

  test_core();

});
