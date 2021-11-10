let libfolder = "../src/";
let jsonmerger = require(libfolder + "jsonMerger");

function test() {
  describe("Test JsonMerger", function () {
    it("should return merged json", function () {
      let json1 = { a: "wert1" };
      let json2 = { b: "wert2" };

      let result = jsonmerger.mergeJson(json1, json2);
      result = JSON.stringify(result);
      result.should.equal(JSON.stringify({ a: "wert1", b: "wert2" }));
    });

    it("should return merged json override b", function () {
      let json1 = { a: "wert1", b: "wert3" };
      let json2 = { b: "wert2" };

      let result = jsonmerger.mergeJson(json1, json2);
      result = JSON.stringify(result);
      result.should.equal(JSON.stringify({ a: "wert1", b: "wert2" }));
    });

    it("should merge 3 JSONs ", function () {
      let json1 = { a: "wert1" };
      let json2 = { b: "wert2" };
      let json3 = { c: "wert3" };

      let result = jsonmerger.mergeJsons(json1, json2, json3);
      result = JSON.stringify(result);
      result.should.equal(
        JSON.stringify({ a: "wert1", b: "wert2", c: "wert3" })
      );
    });
    it("should merge 4 JSONs", function () {
      let json1 = { a: "wert1" };
      let json2 = { b: "wert2" };
      let json3 = { c: "wert3" };
      let json4 = { d: "wert4" };

      let result = jsonmerger.mergeJsons(json1, json2, json3, json4);
      result = JSON.stringify(result);
      result.should.equal(
        JSON.stringify({ a: "wert1", b: "wert2", c: "wert3", d: "wert4" })
      );
    });

    it("should merge 2 jsons with array", function () {
      let json1 = { a: ["a", "b"] };
      let json2 = { a: ["c"], b: "hallo" };

      let result = jsonmerger.mergeJsons(json1, json2);
      result = JSON.stringify(result);
      result.should.equal(JSON.stringify({ a: ["a", "b", "c"], b: "hallo" }));
    });

    it("should merge 2 jsons with array only in secound json", function () {
      let json1 = {};
      let json2 = { a: ["c"], b: "hallo" };

      let result = jsonmerger.mergeJsons(json1, json2);
      result = JSON.stringify(result);
      result.should.equal(JSON.stringify({ a: ["c"], b: "hallo" }));
    });

    it("should merge 2 jsons with array with only in first json", function () {
      let json1 = { a: ["a", "b"] };
      let json2 = { b: "hallo" };

      let result = jsonmerger.mergeJsons(json1, json2);
      result = JSON.stringify(result);
      result.should.equal(JSON.stringify({ a: ["a", "b"], b: "hallo" }));
    });
  });
}

module.exports = test;
