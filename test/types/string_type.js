const assert = require("assert");

const T1 = require("../../index.js");

const StringType = T1.StringType;

const STRING = T1.STRING;
const BINARY = T1.BINARY;
const TEXT = T1.TEXT;
const TINYTEXT = T1.TINYTEXT;
const CITEXT = T1.CITEXT;
const BLOB = T1.BLOB;
const TINYBLOB = T1.TINYBLOB;
const UUID = T1.UUID;
const CIDR = T1.CIDR;
const INET = T1.INET;
const MACADDR = T1.MACADDR;

describe("StringType tests", () => {

	describe("StringType base class", () => {

		it ("Creates StringType with default values", () => {
			let nt = new StringType();
			assert.equal(nt.type, "string");
			assert.equal(nt.getPrimitive().name, "STRING");
			assert.equal(nt.getMaxLen(), 255);
			assert.equal(nt.serialize().indexOf("StringType/undefined/string"), 0);
		});

		it ("Creates StringType with specific values", () => {
			let nt = new StringType(30);
			assert.equal(nt.type, "string");
			assert.equal(nt.getPrimitive().name, "STRING");
			assert.equal(nt.getMaxLen(), 30);
			assert.equal(nt.serialize().indexOf("StringType/undefined/string"), 0);
		});

		it ("Returns default value of empty string", () => {
			let nt = new StringType();
			assert.equal(nt.getDefault(), "");
		});

		it ("Validates string type", () => {
			let nt = new StringType();
			assert.equal(nt.isValid(""), true);
			assert.equal(nt.isValid("blabla"), true);
			assert.equal(nt.isValid("12345"), true);
			assert.equal(nt.isValid(123), false);
			assert.equal(nt.isValid([ "123" ]), false);
		});

		it ("Validates string range", () => {
			let nt = new StringType(10);
			assert.equal(nt.isValid(""), true);
			assert.equal(nt.isValid("1234567890"), true);
			assert.equal(nt.isValid("12345678901"), false);
		});

		it ("Makes string valid (brings length within range)", () => {
			let nt = new StringType(10);
			assert.equal(nt.makeValid(""), "");
			assert.equal(nt.makeValid("1234567890"), "1234567890");
			assert.equal(nt.makeValid("12345678901"), "1234567890");
		});

		it ("Converts from string", () => {
			let nt = new StringType(10);
			assert.equal(nt.fromString(""), "");
			assert.equal(nt.fromString("1234567890"), "1234567890");
			assert.equal(nt.fromString("12345678901", true), "1234567890");
		});

		it ("Converts to string", () => {
			let nt = new StringType(10);
			assert.equal(nt.toString(""), "");
			assert.equal(nt.toString("1234567890"), "1234567890");
		});

	});

	describe("STRING type class", () => {

		it ("Creates STRING with default values", () => {
			let nt = new STRING();
			assert.equal(nt.type, "string");
			assert.equal(nt.getPrimitive().name, "STRING");
			assert.equal(nt.getMaxLen(), 255);
			assert.equal(nt.serialize().indexOf("STRING/STRING/string"), 0);
		});

		it ("Creates BIGINT with specific values", () => {
			let nt = new STRING(10);
			assert.equal(nt.type, "string");
			assert.equal(nt.getPrimitive().name, "STRING");
			assert.equal(nt.getMaxLen(), 10);
			assert.equal(nt.serialize().indexOf("STRING/STRING/string"), 0);
		});

	});

});
