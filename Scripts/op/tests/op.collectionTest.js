var _myList = require("../op.genericaCollections/op.collection.js");

function Car(make, model) {
    this.make = make;
    this.model = model;
}

//#region Collection
QUnit.module("op.collection", {
    setup: function () {
        myList = new _myList;
        myList.Add(new Car("Honda", "CR-V"));
        myList.Add(new Car("Nissan", "Sentra"));
        myList.Add(new Car("Honda", "Civic"));
        ok(myList.listArray.length == 3, "Test Data Created");
    }, teardown: function () {
        myList = undefined;
        ok(myList == undefined, "Test Data Deleted")
    }
});
test("Where ", function () {
    debugger;
    var TestCar = new Car("Nissan", "Sentra");
    var Sample = myList.Where("make == 'Nissan'");
    deepEqual(Sample.listArray[0], TestCar);
});
test("Where ", function () {
    var Sample = myList.Where("make == 'Honda'");
    ok(Sample.listArray.length == 2);
});
test("ElementAt ", function () {
    var Sample = myList.ElementAt(0);
    var TestCar = new Car("Honda", "CR-V");
    deepEqual(Sample, TestCar);
});
test("ElementAt ", function () {
    var Sample = myList.ElementAt(1);
    var TestCar = new Car("Nissan", "Sentra");
    deepEqual(Sample, TestCar);
});
test("ElementAt ", function () {
    var Sample = myList.ElementAt(2);
    var TestCar = new Car("Honda", "Civic");
    deepEqual(Sample, TestCar);
});
test("ContainesObject ", function () {
    var TestCar = new Car("Honda", "Civic");
    ok(myList.ContainesObject(TestCar))
});

//#endregion