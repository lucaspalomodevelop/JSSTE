const JSTE = require("../");
var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

describe('test VARS', function() {
    it('should retrun EXAMPLE', function() {
        var result = JSTE.render("{'VAR':'EXAMPLE'}","<[VAR]>");
       // var result = "EXAMPLE";
        console.log("result =" +result);
        result.should.equal("EXAMPLE");
      });
  });

console.log()