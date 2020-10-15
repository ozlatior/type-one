const assert = require("assert");

const T1 = require("../../index.js");

const BooleanType = T1.BooleanType;
const BOOLEAN = T1.BOOLEAN;

describe("BooleanType tests", () => {

	describe("BooleanType base class", () => {

		it ("Creates BooleanType with default values", () => {
			let nt = new BooleanType();
			assert.equal(nt.type, "boolean");
			assert.equal(nt.getPrimitive().name, "BOOLEAN");
			assert.equal(nt.serialize().indexOf("BooleanType/undefined/boolean"), 0);
		});

		it ("Returns default value of false", () => {
			let nt = new BooleanType();
			assert.equal(nt.getDefault(), false);
		});

		it ("Validates boolean type", () => {
			let nt = new BooleanType();
			assert.equal(nt.isValid(false), true);
			assert.equal(nt.isValid(true), true);
			assert.equal(nt.isValid("123"), false);
			assert.equal(nt.isValid(1), false);
			assert.equal(nt.isValid([ true ]), false);
		});

		it ("Validates boolean string", () => {
			let nt = new BooleanType();
			assert.equal(nt.isValidString("0"), true);
			assert.equal(nt.isValidString("1"), true);
			assert.equal(nt.isValidString("True"), true);
			assert.equal(nt.isValidString("t"), true);
			assert.equal(nt.isValidString("YES"), true);
			assert.equal(nt.isValidString("FAlse"), true);
			assert.equal(nt.isValidString("F"), true);
			assert.equal(nt.isValidString("no"), true);
			assert.equal(nt.isValidString("ya"), false);
			assert.equal(nt.isValidString("ya"), false);
			assert.equal(nt.isValidString("32"), false);
			assert.equal(nt.isValidString("bla"), false);
		});

		it ("Makes boolean valid (converts from non-boolean to boolean)", () => {
			let nt = new BooleanType();
			assert.equal(nt.makeValid(0), false);
			assert.equal(nt.makeValid(32), true);
			assert.equal(nt.makeValid(1), true);
			assert.equal(nt.makeValid(-1), true);
		});

		it ("Converts from string", () => {
			let nt = new BooleanType();
			assert.equal(nt.fromString("false"), false);
			assert.equal(nt.fromString("T"), true);
			assert.equal(nt.fromString("0"), false);
		});

		it ("Converts to string", () => {
			let nt = new BooleanType();
			assert.equal(nt.toString(false), "false");
			assert.equal(nt.toString(true), "true");
		});

	});

	describe("BOOLEAN type class", () => {

		it ("Creates BOOLEAN with default values", () => {
			let nt = new BOOLEAN();
			assert.equal(nt.type, "boolean");
			assert.equal(nt.getPrimitive().name, "BOOLEAN");
			assert.equal(nt.serialize().indexOf("BOOLEAN/BOOLEAN/boolean"), 0);
		});

	});

});
