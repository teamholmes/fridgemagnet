/*******************************************************************************************
   Title:  Open Platform Core Class Implementation
   Description:  This is the Open Platform base class. 
                 This class setup generic error trapping for any page that includes it. 
                 This class also allows class inheriting.
   Author:  Iain Brown
   Updated: 1/12/2012
   Version 0.0.3
*********************************************************************************************/
"use strict";

var op = op || {};
debugger;

; (function () {
    /// <summary>
    /// The core functions for the open platform 
    /// javascript libraries.
    /// </summary>

    // --------- Public API --------- //

    function core() {


        String.prototype.startsWith = function (str) {
            /// <summary>
            /// Function to determan if a string starts with the  item
            /// </summary>
            /// <param name="str">text to check the current string start with </param>
            /// <returns type="boolean">True if the string starts with the item</returns>
            return this.indexOf(str) == 0;
        }

        String.prototype.isEmpty = function (s) {
            /// <summary>
            /// Is the string empty
            /// </summary>
            /// <param name="s">The string</param>
            /// <returns type="boolean">True if the string is empty</returns>
            return String(s).search(bpat) != -1
        }

        String.prototype.killWhiteSpace = function () {
            /// <summary>
            /// 
            /// </summary>
            /// <returns type=""></returns>
            return this.replace(/\s/g, '');
        };

        String.prototype.reduceWhiteSpace = function () {
            /// <summary>
            /// 
            /// </summary>
            /// <returns type=""></returns>
            return this.replace(/\s+/g, ' ');
        };
    }

    core.prototype.Inherit = function (Child, Parent) {
        /// <summary>
        /// Creates pseudo class inheritance
        /// </summary> 
        /// <param name="Child">The child to inherit to</param>
        /// <param name="Parent">The parent to inherit from</param>
        try {
            var F = function () { };
            F.prototype = Parent.prototype;
            Child.prototype = new F();
            if (Child._super != undefined) {
                Child._super = mergeRecursive(Child._super, Parent.prototype);
            } else {
                Child._super = Parent.prototype;
            }
            Child.prototype.constructor = Child;
        } catch (e) {
            throw e;
        }
    }

    function mergeRecursive(obj1, obj2) {
        for (var p in obj2) {
            try {
                // Property in destination object set; update its value.
                if (obj2[p].constructor == Object) {
                    obj1[p] = MergeRecursive(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    }


    core.prototype.addListener = function (eventName, callback) {
        /// <summary>
        /// Addes a listener for the event
        /// </summary>
        /// <param name="eventName">the name of the event to listen for</param>
        /// <param name="callback">the function to call when the event if fired</param>
        var events = this._events == undefined ? this._events = {} : this._events,
            callbacks = events[eventName] = events[eventName] || [];
        callbacks.push(callback);

    }

    core.prototype.raiseEvent = function (eventName, args) {
        /// <summary>
        /// Raise the Event
        /// </summary>
        /// <param name="eventName">the Event to raise</param>
        /// <param name="args">any args for the event</param>
        if (this._events != undefined) {
            if (this._events[eventName] != undefined) {

                var callbacks = this._events[eventName];
                for (var i = 0, l = callbacks.length; i < l; i++) {
                    callbacks[i].apply(null, args);
                }
            }
        }
    }

    /* TODO: add remove event function here*/

    op.core = core;

})();

; (function () {

    function $() {
        /// <summary>
        /// 
        /// </summary>
        /// <returns type=""></returns>
        var elements = new Array();
        for (var i = 0; i < arguments.length; i++) {
            var element = arguments[i];
            if (typeof element == 'string')
                if (element.toString().startsWith('$')) {
                    element = document.getElementById('<%= element.ClientID %>');
                } else if (element.toString().startsWith('*')) {
                    element = element.replace('*', '');
                    element = document.body.querySelector('#' + element);
                } else if (element.toString().startsWith('.')) {
                    element = element.replace('.', '');
                    element = document.getElementsByClassName(element);
                } else {
                    element = element.replace('#', '');
                    element = document.getElementById(element);
                }
            if (arguments.length == 1)
                return element;
            elements.push(element);
        }
        return elements;
    }
    op.$ = $;

})();






