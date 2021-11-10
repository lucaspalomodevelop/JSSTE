let libfolder = "../src";
let scriptExecuter = require(libfolder + "/scriptExecuter");
function test() {
  describe("test scriptexecuter", () => {
    it("should return script result 'HalloWelt'", function () {
      let script = "return 'HalloWelt';";

      let result = scriptExecuter(script);
      result.should.equal("HalloWelt");
    });
    it("should return script result out()", function () {
      let script = "out('HalloWelt')";

      let result = scriptExecuter(script);
      result.should.equal("HalloWelt");
    });

    it("should return script result outLine()", function () {
      let script = "outLine('HalloWelt'); outLine('HalloWelt')";

      let result = scriptExecuter(script);
      result.should.equal("\nHalloWelt\nHalloWelt");
    });

    // it("should return script result outLine()", function () {
    //   let script = "Helloworld";

    //   let result = scriptExecuter(script);
    //   result.should.equal("HalloWelt");
    // });
  });
}
module.exports = test;
