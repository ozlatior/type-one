/*
 * Primitive objects
 *
 * Primitive objects are used for basic validation and conversion of strings
 * Methods provided:
 *
 * - fromString: converts a string to primitive value (eg '1' to number 1)
 * - isValid: checks that a value is of the primitive type (eg '1' is a string, 1 is a number)
 * - isValidString: checks that a string is a valid representation of the primitive
 *   (eg '1' is a valid number, 'a' is not)
 */

const Primitive = {
	BOOLEAN: {
		name: "BOOLEAN",
		fromString: (str) => [ "1", "t", "true", "yes" ].indexOf(str.toLowerCase()) !== -1,
		isValid: (a) => typeof(a) === "boolean",
		isValidString: (a) => [ "0", "1", "t", "f", "true", "false", "yes", "no" ].indexOf(a.toLowerCase()) !== -1
	},
	NUMBER: {
		name: "NUMBER",
		fromString: (str) => parseFloat(str),
		isValid: (a) => typeof(a) === "number",
		isValidString: (a) => true // TODO: proper validation
	},
	STRING: {
		name: "STRING",
		fromString: (str) => str,
		isValid: (a) => typeof(a) === "string",
		isValidString: (a) => true
	},
	OBJECT: {
		name: "OBJECT",
		fromString: (str) => JSON.parse(str),
		isValid: (a) => typeof(a) === "object",
		isValidString: (a) => true
	},
	DATE: {
		name: "DATE",
		fromString: (str) => new Date(str),
		isValid: (a) => (typeof(a) === "object") && (a instanceof Date),
		isValidString: (a) => true
	}
};

module.exports = Primitive;
