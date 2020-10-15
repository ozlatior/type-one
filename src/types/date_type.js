/*
 * Date Types
 *
 * The base class DateType provides generic date and time functionality;
 * Classes derived from this class are:
 * - DATETIME, for representing date and time
 * - DATEONLY, for representing just the date
 * - TIMEONLY, for representing just the time of day
 * For string conversion, Date class format is used. For all date conversions, Date objects are used.
 *
 * By default, dates are comparabl but not searchable, enumerable or fragmentable.
 * no `absent value`
 */

// TODO: Extend this to handle arrays

const DataType = require("../data_type.js");
const Primitive = require("../primitive.js");

class DateTypeError extends DataType.DataTypeError {

	constructor(message) {
		super(message);
		this.name = "DateTypeError";
	}

}

class DateType extends DataType {

	/*
	 * Defines a date type
	 */
	constructor (date, time) {
		super ();
		this.type = "date";
		this.primitive = Primitive.DATE;
		this.properties.comparable = true;
		this.properties.searchable = true;
		this.date = date === undefined ? true : date;
		this.time = time === undefined ? true : time;
	}

	/*
	 * Getters for date type properties date and time (boolean)
	 */
	hasDate () {
		return this.date;
	}

	hasTime () {
		return this.time;
	};

	/*
	 * Returns the default value for a date, which is the current date
	 */
	getDefault () {
		return new Date();
	}

	/*
	 * Checks that the value is a valid date string
	 */
	isValidString (value) {
		let d = new Date(value);
		return !(isNaN(d.getTime()));
	}

	/*
	 * This doesn't really work for dates, so we'll just return null instead
	 */
	makeValid (value) {
		return null;
	}

	fromString (value, makeValid) {
		if (this.isValidString(value))
			return new Date(value);
		else {
			if (makeValid)
				return null;
			throw new DateTypeError("Value " + value + " not a valid date representation");
		}
	}

	toString (value) {
		this.assert(value);
		return value.toISOString();
	}

	serialize () {
		return super.serialize() + " " + JSON.stringify({ date: this.date, time: this.time });
	}

}

class DATETIME extends DateType {

	constructor () {
		super ();
		this.name = "DATETIME";
	}

}

class DATEONLY extends DateType {

	constructor () {
		super (true, false);
		this.name = "DATEONLY";
	}

}

class TIMEONLY extends DateType {

	constructor () {
		super (false, true);
		this.name = "TIMEONLY";
	}

}

DateType.DateTypeError = DateTypeError;

DateType.DATETIME = DATETIME;
DateType.DATEONLY = DATEONLY;
DateType.TIMEONLY = TIMEONLY;

module.exports = DateType;
