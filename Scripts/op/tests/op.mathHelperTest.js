//#region mathHelper
QUnit.module("op.mathHelper", {
    setup: function () {

    }, teardown: function () {

    }
});

test("Clamp", function () {
    ok(op.mathHelper.clamp(10, 0, 9) == 9);
});

test("Clamp", function () {
    var clampedResult = op.mathHelper.clamp(5, 0, 10);
    ok(clampedResult != 0 && clampedResult != 10);

});

test("TwoPI", function () {
    ok(op.mathHelper.TwoPI = (2.0 * 3.141592653589793));
});
//#endregion