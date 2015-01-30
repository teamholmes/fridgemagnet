/*******************************************************************************************
   Title:  Open Platform Dictionary Collection Implementation
   Description:  An implementation of a dictionary collection with LINQ support (based off .NET).
                        This class inherits from op.collection via the op.core.Inherit function
                        Both op.core and op.collection need to be included in the website before this class can be used
   Author:  Iain Brown
   Usage Example:

        var myDict = new op.dictionary();
        myDict.Add("key1","value");
        myDict.Add("key2,","value");
        myDict.Add("key3","value");
        var selList = myDict.Where("key == 'key1'");
         
*********************************************************************************************/
var op = op || {};

; (function () {

    function dictionary() {
        /// <summary>
        ///  An implementation of a dictionary collection with LINQ support (based off .NET).
        ///  e.g  var myDict = new op.dictionary();
        /// </summary>
        var core = new op.core();
        core.Inherit(this, op.collection);
        core.Inherit(this, op.core);

        this._super.listArray = [];
    }

    dictionary.prototype.Add = function (key, value) {
        /// <summary>
        /// Adds a entry to the dictionary.
        /// e.g myDict.Add("key1","value1");
        /// </summary>
        /// <param name="key">The dictionary key</param>
        /// <param name="value">The dictionary value</param>
        var object = new dictionaryEntry(key, value);
        var keys = this._super.Where("key == '" + key + "'");
        if (keys.listArray.length == 0) {
            this._super.Add(object);
        } else {
            throw new Error("key exists");
        }
    }

    dictionary.prototype.InnerList = function () {
        /// <summary>
        /// 
        /// </summary>
        /// <returns type=""></returns>
        return this._super.listArray;
    }

    dictionary.prototype.Where = function (query) {
        /// <summary>
        /// Allows a LINQ style list querying 
        /// </summary>
        /// <param name="query">The LINQ query to search on e.g  myDict.Where("key == 'value1'")</param>
        /// <returns type="">A dictionary filtered on the query</returns>
        return this._super.Where(query);
    }

    dictionary.prototype.Data = function (dataArray) {
        /// <summary>
        /// sets the Data of the dictionary only use is you wish to override the data in the dictionary with another dictionary.
        /// </summary>
        /// <param name="dataArray">Array of data to override the current collection with</param>
        this._super.Data(dataArray);
    }

    dictionary.prototype.OrderBy = function (property) {
        /// <summary>
        /// Orders the dictionary bases on the property passed in.
        /// e.g OrderBy("key");
        /// </summary>
        /// <param name="property">The property to sort on</param>
        /// <returns type="">returns a sorted dictionary</returns>
        return this._super.OrderBy(property);
    }

    dictionary.prototype.OrderByDescending = function (property) {
        /// <summary>
        /// Orders the dictionary bases on the property passed in, in Descending order.
        /// e.g OrderByDescending("key");
        /// </summary>
        /// <param name="property">The property to sort on</param>
        /// <returns type="">returns a sorted dictionary</returns>
        return this._super.OrderByDescending(property);
    }

    dictionary.prototype.ElementAt = function (index) {
        /// <summary>
        ///  returns a object from the dictionary at a set index 
        /// </summary>
        /// <param name="index">The id of the object to return</param>
        /// <returns type="">returns an object from the dictionary</returns>
        return this._super.ElementAt(index);
    }

    dictionary.prototype.FirstOrDefault = function (query) {
        /// <summary>
        ///  gets the first item in dictionary list based on the LINQ query
        /// </summary>
        /// <param name="query">The query to filter the data on e.g.   var selDict = myDict.FirstOrDefault("value == 'Honda'")</param>
        /// <returns type=""></returns>
        return this._super.FirstOrDefault(query);
    }

    dictionary.prototype.RemoveByKey = function (Key) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Key"></param>
        /// <returns type=""></returns>
        var object = this._super.FirstOrDefault("key == '" + Key + "'");
        return this._super.Remove(object);
    }


    dictionary.prototype.RemoveByIndex = function (from, to) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <returns type=""></returns>
        return this._super.RemoveByIndex(from, to);
    }

    function dictionaryEntry(key, value) {
        /// <summary>
        /// The object used to store the data in the dictionary.
        /// </summary>
        /// <param name="key">the key</param>
        /// <param name="value">the value</param>
        this.key = key;
        this.value = value;
    }

    op.dictionary = dictionary;
})();
if (typeof window === 'undefined') {
    module.exports = op;
    module.exports = op.dictionary;
}