//#region op.validation
var $fixture;
QUnit.module("op.validation", {
    setup: function () {
        $fixture = $("#qunit-fixture");
        $fixture.append("<span/>Project Name</span><br />");
        $fixture.append("<div class='error_summary'>");
        $fixture.append("<p>");
        $fixture.append("</p>");
        $fixture.append("<input type='text' class='mandatory' id='txtProjectName'><br />");
        $fixture.append("</div>");
        equal($("span", $fixture).length, 1, "span added successfully!");
        equal($("div", $fixture).length, 1, "div added successfully!");
        equal($("p", $fixture).length, 2, "p added successfully!");
        equal($("INPUT", $fixture).length, 1, "input added successfully!");
    }, teardown: function () {
        /// <summary>
        /// we dont need a teardown function because qunit-fixture is re-created on each test.
        /// </summary>
    }
});

test("mandatory no data", function () {
    var validation = new op.validation();
    validation.validatePage($("#qunit-fixture")[0]);
    equal($("p", $fixture).hasClass("error"), true);
});

test("mandatory with data", function () {
    var validation = new op.validation();
    $("INPUT", $fixture)[0].value = "test";
    validation.validatePage($("#qunit-fixture")[0]);
    equal($("p", $fixture).hasClass("error"), false);
});

test("clear mandatory ", function () {
    var validation = new op.validation();
    validation.validatePage($("#qunit-fixture")[0]);
    equal($("p", $fixture).hasClass("error"), true, "added the error class to the input");
    validation.ClearValidation($("#qunit-fixture")[0]);
    equal($("p", $fixture).hasClass("error"), false, "Removed error class");
});
//#endregion