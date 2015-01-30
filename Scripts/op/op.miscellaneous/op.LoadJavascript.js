var op = op || {};

; (function () {


    // --------- Public API --------- //

    var _tagId = "";

    function LoadJavascript(tagId) {
        /// <summary>
        /// Constructor
        /// </summary>
        this._tagId = tagId;
    }


    LoadJavascript.prototype.LoadFile = function (filename) {
        /// <summary>
        /// Loads a JavaScript file and attached it to a DOM object ID
        /// </summary>
        /// <param name="filename">The filename and path to the file to load</param>
        this._filename = filename;
        loadJavascriptfile.call(this);
    }

    LoadJavascript.prototype.LoadScript = function (script) {
        this._script = script;
        loadJavascriptString.call(this);
    }
    // --------- /Public API --------- //    

    // --------- Privates --------- //



    function loadJavascriptfile() {
        /// <summary>
        /// loads the JavaScript file and attaches it to the DOM object
        /// </summary>
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", this._filename);

        if (typeof fileref != "undefined")
            document.getElementById(this._tagId).appendChild(fileref);
    }

    function loadJavascriptString() {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.innerHTML = this._script;

        if (typeof fileref != "undefined")
            document.getElementById(this._tagId).appendChild(fileref);
    }
    // --------- /Privates --------- //


    op.LoadJavascript = LoadJavascript;
})();