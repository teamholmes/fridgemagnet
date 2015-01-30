//#region Rectangle
var rectangle;
QUnit.module("op.graphics.rectangle", {
    setup: function () {
        rectangle = new op.graphics.rectangle(10, 10, 100, 100);
        ok(rectangle != undefined, "Test Data Created");
    }, teardown: function () {
        rectangle = undefined;
        ok(rectangle == undefined, "Test Data Deleted")
    }
});

test("rectangle", function () {
    var recArea = rectangle.height * rectangle.width;
    var newArea = 100 * 100;
    ok(recArea == newArea);
});

//#endregion