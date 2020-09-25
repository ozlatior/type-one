/*
 * Number Types
 *
 * The base class NumberType provides generic number functionality; further specialized classes
 * are derived from this to implement float and integer types
 *
 * By default, numbers are comparable, but not enumerable, searcheable or fragmentable and have
 * no `absent value`
 */

const DataType = require("../data_type.js");
const Primitive = require("../primitive.js");

class NumberTypeError extends DataType.DataTypeError {

	constructor(message) {
		super(message);
		this.name = "NumberTypeError";
	}

}

class NumberType extends DataType {

	/*
	 * Defines a number type
	 * - `min`: minimum value for this number type (infinity by default)
	 * - `max`: maximum value for this number type (infinity by default)
	 * - `mul`: step value (increment) for this number (not implemented)
	 */
	constructor (min, max, mul) {
		super ();
		this.type = "number";
		this.primitive = Primitive.NUMBER;
		this.properties.comparable = true;
		this.min = min !== undefined ? min : -Infinity;
		this.max = max !== undefined ? max : +Infinity;
		this.mul = mul !== undefined ? mul : 1;	// TODO: not implemented
	}

	/*
	 * Getters for specific properties
	 */
	getMin () {
		return this.min;
	}

	getMax () {
		return this.max;
	}

	getMul () {
		return this.mul;
	}

	/*
	 * Returns the default value for a number, which is zero
	 */
	getDefault () {
		return 0;
	}

	/*
	 * Checks that the value is indeed a number and that it's in range
	 */
	isValid (value) {
		if (!super.isValid(value))
			return false;
		if (value < this.min || value > this.max)
			return false;
		return true;
	}

	assert (value) {
		super.assert(value);
		if (value < this.min || value > this.max)
			throw new NumberTypeError("Value " + value + " out of range (" + this.min + ", " + this.max + ")");
	}

	/*
	 * Checks that input string is a correct number representation
	 */
	isValidString (value) {
		if (parseFloat(value) + "" !== value)
			return false;
		return this.isValid(parseFloat(value));
	}

	/*
	 * Puts the value within range for this number type, if out of range
	 * it returns the nearest interval limit; if a string is passed it is
	 * converted to a number
	 */
	makeValid (value) {
		value = parseFloat(value);
		if (value < this.min)
			value = this.min;
		if (value > this.max)
			value = this.max;
		return value;
	}

	fromString (value, makeValid) {
		let ret = parseFloat(value);
		try {
			this.assert(ret);
		}
		catch (e) {
			if (makeValid)
				return this.makeValid(ret);
			throw e;
		}
		return ret;
	}

	toString (value) {
		this.assert(value);
		return value + "";
	}

	serialize () {
		return super.serialize() + " " + JSON.stringify({ min: this.min, max: this.max, mul: this.mul });
	}

}

// TODO: proper float implementation
// The problem is nodejs and javascript represent all floats in the same way, so float, double, real etc
// don't really make sense
// For now we only use different names for these values so we can use them in the db structure

class FloatType extends NumberType {
}

class FLOAT extends FloatType {

	constructor (max) {
		super(max ? -max : undefined, max);
		this.name = "FLOAT";
	}

}

class REAL extends FloatType {

	constructor (max) {
		super(max ? -max : undefined, max);
		this.name = "REAL";
	}

}

class DOUBLE extends FloatType {

	constructor (max) {
		super(max ? -max : undefined, max);
		this.name = "DOUBLE";
	}

}

class DECIMAL extends FloatType {

	constructor (max) {
		super(max ? -max : undefined, max);
		this.name = "DECIMAL";
	}

}

// TODO: proper int implementation (maybe use a library?)
// The problem is nodejs and javascript represent all numbers as floats, so 32/64/128 bit integers
// are not really possible
// For now we only use different names for these values so we can use them in the db structure

class IntegerType extends NumberType {

	isValid (value) {
		if (!super.isValid(value))
			return false;
		if (value !== parseInt(value))
			return false;
		return true;
	}

	assert (value) {
		super.assert(value);
		if (value !== parseInt(value))
			throw new NumberTypeError("Value " + value + " not a valid integer");
	}

	makeValid (value) {
		value = parseInt(value);
		if (value < this.min)
			value = this.min;
		if (value > this.max)
			value = this.max;
		return value;
	}

	fromString (value, makeValid) {
		let ret = parseInt(value);
		try {
			this.assert(ret);
		}
		catch (e) {
			if (makeValid)
				return this.makeValid(ret);
			throw e;
		}
		return ret;
	}

}

class INTEGER extends IntegerType {

	constructor (max) {
		super(max ? -max : undefined, max);
		this.name = "INTEGER";
	}

}

class BIGINT extends INTEGER {

	constructor (max) {
		super (max);
		this.name = "BIGINT";
	}

}

class SMALLINT extends INTEGER {

	constructor (max) {
		super (max);
		this.name = "SMALLINT";
	}

}

class TINYINT extends INTEGER {

	constructor (max) {
		super (max);
		this.name = "TINYINT";
	}

}

NumberType.NumberTypeError = NumberTypeError;

NumberType.FloatType = FloatType;
NumberType.IntegerType = IntegerType;

NumberType.FLOAT = FLOAT;
NumberType.DOUBLE = DOUBLE;
NumberType.REAL = REAL;
NumberType.DECIMAL = DECIMAL;

NumberType.INTEGER = INTEGER;
NumberType.BIGINT = BIGINT;
NumberType.SMALLINT = SMALLINT;
NumberType.TINYINT = TINYINT;

module.exports = NumberType;
