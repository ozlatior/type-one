/*
 * DataType base class
 *
 * The DataType class provides methods for describing and validating values of a specific type
 * Extend the class and override the methods to define specific types
 *
 * Object fields
 * - type: a string value that names the type (eg 'number' or 'string')
 * - primtive: the primitive object this types uses
 * - properties - these have default values for each type but can be set depending on the scope of the
 *   application; these are relevant in defining the behavior of the application in things such as searching,
 *   sorting, listing or filtering properties of a set of items.
 *   - enumerable: values of this type are enumerable, they are from a limited set (for example,
 *     strings describing properties of an item such as colors)
 *   - comparable: values of this type are comparable, they can be put on a linear scale, for example
 *     numbers or dates
 *   - searchable: values of this type are searchable - they are part of a set of properties of an
 *     item that can be conglomerated into a single 'description' a user could search to, for instance
 *     an item description, name or owner might be searchable, but maybe a product code would not be
 *     searchable even if it's also a string
 *   - fragmentable: values of this type can have operators such as "beginsWith" or "contains"
 *   - absentValue: defines a value that makes this property "absent", this is scope specific
 */

class DataTypeError extends Error {

	constructor (message) {
		super(message);
		this.name = "DataTypeError";
	}

}

class DataType {

	constructor () {
		this.type = null;
		this.primitive = null;
		this.properties = {
			enumerable: false,
			comparable: false,
			searchable: false,
			fragmentable: false,
			absentValue: null
		};
	}

	/*
	 * Applies properties from input object to the properties object of this `DataType`
	 * `p` - properties object, the fields of this object will be copied into the `DataType`
	 */
	applyProperties (p) {
		for (let i in p)
			this.properties[i] = p[i];
	}

	/*
	 * Returns `true` if enumerable; if values are enumerable, they are from a limited set (for example,
	 * strings describing properties of an item such as colors)
	 */
	isEnumerable () {
		return this.properties.enumerable;
	}

	/*
	 * Returns `true` if comparable; if values are comparable, they can be put on a linear scale,
	 * for example numbers or dates
	 */
	isComparable () {
		return this.properties.comparable;
	}

	/*
	 * Returns `true` if searchable: if values are searchable, they are part of a set of properties of an
	 * item that can be conglomerated into a single 'description' a user could search to, for instance
	 * an item description, name or owner might be searchable, but maybe a product code would not be
	 * searchable even if it's also a string
	 */
	isSearchable () {
		return this.properties.searchable;
	}

	/*
	 * Returns `true` if fragmentable: values of this type can have operators such as
	 * `beginsWith` or `contains`
	 */
	isFragmentable () {
		return this.properties.fragmentable;
	}

	/*
	 * Returns `true` if it has absent value defined: defines a value that makes this property "absent",
	 * this is scope specific; for instance `white` could be absent value for a color, but in other cases
	 * it could be `transparent`
	 */
	hasAbsentValue () {
		return (this.properties.absentValue !== null);
	}

	/*
	 * Returns the primitive object associated with this DataType
	 */
	getPrimitive () {
		return this.primitive;
	}

	/*
	 * Returns the default value for this DataType; by default, it returns `null` but it can be overriden
	 * to return a specific value for each type, for instance empty string for string types or the number
	 * zero for numbers
	 */
	getDefault () {
		return null;
	}

	/*
	 * Check that a value is valid for this data type; for instance, an integer number would only be a
	 * valid value for integer data types
	 */
	isValid (value) {
		if (this.primitive !== null)
			return this.primitive.isValid(value);
		return false;
	}

	/*
	 * Check that a value is valid and throw an exception if it's not
	 */
	assert(value) {
		if (this.primitive !== null && !this.primitive.isValid(value))
			throw new DataTypeError(this.primitive.name + " primitive assertion failed for value " + value);
	}

	/*
	 * Check that a value equals the absent value for this data type, if any
	 * Returns false if no absent value has been defined for this datatype
	 */
	isAbsent (value) {
		return (this.properties.absentValue !== null) && (this.properties.absentValue === value);
	}

	/*
	 * Check that a string is a correct representation of a value for this data type, for example if a
	 * string contains a correct number for a number type
	 */
	isValidString (value) {
		return null;
	}

	/*
	 * Return a valid value based on an input value; this could, for instance, return the range limit
	 * for numbers that are out of range, or return a truncated string for a string that's too long
	 */
	makeValid (value) {
		return null;
	}

	/*
	 * Return the value contained in a string for this DataType, for instance convert a string
	 * representing a number to the number value, eg "100" -> 100
	 * Use the `makeValid` to call the makeValid method on the result, otherwise an exception will
	 * be thrown in case of invalid input
	 */
	fromString (value, makeValid) {
		return null;
	}

	/*
	 * Convert a value of this data type to string, eg 100 -> "100"
	 */
	toString (value) {
		return null;
	}

	/*
	 * Return a serialized form for this data type that can be used to recreate the data type using
	 * a parser; should return something like `STRING/STRING/string {extra properties}`
	 */
	serialize () {
		return this.constructor.name + "/" + this.name + "/" + this.type;
	}

}

DataType.DataTypeError = DataTypeError;

module.exports = DataType;
