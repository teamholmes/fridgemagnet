var _core = require("../op.core.js");
debugger;
QUnit.module("op.core", {
    setup: function () {
        core = new _core();
        ok(core != undefined, "Test Data Created");
    }, teardown: function () {
        core = undefined;
        ok(core == undefined, "Test Data Deleted")
    }
});

test("event dispatcher", function () {
    debugger;
    core.addListener("setup", function () {
        ok(true, "event raised ");
    });
    core.raiseEvent("setup");

});