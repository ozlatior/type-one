/*
 * Index file for type-one package
 * Imports and exposes all external classes and objects
 */

const Primitive = require("./src/primitive.js");
const DataType = require("./src/data_type.js");

const NumberType = require("./src/types/number_type.js");
const BooleanType = require("./src/types/boolean_type.js");
const StringType = require("./src/types/string_type.js");
const ObjectType = require("./src/types/object_type.js");
const DateType = require("./src/types/date_type.js");

/* Primitive types BOOLEAN, NUMBER, STRING, OBJECT, DATE */
module.exports.Primitive = Primitive;

/* DataType base class and error class */
module.exports.DataType = DataType;
module.exports.DataTypeError = DataType.DataTypeError;

/* NumberType base class */
module.exports.NumberType = NumberType;
module.exports.NumberTypeError = NumberType.NumberTypeError;
module.exports.FloatType = NumberType.FloatType;
module.exports.IntegerType = NumberType.IntegerType;

/* BooleanType base class */
module.exports.BooleanType = BooleanType;
module.exports.BooleanTypeError = BooleanType.BooleanTypeError;

/* StringType base class */
module.exports.StringType = StringType;
module.exports.StringTypeError = StringType.StringTypeError;

/* ObjectType base class */
module.exports.ObjectType = ObjectType;
module.exports.ObjectTypeError = ObjectType.ObjectTypeError;

/* DateType base class */
module.exports.DateType = DateType;
module.exports.DateTypeError = DateType.DateTypeError;

/* Number type shortcuts to derived classes */
module.exports.FLOAT = NumberType.FLOAT;
module.exports.DOUBLE = NumberType.DOUBLE;
module.exports.REAL = NumberType.REAL;
module.exports.DECIMAL = NumberType.DECIMAL;
module.exports.INTEGER = NumberType.INTEGER;
module.exports.BIGINT = NumberType.BIGINT;
module.exports.SMALLINT = NumberType.SMALLINT;
module.exports.TINYINT = NumberType.TINYINT;

/* Boolean type shortcuts to derived classes */
module.exports.BOOLEAN = BooleanType.BOOLEAN;

/* String type shortcuts to derived classes */
module.exports.STRING = StringType.STRING;
module.exports.BINARY = StringType.BINARY;
module.exports.TEXT = StringType.TEXT;
module.exports.TINYTEXT = StringType.TINYTEXT;
module.exports.CITEXT = StringType.CITEXT;
module.exports.BLOB = StringType.BLOB;
module.exports.TINYBLOB = StringType.TINYBLOB;
module.exports.UUID = StringType.UUID;
module.exports.CIDR = StringType.CIDR;
module.exports.INET = StringType.INET;
module.exports.MACADDR = StringType.MACADDR;

/* Object type shortcuts to derived classes */
module.exports.OBJECT = ObjectType.OBJECT;

/* Date type shortcuts to derived classes */
module.exports.DATETIME = DateType.DATETIME;
module.exports.DATEONLY = DateType.DATEONLY;
module.exports.TIMEONLY = DateType.TIMEONLY;
