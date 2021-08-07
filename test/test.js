const JSSTE = require("../src");
const engine = require("../src/engine");
var assert = require("assert");
var expect = require("chai").expect;
var should = require("chai").should();

describe("test var rendering", function () {
  it("should retrun EXAMPLE", function () {
    var result = JSSTE.render({ VAR: "EXAMPLE" }, "<[VAR]>");
    result.should.equal("EXAMPLE");
  });
  it("should retrun EXAMPLEEXAMPLE", function () {
    var result = JSSTE.render({ VAR: "EXAMPLE" }, "<[VAR]><[VAR]>");
    result.should.equal("EXAMPLEEXAMPLE");
  });
  it("should retrun EXAMPLE EXAMPLE", function () {
    var result = JSSTE.render({ VAR: "EXAMPLE" }, "<[VAR]> <[VAR]>");
    result.should.equal("EXAMPLE EXAMPLE");
  });
  it("should delete useless var", function () {
    var result = JSSTE.render({ VAR: "EXAMPLE" }, "<[VAR]><[VAR2]><[VAR]>");
    result.should.equal("EXAMPLEEXAMPLE");
  });
  it("should render in HTML tag", function () {
    var result = JSSTE.render({ VAR: "EXAMPLE" }, "<html><[VAR]></html>");
    result.should.equal("<html>EXAMPLE</html>");
  });
  it("should render in href a tag", function () {
    var result = JSSTE.render({ LINK: "www.nodejs.com" }, "<a href='<[LINK]>'></a>");
    result.should.equal("<a href='www.nodejs.com'></a>");
  });

  it("should render a tag", function () {
    var result = JSSTE.render({VAR: "EXAMPLE", LINK: "www.nodejs.com" }, "<a href='<[LINK]>'><[VAR]></a>");
    result.should.equal("<a href='www.nodejs.com'>EXAMPLE</a>");
  });
});

describe("test Varnames",function (){
  it("should render varname: VAR", function () {
    var result = JSSTE.render({ VAR: "EXAMPLE" }, "<[VAR]>");
    result.should.equal("EXAMPLE");
  });
  it("should render varname: Var", function () {
    var result = JSSTE.render({ Var: "EXAMPLE" }, "<[Var]>");
    result.should.equal("EXAMPLE");
  });
  it("should render varname: vAr", function () {
    var result = JSSTE.render({ vAr: "EXAMPLE" }, "<[vAr]>");
    result.should.equal("EXAMPLE");
  });
  it("should render varname: vaR", function () {
    var result = JSSTE.render({ vaR: "EXAMPLE" }, "<[vaR]>");
    result.should.equal("EXAMPLE");
  });
  it("should render varname: var", function () {
    var result = JSSTE.render({ var: "EXAMPLE" }, "<[var]>");
    result.should.equal("EXAMPLE");
  });
  it("should not rende _VAR_", function () {
    var result = JSSTE.render({ _VAR_: "EXAMPLE" }, "<[_VAR_]>");
    result.should.equal("<[_VAR_]>");
  });
  it("should not render _var_", function () {
    var result = JSSTE.render({ _var_: "EXAMPLE" }, "<[_var_]>");
    result.should.equal("<[_var_]>");
  });
  it("should impliment _STYLE_", function () {
    var result = JSSTE.render({ _STYLES_: ["EXAMPLE","EXAMPLE2"] }, "<html><head><title>Example App</title></head></html>");
    
    //result.should.equal("<[_var_]>");
  });
})


console.log();
