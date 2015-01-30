var codein = require("node-codein");
var _core = require("../op.core.js");
var base = require("../op.genericaCollections/op.collection.js");
var _myList = require("../op.genericaCollections/op.dictionary.js");

//#region dictionary

QUnit.module("op.dictionary", {
    setup: function () {
        myList = new _myList;
        myList.Add("key1", "value1");
        myList.Add("key2", "value2");
        myList.Add("key3", "value2");
        console.log(myList);
        ok(myList.InnerList().length == 3, "Test Data Created");
    }, teardown: function () {
        myList = undefined;
        ok(myList == undefined, "Test Data Deleted")
    }
});
test("Where ", function () {
    console.log(myList);
    var Sample = myList.Where("value == 'value1'");
    var TestObject = "value1";
    ok(Sample.listArray[0].value == TestObject);
});

test("Where ", function () {
    console.log(myList);
    var Sample = myList.Where("key == 'key1'");
    var TestObject = "key1";
    ok(Sample.listArray[0].key == TestObject);
});

test("Where", function () {
    console.log(myList);
    var Sample = myList.Where("value == 'value2'");
    var TestObject = "key2";
    var TestObject1 = "key3";
    ok(Sample.listArray[0].key == TestObject && Sample.listArray[1].key == TestObject1);
});

//#endregion
