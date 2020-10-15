/*
 * Object Types
 *
 * The base class ObjectType provides generic object functionality; OBJECT class is derived from
 * this and further specialized object classes can be derived if required
 * For string conversion, JSON format is used.
 *
 * By default, objects are enumerable but not comparable, searcheable or fragmentable and have
 * no `absent value`
 */

// TODO: Extend this to handle arrays

const DataType = require("../data_type.js");
const Primitive = require("../primitive.js");

class ObjectTypeError extends DataType.DataTypeError {

	constructor(message) {
		super(message);
		this.name = "ObjectTypeError";
	}

}

class ObjectType extends DataType {

	/*
	 * Defines an object type
	 */
	constructor () {
		super ();
		this.type = "object";
		this.primitive = Primitive.OBJECT;
		this.properties.enumerable = true;
	}

	/*
	 * Returns the default value for an object, which is an empty object
	 */
	getDefault () {
		return {};
	}

	/*
	 * Checks that the value is a valid object string
	 */
	isValidString (value) {
		try {
			let r = JSON.parse(value);
			return this.isValid(r);
		}
		catch (e) {
			return false;
		}
	}

	/*
	 * This doesn't really work for objects, so we'll just return null instead
	 */
	makeValid (value) {
		return null;
	}

	fromString (value, makeValid) {
		try {
			return JSON.parse(value);
		}
		catch (e) {
			if (makeValid)
				return null;
			throw new ObjectTypeError("Value " + value + " not a valid object representation");
		}
	}

	toString (value) {
		this.assert(value);
		return JSON.stringify(value);
	}

}

class OBJECT extends ObjectType {

	constructor () {
		super ();
		this.name = "OBJECT";
	}

}

ObjectType.ObjectTypeError = ObjectTypeError;

ObjectType.OBJECT = OBJECT;

module.exports = ObjectType;
