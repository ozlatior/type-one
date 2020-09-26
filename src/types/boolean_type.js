/*
 * Boolean Types
 *
 * The base class BooleanType provides generic boolean functionality; BOOLEAN class is derived from
 * this and further specialized boolean classes can be derived if required
 * For string conversion, the following values are true-ish:
 *   1, t, true, yes (case insensitive)
 * And the following values are false-ish:
 *   0, f, false, no (case insensitive)
 *
 * By default, booleans are enumerable but not comparable, searcheable or fragmentable and have
 * no `absent value`
 */

const DataType = require("../data_type.js");
const Primitive = require("../primitive.js");

class BooleanTypeError extends DataType.DataTypeError {

	constructor(message) {
		super(message);
		this.name = "BooleanTypeError";
	}

}

class BooleanType extends DataType {

	/*
	 * Defines a boolean type
	 */
	constructor () {
		super ();
		this.type = "boolean";
		this.primitive = Primitive.BOOLEAN;
		this.properties.enumerable = true;
		this.values = [ "0", "1", "f", "t", "false", "true", "no", "yes" ];
	}

	/*
	 * Returns the default value for a boolean, which is `false`
	 */
	getDefault () {
		return false;
	}

	/*
	 * Checks that the value is a valid boolean string
	 */
	isValidString (value) {
		return this.values.indexOf(value.toLowerCase()) !== -1;
	}

	/*
	 * Turns a value into a valid boolean, eg 0 -> false, 1 -> true
	 */
	makeValid (value) {
		return !!value;
	}

	fromString (value, makeValid) {
		value = value.toLowerCase();
		switch (value) {
			case "0":
			case "f":
			case "false":
			case "no":
				return false;
			case "1":
			case "t":
			case "true":
			case "yes":
				return true;
		}
		if (makeValid)
			return false;
		throw new BooleanTypeError("Value " + value + " not a valid boolean representation");
	}

	toString (value) {
		this.assert(value);
		return !!value + "";
	}

}

class BOOLEAN extends BooleanType {

	constructor () {
		super ();
		this.name = "BOOLEAN";
	}

}

BooleanType.BooleanTypeError = BooleanTypeError;

BooleanType.BOOLEAN = BOOLEAN;

module.exports = BooleanType;
