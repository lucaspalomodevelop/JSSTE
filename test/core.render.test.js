let libfolder = "../src/";
let JSSTE_Engine = require(libfolder);

function test() {
  describe("render", function () {
    it(" should return Hallo! -> JSON as Page", function () {
      let template = "<[VAR]>!";
      let page = { VAR: "Hallo" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("Hallo!");
    });

    it("should return Hallo! -> String as Page", function () {
      let template = "<[VAR]>!";
      let page = '{"VAR":"Hallo"}';
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("Hallo!");
    });

    it("should retrun one var two times", function () {
      let template = "<[VAR]><[VAR]>!";
      let page = { VAR: "Hallo" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("HalloHallo!");
    });

    it("should retrun EXAMPLE EXAMPLE", function () {
      let template = "<[VAR]> <[VAR]>";
      let page = { VAR: "EXAMPLE" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("EXAMPLE EXAMPLE");
    });

    it("should delete useless var", function () {
      let template = "<[VAR]><[VAR2]><[VAR]>";
      let page = { VAR: "EXAMPLE" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("EXAMPLEEXAMPLE");
    });


    it("should not rendern _VAR_", function () {
      let template = "<[_VAR_]>";
      let page = { VAR: "EXAMPLE" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("");
    });

    it("should not rendern _var_", function () {
      let template = "<[_var_]>";
      let page = { var: "EXAMPLE" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("");
    });

    it("should not rendern _var2_", function () {
      let template = "<[_var2_]>";
      let page = { var2: "EXAMPLE" };
      let result = JSSTE_Engine.render(page, template);
      result.should.equal("");
    });

    it("should render in href a tag", function () {
      let template = "<a href='<[LINK]>'></a>";
      let page = { LINK: "www.nodejs.com" };
      let result = JSSTE_Engine.render(page, template);

      result.should.equal("<a href='www.nodejs.com'></a>");
    });

    it("should render a tag", function () {
      let template = "<a href='<[LINK]>'><[VAR]></a>";
      let page = { VAR: "EXAMPLE", LINK: "www.nodejs.com" };
      let result = JSSTE_Engine.render(page, template);

      result.should.equal("<a href='www.nodejs.com'>EXAMPLE</a>");
    });
  });
}

module.exports = test;
