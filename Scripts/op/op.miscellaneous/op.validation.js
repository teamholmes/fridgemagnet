var op = op || {};

; (function () {

    function Validation() {

    }

    Validation.prototype.ClearValidation = function (container) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="container"></param>
        var object = container != undefined ? container : document;
        var boxes = object.getElementsByTagName("INPUT");
        for (x = 0 ; x != boxes.length; x++) {
            if (hasClass(boxes[x], "mandatory")) {
                setControlValid(boxes[x]);
            }
        }
        var textarea = object.getElementsByTagName("textarea");
        for (x = 0 ; x != textarea.length; x++) {
            if (hasClass(textarea[x], "mandatory")) {
                setControlValid(textarea[x]);
            }
        }
        var select = object.getElementsByTagName("select");
        for (x = 0 ; x != select.length; x++) {
            if (hasClass(select[x], "mandatory")) {
                setControlValid(select[x]);
            }
        }
    }

    Validation.prototype.validatePage = function (container) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="container"></param>
        /// <param name="usePopover"></param>
        /// <returns type=""></returns>
        var allValid = true;
        var object = container != undefined ? container : document;
        var boxes = object.getElementsByTagName("INPUT");
        for (x = 0 ; x != boxes.length; x++) {
            var isBoxValid = true;
            if (isBoxValid && hasClass(boxes[x], "mandatory")) {
                if (boxes[x].value == "") {
                    isBoxValid = false;
                }
            }
            if (hasClass(boxes[x], "mandatory")) {
                if (!isBoxValid) {
                    allValid = false;
                    setControlInvalid(boxes[x], "Field is mandatory")
                } else {
                    setControlValid(boxes[x]);
                }
            }
        }
        var textarea = object.getElementsByTagName("textarea");
        for (x = 0 ; x != textarea.length; x++) {
            var isTextareaValid = true;
            if (isTextareaValid && hasClass(textarea[x], "mandatory")) {
                if (textarea[x].value == "") {
                    isTextareaValid = false;
                }
            }
            if (hasClass(textarea[x], "mandatory")) {
                if (!isTextareaValid) {
                    allValid = false;
                    setControlInvalid(textarea[x], "Field is mandatory")
                } else {
                    setControlValid(textarea[x]);
                }
            }
        }

        var select = object.getElementsByTagName("select");
        for (x = 0 ; x != select.length; x++) {
            var isSelectValid = true;
            if (isSelectValid && hasClass(select[x], "mandatory")) {
                if (select[x].value == "" || select[x].value == -1) {
                    isSelectValid = false;
                }
            }
            if (hasClass(select[x], "mandatory")) {
                if (!isSelectValid) {
                    allValid = false;
                    setControlInvalid(select[x], "Field is mandatory")
                } else {
                    setControlValid(select[x]);
                }
            }
        }

        return allValid;
    }

    function setControlInvalid(ctl, errorMessage) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ctl"></param>
        /// <param name="errorMessage"></param>

        var para = ctl.parentElement.getElementsByTagName('p');
        para[0].innerText = errorMessage;
        para[0].className += " error";
    }

    function setControlValid(ctl) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ctl"></param>
        var para = ctl.parentElement.getElementsByTagName('p');
        para[0].innerText = "";
        para[0].className = "";

    }
    function hasClass(element, cls) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="element"></param>
        /// <param name="cls"></param>
        /// <returns type=""></returns>
        if (element != undefined) {
            var r = new RegExp('\\b' + cls + '\\b');
            return r.test(element.className);
        }
    }

    op.validation = Validation
})();