/*******************************************************************************************
   Title:  Open Platform Generic Collection Implementation
   Description:  An implementation of a Generic collection with LINQ support (based off .NET).
   Author:  Iain Brown
   Updated: 1/12/2012
   Version 0.0.2
   Usage Example:

        function Car(make, model)
        {
            this.make = make;
            this.model = model;
        }

        var myList = new op.collection();
        myList.Add(new Car("Honda", "CR-V"));
        myList.Add(new Car("Nissan", "Sentra"));
        myList.Add(new Car("Honda", "Civic"));
       
        var selList = myList.Where("make == 'Honda'").OrderByDescending("model");
         
   
*********************************************************************************************/
var op = op || {};

; (function () {

    function Collection() {
        ///  An implementation of a Generic collection with LINQ support (based off .NET).
        ///  e.g  var myList = new op.collection();
        /// </summary>
        this.oType = undefined;
        this.listArray = [];
        //var core = new op.core();
        //core.Inherit(this, op.core);
    }

    Collection.prototype.Add = function (object) {
        /// <summary>
        ///  Adds objects to the collection
        ///  once a object is added then only objects of the that type can be added
        /// e.g. myList.Add(new Car("Honda", "CR-V"));
        /// </summary>
        /// <param name="object">the object to add to the collection</param>
        if (!this.oType)
            this.oType = typeof (object);

        validate.call(this, object);

        this.listArray.push(object);
        //this._super.raiseEvent("op.collection.Add", [{ sender: this}]);
    }

    Collection.prototype.Count = function () {
        return this.listArray.length;
    }


    Collection.prototype.Where = function (query) {
        /// <summary>
        ///  Allows a LINQ style list querying
        /// </summary>
        /// <param name="query">The LINQ query to search on e.g  myList.Where("make == 'Honda'")</param>
        /// <returns type="">A collection filtered on the query</returns>
        return select.call(this, query);
    }

    Collection.prototype.RemoveByIndex = function (from, to) {
        /// <summary>
        /// Removes an item from the collection, or a range of items 
        /// </summary>
        /// <param name="from">The id of the object to remove, or the starting id if removing a range of objects</param>
        /// <param name="to">The end id of the object to remove is removing a range of objects</param>
        /// <returns type=""></returns>
        var rest = this.listArray.slice((to || from) + 1 || this.listArray.length);
        this.listArray.length = from < 0 ? this.listArray.length + from : from;
        return this.listArray.push.apply(this.listArray, rest);
    }

    Collection.prototype.Remove = function (object) {
        /// <summary>
        /// Removes a item from the collection
        /// </summary>
        /// <param name="object">object to remove from the collection</param>
        /// <returns type=""></returns>
        if (!this.oType)
            this.oType = typeof (object);

        validate.call(this, object);
        var index = this.listArray.indexOf(object);
        var rest = this.listArray.slice((index || index) + 1 || this.listArray.length);
        this.listArray.length = index < 0 ? this.listArray.length + index : index;
        return this.listArray.push.apply(this.listArray, rest);

    }

    Collection.prototype.SerializeToJSON = function () {
    	/// <summary>
    	/// Returns the collection as JSON
    	/// </summary>
    	/// <returns type="string">JSON string of the collection</returns>
        try {
            return JSON.stringify(this.listArray).toString();
        } catch (e) {

        }
    }

    function validate(object) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="object"></param>
        if (typeof (object) != this.oType)
            throw "Only one object type is allowed in a list";
    }

    function copy(array) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="array"></param>
        /// <returns type=""></returns>
        var newList = new List();
        for (property in this)
            newList[property] = this[property];

        newList.Data(array);

        return newList;
    }

    Collection.prototype.Data = function (dataArray) {
        /// <summary>
        /// sets the Data of the collection only use is you wish to override the data in the collection with another collection.
        /// </summary>
        /// <param name="dataArray">Array of data to override the current collection with</param>
        this.listArray = dataArray;
    }

    Collection.prototype.OrderBy = function (property) {
        /// <summary>
        /// Orders the list bases on the property passed in.
        /// e.g OrderBy("model");
        /// </summary>
        /// <param name="property">The property to sort on</param>
        /// <returns type="">returns a sorted collection</returns>
        return copy(this.listArray.slice(0).sort(genericSort.call(this, property)));
    }

    Collection.prototype.OrderByDescending = function (property) {
        /// <summary>
        /// Orders the list bases on the property passed in, in Descending order.
        /// e.g OrderByDescending("model");
        /// </summary>
        /// <param name="property">The property to sort on</param>
        /// <returns type="">returns a sorted collection</returns>
        return copy(this.listArray.slice(0).sort(genericSort(property)).reverse());
    }

    Collection.prototype.ElementAt = function (index) {
        /// <summary>
        ///  returns a object from the collection at a set index 
        /// </summary>
        /// <param name="index">The id of the object to return</param>
        /// <returns type="">returns an object from the collection</returns>
        if (index >= this.listArray.length || index < 0)
            throw "Invalid index parameter in call to op.collection.ElementAt";
        return this.listArray[index];
    }

    Collection.prototype.ContainesObject = function (object) {
    	/// <summary>
    	/// 
    	/// </summary>
    	/// <param name="object"></param>
    	/// <returns type="bool"></returns>
        if (!this.oType)
            this.oType = typeof (object);

        validate.call(this, object);
        for (var arrIndex = 0; arrIndex < this.listArray.length; arrIndex++) {
            if (JSON.stringify(this.listArray[arrIndex]) == JSON.stringify(object)) {
                return true;

            }
        }
        return false;
    }

    Collection.prototype.Containes = function (query) {

        for (var arrIndex = 0; arrIndex < this.listArray.length; arrIndex++)
            with (this.listArray[arrIndex])
                if (eval(query))
                    return true;
        return false;

    }

    Collection.prototype.IndexOf = function (object) {
        /// <summary>
        /// Return the indev of the object in the Collection
        /// This will return the index of the first instance of the object
        /// </summary>
        /// <param name="object">Teh object to find the index of</param>
        /// <returns type="int">The location of the object in the array</returns>
        if (!this.oType)
            this.oType = typeof (object);

        validate.call(this, object);
        for (var arrIndex = 0; arrIndex < this.listArray.length; arrIndex++) {
            if (JSON.stringify(this.listArray[arrIndex]) == JSON.stringify(object)) {
                return arrIndex;

            }
        }
        return null;
    }

    Collection.prototype.FirstOrDefault = function (query) {
        /// <summary>
        ///  gets the first item in the list based on the LINQ query
        /// </summary>
        /// <param name="query">The query to filter the data on e.g.   var selList = myList.FirstOrDefault("make == 'Honda'")</param>
        /// <returns type=""></returns>
        var list = select.call(this, query);
        return list ? list.ElementAt(0) : null;
    }

    function copy(array) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="array"></param>
        /// <returns type=""></returns>
        var newList = new Collection();
        newList.Data(array);
        return newList;
    }

    function select(query) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="query"></param>
        /// <returns type=""></returns>
        var selectList = copy([]);

        for (var arrIndex = 0; arrIndex < this.listArray.length; arrIndex++)
            with (this.listArray[arrIndex])
                if (eval(query))
                    selectList.Add(this.listArray[arrIndex]);
        return selectList;
    }

    function genericSort(property) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="property"></param>
        return function (a, b) {
            return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        }
    }

    op.collection = Collection

})();
