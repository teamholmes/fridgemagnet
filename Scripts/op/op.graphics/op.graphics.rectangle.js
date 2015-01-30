/*******************************************************************************************
   Title:  Open Platform Graphic Rectangle 
   Description:  Creates a new Rectangle objects
   Author:  Iain Brown
   Updated: 28/01/2013
   Version 0.0.1
   Usage Example:

        var rec = new op.graphics.rectangle(10,10,100,100);
          
*********************************************************************************************/

var op = op || {};

var Graphics = Graphics || {};
op.graphics = Graphics

; (function () {

    function Rectangle(x, y, width, height) {
        /// <summary>
        /// Creates a new Rectangle object 
        /// </summary>
        /// <param name="x">the x of the top left of the rectangle</param>
        /// <param name="y">the y of the top left of the rectangle</param>
        /// <param name="width">the width of the rectangle</param>
        /// <param name="height">the height of the rectangle</param>
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}


	op.graphics.rectangle = Rectangle;
})();