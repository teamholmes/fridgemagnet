"use strict";
var op = op || {};

; (function () {

    function MutiDimentionCollection(rows,columns) {

        this.oType = undefined;
        this.oRows = rows;
        this.oColums = columns;
        this.listArray = [];
        for (var r = 0; r < rows; r++) {
            this.listArray[r] = [];
            for (var c = 0; c < columns; c++) {
                this.listArray[r][c] = [];
            }
        }
        

    }


    MutiDimentionCollection.prototype.Add = function (row,column,object) {
        if (!this.oType)
            this.oType = typeof (object);

        validate.call(this, object);
        this.listArray[row] [column] = object;
    }

    function validate(object) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="object"></param>
        if (typeof (object) != this.oType)
            throw "Only one object type is allowed in a list";
    }


	op.mutiDimentionCollection = MutiDimentionCollection

})();