---
Type One - Data Type Management Library for NodeJS
---

Defines type classes and validators for nodejs/javascript. The purpose is to
be able to use the types to define models, schemas, APIs, validators etc

A Data Type class is a class that can be used to describe, generate and validate data
types. It works on JS object types, so it can be seen as a schema validator as well.

Data Types can be extended to implement custom types for user convenience.


# How to use

Simply require the library to access all types and base classes:

	const types = require("type-one");

	const stringType = new types.STRING();
	stringType.isValid("foobar"); // returns true
	stringType.isValid(42);       // returns false
	stringType.isEnumerable();    // returns true
	stringType.isSearchable();    // returns true

Types loosely follow types described by `postgresql` and `sequelize` for easy integration.


# Defined objects

The library exports base classes and type classes. You should only use type classes to define
type objects, but either can be used to extend and define new type classes.


## Type class methods and properties

Type classes are derived from the `DataType` class, so they will all provide these methods.
A full documentation is available in the `documentation` folder of the library,
however you can find a quick reference list here.

**Object fields and properties**

	Field              Description
	------------------ --------------------------------------------------------------------------------------------------
	type               a string value that names the type (eg 'number' or 'string')
	primtive           the primitive object this types uses
	properties         these have default values for each type but can be set depending on the scope of the application;
    |                  these are relevant in defining the behavior of the application in things such as searching,
	|                  sorting, listing or filtering properties of a set of items.
	+-.enumerable      values of this type are enumerable, they are from a limited set (for example,
	|                  strings describing properties of an item such as colors)
	+-.comparable      values of this type are comparable, they can be put on a linear scale,
    |                  for example numbers or dates
	+-.searchable      values of this type are searchable - they are part of a set of properties of an
	|                  item that can be conglomerated into a single 'description' a user could search to, for instance
	|                  an item description, name or owner might be searchable, but maybe a product code would not be
	|                  searchable even if it's also a string
	+-.fragmentable    values of this type can have operators such as "beginsWith" or "contains"
	+-.absentValue     defines a value that makes this property "absent", this is use-case specific

**Methods**

	Method                 Description
	---------------------- ----------------------------------------------------------------------------------------------
	constructor()          Constructor arguments vary from type to type and further describe the object
	applyProperties(p)     Apply properties defined in the object p to this type object (enumerable, etc)
	isEnumerable()         Returns true if this type represents an enumerable type
	isComparable()         Returns true if this type represents a comparable type
	isSearchable()         Returns true if this type represents a searchable type
	isFragmentable()       Returns true if this type represents a fragmentable type
	hasAbsentValue()       Returns true if this type defines an absent value
	getPrimitive()         Returns the primitive object associated with this data type
	getDefault()           Returns the default value for this data type, for instance zero for a number
	isValid(value)         Returns true if the value is valid for this data type, false otherwise
	assert(value)          Throws an error if the value is not valid for this data type, does nothing otherwise
	isAbsent(value)        Returns true if the value is the defined absent value for this data type (if any)
	isValidString(str)     Returns true if the string represents a valid representation of a value of this data type
	                       eg. "42" is a valid string representation of a number
	makeValid(value)       Attempts to make a valid value out of a value, for instance 42.2 -> 42 for INTEGER types
	fromString(str, makeValid)
	                       Returns a value based on the string "str", for instance fromString("42") -> 42
	                       if makeValid is set to true, it attempts to convert the value to a valid value for this type
	toString(value)        Converts a value to its string representation, for instance 42 -> "42"
	serialize()            Returns a descriptor string for this type, which can be used to replicate it somewhere else


## Defined types

These types are already provided by the library.
They are designed to closely follow types from `sequlize` and `postgresql`.

A lot of these types are identical, meaning that the user has the libery of picking the constructor arguments. The
names are meant to provide the liberty of defining multiple types depending on the implementation.

	                                   --Properties--
	Type Class        Constructor args E C S F absent Default Description
	----------------- ---------------- - - - - ------ ------- -----------------------------------------------------------
	** NumberType, primitive: NUMBER **
	FLOAT             max                x     (none)    0    Any real number between -max and max
	DOUBLE            max                x     (none)    0    Any real number between -max and max
	REAL              max                x     (none)    0    Any real number between -max and max
	DECIMAL           max                x     (none)    0    Any real number between -max and max
	INTEGER           max                x     (none)    0    Any integer number between -max and max
	BIGINT            max                x     (none)    0    Any integer number between -max and max
	SMALLINT          max                x     (none)    0    Any integer number between -max and max
	TINYINT           max                x     (none)    0    Any integer number between -max and max
	** BooleanType **
	BOOLEAN           (none)           x       (none)  false  True or false, however fromString() accepts values such as
	                                                          "0", "f", "no", "1", "t", "yes", case insensitive
	** StringType **
	STRING            len              x x x x (none)   ""    Any utf8 string up to len characters
	BINARY            len              x x x x (none)   ""    Any binary string up to len characters (not implemented)
	TEXT              (none)           x x x x (none)   ""    Any utf8 string of length up to StringType.TEXT_LEN (65535)
	TINYTEXT          (none)           x x x x (none)   ""    Any utf8 string of length up to StringType.TINY_LEN (255)
	CITEXT            (none)           x x x x (none)   ""    Same as TEXT but case-insensitive
	BLOB              (none)           x x x x (none)   ""    Any binary string, length up to StringType.BLOB_LEN (65535)
	TINYBLOB          (none)           x x x x (none)   ""    Any binary string, length up to StringType.TINY_LEN (255)
	UUID              (none)           x x x x (none) uuid()  128 characters UUID, default value is a random uuid
	CIDR              (none)           x x x x (none)   ""    Max 128 characters CIDR address
	INET              (none)           x x x x (none)   ""    Max 128 characters INET address
	MACADDR           (none)           x x x x (none)   ""    Max 128 characters MAC address
	** ObjectType **
	OBJECT            (none)           x       (none)   {}    Any object, JSON format is used for string conversion
	** DateType **
	DATETIME          (none)             x x   (none)  now()  Stores both date and time
	DATEONLY          (none)             x x   (none)  now()  Stores date only
	TIMEONLY          (none)             x x   (none)  now()  Stores time of day only


To define a type object, use the constructor as such:

	const INTEGER = require("type-one").INTEGER;

	const intType = new INTEGER(100); // any int between -100 and 100

	intType.getDefault();        // returns zero
	intType.isValid(123);        // returns false (out of range)
	intType.isValid("42");       // returns false (not a number instance)
	intType.isValid(12.3);       // returns false (not an integer)
	intType.assert(12);          // nothing happens (12 is a valid int)
	intType.isValidString("42"); // returns true
	intType.fromString("42");    // returns 42
	intType.toString(42);        // returns "42"
	intType.serialize();         // returns 'INTEGER/INTEGER/number {"min":-100,"max":100,"mul":1}'


To define a new type, extend from one of the type classes or one of the base types. The following base types are defined
and can be used to extend from:

	                                   --Properties--
	Type Class        Constructor args E C S F absent Default Description
	----------------- ---------------- - - - - ------ ------- -----------------------------------------------------------
	FloatType         min, max           x     (none)    0    Any real number between min and max
	IntegerType       min, max           x     (none)    0    Any integer number between min and max
	BooleanType       (none)           x       (none)  false  True or false, however fromString() accepts values such as
	                                                          "0", "f", "no", "1", "t", "yes", case insensitive
	StringType        len, encoding    x x x x (none)   ""    Any string up to len characters
	ObjectType        (none)           x       (none)   {}    Any object, JSON format is used for string conversion
	DateType          date, time         x x   (none)  now()  Stores date if `date` is true and/or time if `time` is true


# Complete list of exported objects

This list is purposely built using "require" statements to provide examples on how to import the items.

	/* Primitive types BOOLEAN, NUMBER, STRING, OBJECT, DATE */
	const Primitive =            require("type-one").Primitive;

	/* DataType base class and error class */
	const DataType =             require("type-one").DataType;
	const DataTypeError =        require("type-one").DataType.DataTypeError;

	/* NumberType base class */
	const NumberType =           require("type-one").NumberType;
	const NumberTypeError =      require("type-one").NumberTypeError;
	const NumberTypeError =      require("type-one").NumberType.NumberTypeError;
	const FloatType =            require("type-one").FloatType;
	const FloatType =            require("type-one").NumberType.FloatType;
	const IntegerType =          require("type-one").IntegerType;
	const IntegerType =          require("type-one").NumberType.IntegerType;

	/* BooleanType base class */
	const BooleanType =          require("type-one").BooleanType;
	const BooleanTypeError =     require("type-one").BooleanTypeError;
	const BooleanTypeError =     require("type-one").BooleanType.BooleanTypeError;

	/* StringType base class */
	const StringType =           require("type-one").StringType;
	const StringTypeError =      require("type-one").StringTypeError;
	const StringTypeError =      require("type-one").StringType.StringTypeError;

	/* ObjectType base class */
	const ObjectType =           require("type-one").ObjectType;
	const ObjectTypeError =      require("type-one").ObjectTypeError;
	const ObjectTypeError =      require("type-one").ObjectType.ObjectTypeError;

	/* DateType base class */
	const DateType =             require("type-one").DateType;
	const DateTypeError =        require("type-one").DateTypeError;
	const DateTypeError =        require("type-one").DateType.DateTypeError;

	/* Number type shortcuts to derived classes, all of these also accessible via NumberType */
	const FLOAT =                require("type-one").FLOAT;
	const DOUBLE =               require("type-one").DOUBLE;
	const REAL =                 require("type-one").REAL;
	const DECIMAL =              require("type-one").DECIMAL;
	const INTEGER =              require("type-one").INTEGER;
	const BIGINT =               require("type-one").BIGINT;
	const SMALLINT =             require("type-one").SMALLINT;
	const TINYINT =              require("type-one").TINYINT;
	// or via NumberType, for instance
	const FLOAT =                require("type-one").NumberType.FLOAT;

	/* Boolean type shortcuts to derived classes */
	const BOOLEAN =              require("type-one").BOOLEAN;
	const BOOLEAN =              require("type-one").BooleanType.BOOLEAN;

	/* String type shortcuts to derived classes, all of these also accessible via StringType */
	const STRING =               require("type-one").STRING;
	const BINARY =               require("type-one").BINARY;
	const TEXT =                 require("type-one").TEXT;
	const TINYTEXT =             require("type-one").TINYTEXT;
	const CITEXT =               require("type-one").CITEXT;
	const BLOB =                 require("type-one").BLOB;
	const TINYBLOB =             require("type-one").TINYBLOB;
	const UUID =                 require("type-one").UUID;
	const CIDR =                 require("type-one").CIDR;
	const INET =                 require("type-one").INET;
	const MACADDR =              require("type-one").MACADDR;
	// or via StringType, for instance
	const STRING =               require("type-one").StringType.STRING;

	/* Object type shortcuts to derived classes */
	const OBJECT =               require("type-one").OBJECT;
	const OBJECT =               require("type-one").ObjectType.OBJECT;

	/* Date type shortcuts to derived classes, all of these also accessible via DateType */
	const DATETIME =             require("type-one").DATETIME;
	const DATEONLY =             require("type-one").DATEONLY;
	const TIMEONLY =             require("type-one").TIMEONLY;
	// or via DateType, for instance
	const DATETIME =             require("type-one").DateType.DATETIME;
