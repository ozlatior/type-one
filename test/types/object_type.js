const assert = require("assert");

const ObjectType = require("../../src/types/object_type.js");

const OBJECT = ObjectType.OBJECT;

describe("ObjectType tests", () => {

	describe("ObjectType base class", () => {

		it ("Creates ObjectType with default values", () => {
			let nt = new ObjectType();
			assert.equal(nt.type, "object");
			assert.equal(nt.getPrimitive().name, "OBJECT");
			assert.equal(nt.serialize().indexOf("ObjectType/undefined/object"), 0);
		});

		it ("Returns default value of empty object", () => {
			let nt = new ObjectType();
			assert.deepEqual(nt.getDefault(), {});
		});

		it ("Validates object type", () => {
			let nt = new ObjectType();
			assert.equal(nt.isValid(null), true);
			assert.equal(nt.isValid({}), true);
			assert.equal(nt.isValid([]), true);
			assert.equal(nt.isValid({a: 2, b: { c: true }}), true);
			assert.equal(nt.isValid(false), false);
			assert.equal(nt.isValid("{}"), false);
			assert.equal(nt.isValid("123"), false);
			assert.equal(nt.isValid(1), false);
		});

		it ("Validates object string", () => {
			let nt = new ObjectType();
			assert.equal(nt.isValidString("{}"), true);
			assert.equal(nt.isValidString("[]"), true);
			assert.equal(nt.isValidString('{ "a": 23, "b": { "c": [ 1, 3 ] } }'), true);
			assert.equal(nt.isValidString("null"), true);
			assert.equal(nt.isValidString("no"), false);
			assert.equal(nt.isValidString("ya"), false);
			assert.equal(nt.isValidString("true"), false);
			assert.equal(nt.isValidString("32"), false);
			assert.equal(nt.isValidString("'bla'"), false);
		});

		it ("Makes object valid (converts from non-object to null)", () => {
			let nt = new ObjectType();
			assert.equal(nt.makeValid(0), null);
			assert.equal(nt.makeValid('32'), null);
			assert.equal(nt.makeValid('{}'), null);
		});

		it ("Converts from string", () => {
			let nt = new ObjectType();
			assert.equal(nt.fromString("null"), null);
			assert.deepEqual(nt.fromString("{}"), {});
			assert.deepEqual(nt.fromString('{ "a": 3, "b": [ true ] }'), { a: 3, b: [ true ] });
		});

		it ("Converts to string", () => {
			let nt = new ObjectType();
			assert.equal(nt.toString(null), "null");
			assert.equal(nt.toString({}), "{}");
			assert.equal(nt.toString({ a: 3, b: [ true ] }), '{"a":3,"b":[true]}');
		});

	});

	describe("OBJECT type class", () => {

		it ("Creates OBJECT with default values", () => {
			let nt = new OBJECT();
			assert.equal(nt.type, "object");
			assert.equal(nt.getPrimitive().name, "OBJECT");
			assert.equal(nt.serialize().indexOf("OBJECT/OBJECT/object"), 0);
		});

	});

});
