require("chai").should();
const {assert} =  require("chai");
let test_jsonMerger = require("./jsonMerger.test");
let test_core = require("./core.jsste.test");

describe("Core Tests", function () {
  test_jsonMerger();

  test_core();
});
