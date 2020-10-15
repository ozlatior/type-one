const assert = require("assert");

const DateType = require("../../src/types/date_type.js");

const DATETIME = DateType.DATETIME;
const DATEONLY = DateType.DATEONLY;
const TIMEONLY = DateType.TIMEONLY;

describe("DateType tests", () => {

	describe("DateType base class", () => {

		it ("Creates DateType with default values", () => {
			let nt = new DateType();
			assert.equal(nt.type, "date");
			assert.equal(nt.getPrimitive().name, "DATE");
			assert.equal(nt.serialize().indexOf("DateType/undefined/date"), 0);
		});

		it ("Returns default value of current date", () => {
			let nt = new DateType();
			assert.deepEqual(nt.getDefault(), new Date());
		});

		it ("Validates datetime type", () => {
			let nt = new DateType();
			assert.equal(nt.isValid(new Date()), true);
			assert.equal(nt.isValid(new Date(0)), true);
			assert.equal(nt.isValid(null), false);
			assert.equal(nt.isValid({}), false);
			assert.equal(nt.isValid([]), false);
			assert.equal(nt.isValid({a: 2, b: { c: true }}), false);
			assert.equal(nt.isValid(false), false);
			assert.equal(nt.isValid("2020-05-04 12:23:43"), false);
			assert.equal(nt.isValid("2020-10-12T05:58:35.917Z"), false);
			assert.equal(nt.isValid(1), false);
		});

		it ("Validates datetime string", () => {
			let nt = new DateType();
			assert.equal(nt.isValidString("32"), true);
			assert.equal(nt.isValidString("2020-05-04 12:23:43"), true);
			assert.equal(nt.isValidString("2020-10-12T05:58:35.917Z"), true);
			assert.equal(nt.isValidString("{}"), false);
			assert.equal(nt.isValidString("[]"), false);
			assert.equal(nt.isValidString('{ "a": 23, "b": { "c": [ 1, 3 ] } }'), false);
			assert.equal(nt.isValidString("null"), false);
			assert.equal(nt.isValidString("no"), false);
			assert.equal(nt.isValidString("ya"), false);
			assert.equal(nt.isValidString("true"), false);
			assert.equal(nt.isValidString("'bla'"), false);
		});

		it ("Makes datetime valid (converts from non-datetime to null)", () => {
			let nt = new DateType();
			assert.equal(nt.makeValid(0), null);
			assert.equal(nt.makeValid('32'), null);
			assert.equal(nt.makeValid('{}'), null);
		});

		it ("Converts from string", () => {
			let nt = new DateType();
			assert.deepEqual(nt.fromString("32"), new Date("32"));
			assert.deepEqual(nt.fromString("2020-05-04 12:23:43"), new Date("2020-05-04 12:23:43"));
			assert.deepEqual(nt.fromString("2020-10-12T05:58:35.917Z"), new Date("2020-10-12T05:58:35.917Z"));
		});

		it ("Converts to string", () => {
			let nt = new DateType();
			assert.equal(nt.toString(new Date(0)), "1970-01-01T00:00:00.000Z");
			assert.equal(nt.toString(new Date("2020-04-03 19:33:22")), "2020-04-03T11:33:22.000Z");
		});

	});

	describe("DATETIME type class", () => {

		it ("Creates DATETIME with default values", () => {
			let nt = new DATETIME();
			assert.equal(nt.type, "date");
			assert.equal(nt.getPrimitive().name, "DATE");
			assert.equal(nt.hasDate(), true);
			assert.equal(nt.hasTime(), true);
			assert.equal(nt.serialize().indexOf("DATETIME/DATETIME/date"), 0);
		});

	});

	describe("DATEONLY type class", () => {

		it ("Creates DATEONLY with default values", () => {
			let nt = new DATEONLY();
			assert.equal(nt.type, "date");
			assert.equal(nt.getPrimitive().name, "DATE");
			assert.equal(nt.hasDate(), true);
			assert.equal(nt.hasTime(), false);
			assert.equal(nt.serialize().indexOf("DATEONLY/DATEONLY/date"), 0);
		});

	});

	describe("TIMEONLY type class", () => {

		it ("Creates TIMEONLY with default values", () => {
			let nt = new TIMEONLY();
			assert.equal(nt.type, "date");
			assert.equal(nt.getPrimitive().name, "DATE");
			assert.equal(nt.hasDate(), false);
			assert.equal(nt.hasTime(), true);
			assert.equal(nt.serialize().indexOf("TIMEONLY/TIMEONLY/date"), 0);
		});

	});

});
