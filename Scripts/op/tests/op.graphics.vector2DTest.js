//#region Vector2d
var Vector2d;
QUnit.module("op.vector2D", {
    setup: function () {
        Vector2d = new op.graphics.vector2d(10, 10);
        ok(Vector2d != undefined, "Test Data Created");
    }, teardown: function () {
        Vector2d = undefined;
        ok(Vector2d == undefined, "Test Data Deleted")
    }
});

test("Add - Adds two Vectors together and verifies the results ", function () {
    var newVector = new op.graphics.vector2d(10, 10);
    var result = Vector2d.Add(newVector);
    ok(result.x == 20 && result.y == 20);
});

test("Sub - Subtracts two Vectors together and verifies the results ", function () {
    var newVector = new op.graphics.vector2d(5, 5);
    var result = Vector2d.Sub(newVector);
    ok(result.x == 5 && result.y == 5);
});

test("Scale - Scales the Vector and verifies the results ", function () {
    var result = Vector2d.Scale(10);
    ok(result.x == 100 && result.y == 100);
});

test("Dot", function () {
    var newVector = new op.graphics.vector2d(5, 5);
    var result = Vector2d.Dot(newVector);
    var TestObject = 100;
    equal(result, TestObject);
});

test("Length", function () {
    var result = Vector2d.Length();
    equal(result, 14.142135623730951);
});
//#endregion
