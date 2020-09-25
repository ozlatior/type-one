const assert = require("assert");

const DataType = require("../src/data_type.js");

describe("DataType tests", () => {

	describe("Base class constructor", () => {

		it("creates a DataType object", () => {
			let dt = new DataType();
			assert.equal(dt.type, null);
			assert.equal(dt.getPrimitive(), null);
			assert.equal(dt.isEnumerable(), false);
			assert.equal(dt.isComparable(), false);
			assert.equal(dt.isSearchable(), false);
			assert.equal(dt.isFragmentable(), false);
			assert.equal(dt.hasAbsentValue(), false);
			assert.equal(dt.serialize(), "DataType/undefined/null");
		});

	});

	describe("applyProperties()", () => {

		it("sets properties in DataType object", () => {
			let dt = new DataType();
			dt.applyProperties({
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: true
			});
			assert.equal(dt.isEnumerable(), true);
			assert.equal(dt.isComparable(), true);
			assert.equal(dt.isSearchable(), true);
			assert.equal(dt.isFragmentable(), true);
			assert.equal(dt.hasAbsentValue(), true);
		});

	});

});
