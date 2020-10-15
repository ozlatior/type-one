const assert = require("assert");

const Primitive = require("../index.js").Primitive;

const B = Primitive.BOOLEAN;
const N = Primitive.NUMBER;
const S = Primitive.STRING;
const O = Primitive.OBJECT;
const D = Primitive.DATE;

describe("Primitive tests", () => {

	describe("Boolean primitive", () => {

		it("Validates boolean types", () => {
			assert.equal(B.isValid(true), true);
			assert.equal(B.isValid(false), true);
		});

		it("Does not validate non-boolean types", () => {
			assert.equal(B.isValid(1), false);
			assert.equal(B.isValid(), false);
			assert.equal(B.isValid(0), false);
			assert.equal(B.isValid(null), false);
			assert.equal(B.isValid("true"), false);
			assert.equal(B.isValid([ true ]), false);
		});

		it("Validates strings successfully", () => {
			assert.equal(B.isValidString("0"), true);
			assert.equal(B.isValidString("1"), true);
			assert.equal(B.isValidString("t"), true);
			assert.equal(B.isValidString("f"), true);
			assert.equal(B.isValidString("true"), true);
			assert.equal(B.isValidString("false"), true);
			assert.equal(B.isValidString("yes"), true);
			assert.equal(B.isValidString("no"), true);
			assert.equal(B.isValidString("T"), true);
			assert.equal(B.isValidString("F"), true);
			assert.equal(B.isValidString("True"), true);
			assert.equal(B.isValidString("FALSE"), true);
			assert.equal(B.isValidString("YES"), true);
			assert.equal(B.isValidString("nO"), true);
			assert.equal(B.isValidString(""), false);
			assert.equal(B.isValidString("bla"), false);
		});

		it("Converts strings successfully", () => {
			assert.equal(B.fromString("1"), true);
			assert.equal(B.fromString("t"), true);
			assert.equal(B.fromString("T"), true);
			assert.equal(B.fromString("true"), true);
			assert.equal(B.fromString("TRUE"), true);
			assert.equal(B.fromString("yes"), true);
			assert.equal(B.fromString("Yes"), true);
			assert.equal(B.fromString("0"), false);
			assert.equal(B.fromString("f"), false);
			assert.equal(B.fromString("F"), false);
			assert.equal(B.fromString("false"), false);
			assert.equal(B.fromString("bla"), false);
		});

	});

	describe("Number primitive", () => {

		it("Validates number types", () => {
			assert.equal(N.isValid(0), true);
			assert.equal(N.isValid(14), true);
			assert.equal(N.isValid(-2.73), true);
		});

		it("Does not validate non-number types", () => {
			assert.equal(N.isValid("1"), false);
			assert.equal(N.isValid(), false);
			assert.equal(N.isValid(true), false);
			assert.equal(N.isValid(null), false);
			assert.equal(N.isValid([ 1 ]), false);
		});

		it("Validates strings successfully", () => {
			assert.equal(N.isValidString("0"), true);
			assert.equal(N.isValidString("1"), true);
			assert.equal(N.isValidString("2.73"), true);
			assert.equal(N.isValidString("-2.4"), true);
		});

		it("Converts strings successfully", () => {
			assert.equal(N.fromString("0"), 0);
			assert.equal(N.fromString("1"), 1);
			assert.equal(N.fromString("-2.73"), -2.73);
		});

	});

	describe("String primitive", () => {

		it("Validates string types", () => {
			assert.equal(S.isValid("0"), true);
			assert.equal(S.isValid("abcdef"), true);
			assert.equal(S.isValid(""), true);
		});

		it("Does not validate non-string types", () => {
			assert.equal(S.isValid(1), false);
			assert.equal(S.isValid(), false);
			assert.equal(S.isValid(true), false);
			assert.equal(S.isValid(null), false);
			assert.equal(S.isValid([ "abc" ]), false);
		});

		it("Validates strings successfully", () => {
			assert.equal(S.isValidString(""), true);
			assert.equal(S.isValidString("abc eafdsf bdfr4ew"), true);
			assert.equal(S.isValidString("something() that $#@#%TEGREFA goe t9ew"), true);
			assert.equal(S.isValidString("\n\0\1\2\3\4"), true);
		});

		it("Converts strings successfully", () => {
			assert.equal(S.fromString("0"), "0");
			assert.equal(S.fromString("abc"), "abc");
			assert.equal(S.fromString(""), "");
		});

	});

	describe("Object primitive", () => {

		it("Validates object types", () => {
			assert.equal(O.isValid([ 0, 1, 2 ]), true);
			assert.equal(O.isValid({ a: 12, b: { c: 3, d: null }}), true);
			assert.equal(O.isValid({}), true);
		});

		it("Does not validate non-object types", () => {
			assert.equal(O.isValid(1), false);
			assert.equal(O.isValid(), false);
			assert.equal(O.isValid(true), false);
//	TODO?:	assert.equal(O.isValid(null), false);
			assert.equal(O.isValid("{a: 3}"), false);
		});

		it("Validates strings successfully", () => {
			assert.equal(O.isValidString("{}"), true);
			assert.equal(O.isValidString("{ a: 3 }"), true);
			assert.equal(O.isValidString("[ 0, 1, 2 ]"), true);
			assert.equal(O.isValidString("{ a: 12, b: { c: 3, d: null }}"), true);
		});

		it("Converts strings successfully", () => {
			assert.deepEqual(O.fromString("{ \"a\": 3 }"), { a: 3 });
			assert.deepEqual(
				O.fromString("{ \"a\": 12, \"b\": { \"c\": 3, \"d\": null }}"),
				{ a: 12, b: { c: 3, d: null }});
			assert.deepEqual(O.fromString("[ 1, 2, 3 ]"), [ 1, 2, 3 ]);
			assert.deepEqual(O.fromString("{}"), {});
		});

	});

	describe("Date primitive", () => {

		it("Validates date types", () => {
			assert.equal(D.isValid(new Date()), true);
			assert.equal(D.isValid(new Date(0)), true);
			assert.equal(D.isValid(new Date("1986-10-16 20:00:00")), true);
		});

		it("Does not validate non-date types", () => {
			assert.equal(D.isValid(1), false);
			assert.equal(D.isValid(), false);
			assert.equal(D.isValid(true), false);
			assert.equal(D.isValid("1990-01-01 15:00:00"), false);
		});

		it("Validates strings successfully", () => {
			assert.equal(D.isValidString("2020-06-07 14:13:43"), true);
			assert.equal(D.isValidString("2020-06-07 14:13:43.132"), true);
		});

		it("Converts strings successfully", () => {
			assert.deepEqual(D.fromString("2020-06-07 14:13:43"), new Date("2020-06-07 14:13:43"));
			assert.deepEqual(D.fromString("2020-06-07 14:13:43.132"), new Date("2020-06-07 14:13:43.132"));
		});

	});

});
