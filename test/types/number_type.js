const assert = require("assert");

const NumberType = require("../../src/types/number_type.js");

const FloatType = NumberType.FloatType;
const IntegerType = NumberType.IntegerType;

const FLOAT = NumberType.FLOAT;
const DOUBLE = NumberType.DOUBLE;
const REAL = NumberType.REAL;
const DECIMAL = NumberType.DECIMAL;

const INTEGER = NumberType.INTEGER;
const BIGINT = NumberType.BIGINT;
const SMALLINT = NumberType.SMALLINT;
const TINYINT = NumberType.TINYINT;

describe("NumberType tests", () => {

	describe("NumberType base class", () => {

		it ("Creates NumberType with default values", () => {
			let nt = new NumberType();
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -Infinity);
			assert.equal(nt.getMax(), Infinity);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("NumberType/undefined/number"), 0);
		});

		it ("Creates NumberType with specific values", () => {
			let nt = new NumberType(0, 100, 10);
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), 0);
			assert.equal(nt.getMax(), 100);
			assert.equal(nt.getMul(), 10);
			assert.equal(nt.serialize().indexOf("NumberType/undefined/number"), 0);
		});

		it ("Returns default value of zero", () => {
			let nt = new NumberType();
			assert.equal(nt.getDefault(), 0);
		});

		it ("Validates number type", () => {
			let nt = new NumberType();
			assert.equal(nt.isValid(-42), true);
			assert.equal(nt.isValid(0), true);
			assert.equal(nt.isValid(123.43), true);
			assert.equal(nt.isValid("123"), false);
			assert.equal(nt.isValid(true), false);
		});

		it ("Validates number range", () => {
			let nt = new NumberType(0, 10);
			assert.equal(nt.isValid(0), true);
			assert.equal(nt.isValid(6.3), true);
			assert.equal(nt.isValid(10), true);
			assert.equal(nt.isValid(-1), false);
			assert.equal(nt.isValid(32), false);
		});

		it ("Validates number string", () => {
			let nt = new NumberType(0, 10);
			assert.equal(nt.isValidString("0"), true);
			assert.equal(nt.isValidString("6.3"), true);
			assert.equal(nt.isValidString("10"), true);
			assert.equal(nt.isValidString("-1"), false);
			assert.equal(nt.isValidString("32"), false);
			assert.equal(nt.isValidString("2a"), false);
			assert.equal(nt.isValidString("blsafgds"), false);
		});

		it ("Makes number valid (brings within range)", () => {
			let nt = new NumberType(0, 10);
			assert.equal(nt.makeValid(0), 0);
			assert.equal(nt.makeValid(6.3), 6.3);
			assert.equal(nt.makeValid(10), 10);
			assert.equal(nt.makeValid(-1), 0);
			assert.equal(nt.makeValid(32), 10);
		});

		it ("Converts from string", () => {
			let nt = new NumberType(0, 10);
			assert.equal(nt.fromString("0"), 0);
			assert.equal(nt.fromString("6.3"), 6.3);
			assert.equal(nt.fromString("10"), 10);
			assert.equal(nt.fromString("-1", true), 0);
			assert.equal(nt.fromString("32", true), 10);
		});

		it ("Converts to string", () => {
			let nt = new NumberType(0, 10);
			assert.equal(nt.toString(0), "0");
			assert.equal(nt.toString(6.3), "6.3");
			assert.equal(nt.toString(10), "10");
		});

	});

	describe("FloatType base class", () => {

		it ("Creates FloatType with default values", () => {
			let nt = new FloatType();
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -Infinity);
			assert.equal(nt.getMax(), Infinity);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("FloatType/undefined/number"), 0);
		});

		it ("Creates FloatType with specific values", () => {
			let nt = new FloatType(0, 100, 10);
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), 0);
			assert.equal(nt.getMax(), 100);
			assert.equal(nt.getMul(), 10);
			assert.equal(nt.serialize().indexOf("FloatType/undefined/number"), 0);
		});

	});

	describe("IntegerType base class", () => {

		it ("Creates IntegerType with default values", () => {
			let nt = new IntegerType();
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -Infinity);
			assert.equal(nt.getMax(), Infinity);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("IntegerType/undefined/number"), 0);
		});

		it ("Creates IntegerType with specific values", () => {
			let nt = new IntegerType(0, 100);
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), 0);
			assert.equal(nt.getMax(), 100);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("IntegerType/undefined/number"), 0);
		});

		it ("Returns default value of zero", () => {
			let nt = new IntegerType();
			assert.equal(nt.getDefault(), 0);
		});

		it ("Validates number type", () => {
			let nt = new IntegerType();
			assert.equal(nt.isValid(-42), true);
			assert.equal(nt.isValid(0), true);
			assert.equal(nt.isValid(123.43), false);
			assert.equal(nt.isValid("123"), false);
			assert.equal(nt.isValid(true), false);
		});

		it ("Validates number range", () => {
			let nt = new IntegerType(-10, 10);
			assert.equal(nt.isValid(0), true);
			assert.equal(nt.isValid(10), true);
			assert.equal(nt.isValid(-1), true);
			assert.equal(nt.isValid(-15), false);
			assert.equal(nt.isValid(32), false);
		});

		it ("Validates number string", () => {
			let nt = new IntegerType(-10, 10);
			assert.equal(nt.isValidString("0"), true);
			assert.equal(nt.isValidString("10"), true);
			assert.equal(nt.isValidString("-1"), true);
			assert.equal(nt.isValidString("6.3"), false);
			assert.equal(nt.isValidString("32"), false);
			assert.equal(nt.isValidString("2a"), false);
			assert.equal(nt.isValidString("blsafgds"), false);
		});

		it ("Makes number valid (brings within range)", () => {
			let nt = new IntegerType(-5, 10);
			assert.equal(nt.makeValid(0), 0);
			assert.equal(nt.makeValid(6.3), 6);
			assert.equal(nt.makeValid(10), 10);
			assert.equal(nt.makeValid(-15), -5);
			assert.equal(nt.makeValid(32), 10);
		});

		it ("Converts from string", () => {
			let nt = new IntegerType(-10, 10);
			assert.equal(nt.fromString("0"), 0);
			assert.equal(nt.fromString("6.3"), 6);
			assert.equal(nt.fromString("10"), 10);
			assert.equal(nt.fromString("-16", true), -10);
			assert.equal(nt.fromString("32", true), 10);
		});

		it ("Converts to string", () => {
			let nt = new IntegerType(-10, 10);
			assert.equal(nt.toString(0), "0");
			assert.equal(nt.toString(-6), "-6");
			assert.equal(nt.toString(10), "10");
		});

	});
	
	describe("FLOAT type class", () => {

		it ("Creates FLOAT with default values", () => {
			let nt = new FLOAT();
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -Infinity);
			assert.equal(nt.getMax(), Infinity);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("FLOAT/FLOAT/number"), 0);
		});

		it ("Creates FLOAT with specific values", () => {
			let nt = new FLOAT(100);
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -100);
			assert.equal(nt.getMax(), 100);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("FLOAT/FLOAT/number"), 0);
		});

	});

	describe("REAL type class", () => {

		it ("Creates REAL with default values", () => {
			let nt = new REAL();
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -Infinity);
			assert.equal(nt.getMax(), Infinity);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("REAL/REAL/number"), 0);
		});

		it ("Creates REAL with specific values", () => {
			let nt = new REAL(100);
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -100);
			assert.equal(nt.getMax(), 100);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("REAL/REAL/number"), 0);
		});

	});

	describe("DOUBLE type class", () => {

		it ("Creates DOUBLE with default values", () => {
			let nt = new DOUBLE();
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -Infinity);
			assert.equal(nt.getMax(), Infinity);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("DOUBLE/DOUBLE/number"), 0);
		});

		it ("Creates DOUBLE with specific values", () => {
			let nt = new DOUBLE(100);
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -100);
			assert.equal(nt.getMax(), 100);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("DOUBLE/DOUBLE/number"), 0);
		});

	});

	describe("DECIMAL type class", () => {

		it ("Creates DECIMAL with default values", () => {
			let nt = new DECIMAL();
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -Infinity);
			assert.equal(nt.getMax(), Infinity);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("DECIMAL/DECIMAL/number"), 0);
		});

		it ("Creates DECIMAL with specific values", () => {
			let nt = new DECIMAL(100);
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -100);
			assert.equal(nt.getMax(), 100);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("DECIMAL/DECIMAL/number"), 0);
		});

	});

	describe("INTEGER type class", () => {

		it ("Creates INTEGER with default values", () => {
			let nt = new INTEGER();
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -Infinity);
			assert.equal(nt.getMax(), Infinity);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("INTEGER/INTEGER/number"), 0);
		});

		it ("Creates INTEGER with specific values", () => {
			let nt = new INTEGER(100);
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -100);
			assert.equal(nt.getMax(), 100);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("INTEGER/INTEGER/number"), 0);
		});

	});

	describe("BIGINT type class", () => {

		it ("Creates BIGINT with default values", () => {
			let nt = new BIGINT();
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -Infinity);
			assert.equal(nt.getMax(), Infinity);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("BIGINT/BIGINT/number"), 0);
		});

		it ("Creates BIGINT with specific values", () => {
			let nt = new BIGINT(100);
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -100);
			assert.equal(nt.getMax(), 100);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("BIGINT/BIGINT/number"), 0);
		});

	});

	describe("SMALLINT type class", () => {

		it ("Creates SMALLINT with default values", () => {
			let nt = new SMALLINT();
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -Infinity);
			assert.equal(nt.getMax(), Infinity);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("SMALLINT/SMALLINT/number"), 0);
		});

		it ("Creates SMALLINT with specific values", () => {
			let nt = new SMALLINT(100);
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -100);
			assert.equal(nt.getMax(), 100);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("SMALLINT/SMALLINT/number"), 0);
		});

	});

	describe("TINYINT type class", () => {

		it ("Creates TINYINT with default values", () => {
			let nt = new TINYINT();
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -Infinity);
			assert.equal(nt.getMax(), Infinity);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("TINYINT/TINYINT/number"), 0);
		});

		it ("Creates TINYINT with specific values", () => {
			let nt = new TINYINT(100);
			assert.equal(nt.type, "number");
			assert.equal(nt.getPrimitive().name, "NUMBER");
			assert.equal(nt.getMin(), -100);
			assert.equal(nt.getMax(), 100);
			assert.equal(nt.getMul(), 1);
			assert.equal(nt.serialize().indexOf("TINYINT/TINYINT/number"), 0);
		});

	});

});
