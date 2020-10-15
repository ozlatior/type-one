/*
 * String Types
 *
 * The base class StringType provides generic string functionality; further specialized classes
 * are derived from this to implement float and integer types
 *
 * By default, strings are enumerable, searcheable or fragmentable and comparable but have
 * no `absent value`
 */

const uuid = require("uuid/v4");

const DataType = require("../data_type.js");
const Primitive = require("../primitive.js");

const UUID_LEN = 128;
const CIDR_LEN = 128;
const INET_LEN = 128;
const MACA_LEN = 128;
const BASE_LEN = 255;
const TINY_LEN = 255;
const TEXT_LEN = 65535;
const BLOB_LEN = 65535;

class StringTypeError extends DataType.DataTypeError {

	constructor(message) {
		super(message);
		this.name = "StringTypeError";
	}

}

class StringType extends DataType {

	/*
	 * Defines a string type
	 * - len: length of the string in characters
	 * - encoding: encoding of the string, by default utf8
	 */
	constructor (len, encoding) {
		super ();
		this.type = "string";
		this.primitive = Primitive.STRING;
		this.properties.comparable = true;
		this.properties.enumerable = true;
		this.properties.searchable = true;
		this.properties.fragmentable = true;
		this.maxLen = len ? len : StringType.BASE_LEN;
		this.encoding = encoding;	// TODO: implement binary and other encoding
	}

	/*
	 * Getters for specific properties
	 */
	getMaxLen () {
		return this.maxLen;
	}

	getEncoding () {
		return this.encoding;
	}

	/*
	 * Returns the default value for a string, which is empty string
	 */
	getDefault () {
		return "";
	}

	/*
	 * Check that input is a string and its length is within range
	 */
	isValid (value) {
		if (!super.isValid(value))
			return false;
		return value.length <= this.maxLen;
	}

	assert (value) {
		super.assert(value);
		if (value.length > this.maxLen)
			throw new StringTypeError("String length " + value.length + " out of range (max=" + this.maxLen + ")");
	}

	/*
	 * Check that input is a string and its length is within range
	 */
	isValidString (value) {
		return this.isValid(value);
	}

	/*
	 * Truncates the input string so it's within range
	 */
	makeValid (value) {
		return (value + "").slice(0, this.maxLen);
	}

	fromString (value, makeValid) {
		try {
			this.assert(value);
		}
		catch (e) {
			if (makeValid)
				return this.makeValid(value);
			throw e;
		}
		return value;
	}

	/*
	 * Since these functions normally convert something else to strings and the other way around,
	 * for string types they do the same thing with the exception that fromString allows for the
	 * `makeValid` argument
	 */
	toString (value) {
		return this.fromString(value);
	}

	serialize () {
		return super.serialize() + " " + JSON.stringify({ maxLen: this.maxLen, encoding: this.encoding });
	}

}

StringType.UUID_LEN = UUID_LEN;
StringType.CIDR_LEN = CIDR_LEN;
StringType.INET_LEN = INET_LEN;
StringType.MACA_LEN = MACA_LEN;
StringType.BASE_LEN = BASE_LEN;
StringType.TEXT_LEN = TEXT_LEN;
StringType.TINY_LEN = TINY_LEN;
StringType.BLOB_LEN = BLOB_LEN;

class STRING extends StringType {

	constructor (len) {
		super (len);
		this.name = "STRING";
	}

}

class BINARY extends StringType {

	// TODO: implement this
	constructor (len) {
		super (len);
		this.name = "BINARY";
	}

}

class TEXT extends StringType {

	constructor (tiny) {
		super (StringType.TEXT_LEN);
	}

}

class TINYTEXT extends TEXT {

	constructor () {
		super(StringType.TINY_LEN);
	}

}

class CITEXT extends TEXT {

	constructor () {
		super(StringType.TEXT_LEN);
		this.name = "CITEXT";
	}

}

class BLOB extends StringType {

	constructor (tiny) {
		// call with binary encoding
		super (StringType.BLOB_LEN);
	}

}

class TINYBLOB extends BLOB {

	constructor () {
		super(StringType.TINY_LEN);
	}

}

class UUID extends StringType {

	constructor () {
		super (StringType.UUID_LEN);
		this.name = "UUID";
	}

	getDefault () {
		return uuid();
	}

}

class CIDR extends StringType {

	constructor () {
		super (StringType.CIDR_LEN);
		this.name = "CIDR";
	}

}

class INET extends StringType {

	constructor () {
		super (StringType.INET_LEN);
		this.name = "INET";
	}

}

class MACADDR extends StringType {

	constructor () {
		super (StringType.MACA_LEN);
		this.name = "MACADDR";
	}

}

StringType.StringTypeError = StringTypeError;

StringType.STRING = STRING;
StringType.BINARY = BINARY;

StringType.TEXT = TEXT;
StringType.TINYTEXT = TINYTEXT;
StringType.CITEXT = CITEXT;
StringType.BLOB = BLOB;
StringType.TINYBLOB = TINYBLOB;

StringType.UUID = UUID;
StringType.CIDR = CIDR;
StringType.INET = INET;
StringType.MACADDR = MACADDR;

module.exports = StringType;
