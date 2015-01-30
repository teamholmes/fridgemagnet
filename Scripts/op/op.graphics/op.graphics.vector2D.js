/*******************************************************************************************
   Title:  Open Platform Graphic Vector2d 
   Description:  Creates a new 2d Vector objects
   Author:  Iain Brown
   Updated: 28/01/2013
   Version 0.0.1
   Usage Example:

        var vector = new op.graphics.vector2d(10,10);

        // returns a new vector with the new vector added to the current vector  
        var newVector = vector.Add(new op.graphics.vector2d(20,20)); 

*********************************************************************************************/


var op = op || {};

var Graphics = Graphics || {};
op.graphics = Graphics

; (function () {

    function Vector2d(x, y) {
    	/// <summary>
    	/// Creates a new 2D vector object
    	/// </summary>
    	/// <param name="x">the vectors x</param>
    	/// <param name="y">the vecotrs y</param>
        this.x = x;
        this.y = y;
    }

    Vector2d.prototype.Add = function (other) {
    	/// <summary>
    	/// adds two vecotrs together
    	/// </summary>
    	/// <param name="other">the vector to add to the current vector</param>
    	/// <returns type="Vector2d">The new vector</returns>
        return new Vector2d(this.x + other.x, this.y + other.y);
    }

    Vector2d.prototype.Sub = function (other) {
    	/// <summary>
    	/// subtracts the vector from this vector
    	/// </summary>
    	/// <param name="other">the vector to subtract</param>
    	/// <returns type="Vector2d"> the new vector</returns>
        return new Vector2d(this.x - other.x, this.y - other.y);
    }

    Vector2d.prototype.Scale = function (scale) {
    	/// <summary>
    	/// scales the vector.
    	/// </summary>
    	/// <param name="scale">the value to scale the vector by</param>
    	/// <returns type="Vector2d">the new vector</returns>
        return new Vector2d(this.x * scale, this.y * scale);
    }

    Vector2d.prototype.Length = function () {
    	/// <summary>
    	/// returns the length of the vector
    	/// </summary>
    	/// <returns type="number"> the lenght of the vector </returns>
        return Math.sqrt(this.Dot(this));
    }

    Vector2d.prototype.Angle = function (other) {
    	/// <summary>
    	/// works out the angle between this vector and the other vector
    	/// </summary>
    	/// <param name="other">the vector to workout the angle between</param>
    	/// <returns type="number"> the angle between the two vectors</returns>
        return Math.acos(this.Dot(other) / (this.Length() * other.Length()));
    }

    Vector2d.prototype.SetAngleVector = function (len, angle) {
    	/// <summary>
    	/// 
    	/// </summary>
    	/// <param name="len"></param>
    	/// <param name="angle"></param>
    	/// <returns type=""></returns>
        this.x = -len * Math.sin(angle);
        this.y = len * Math.cos(angle);
        return this;
    }

    Vector2d.prototype.Dot = function (other) {
    	/// <summary>
    	/// 
    	/// </summary>
    	/// <param name="other"></param>
    	/// <returns type=""></returns>
        return this.x * other.x + this.y * other.y;
    }

    Vector2d.prototype.Normalize = function () {
    	/// <summary>
    	/// 
    	/// </summary>
    	/// <returns type=""></returns>
        var l = this.Length()
        return new Vector2d(this.x / l, this.y / l);
    }

    Vector2d.prototype.Clone = function () {
    	/// <summary>
    	/// 
    	/// </summary>
    	/// <returns type=""></returns>
        return new Vector2d(this.x, this.y);
    }

    Vector2d.prototype.DistanceSquared = function (other) {
    	/// <summary>
    	/// 
    	/// </summary>
    	/// <param name="other"></param>
    	/// <returns type=""></returns>
        var xlen = this.x - other.x;
        var ylen = this.y - other.y;
        return xlen * xlen + ylen * ylen;
    }

    Vector2d.prototype.ToString = function () {
    	/// <summary>
    	/// 
    	/// </summary>
    	/// <returns type=""></returns>
        return "(" + this.x + ", " + this.y + ")";

    }
    op.graphics.vector2d = Vector2d;

    function Vector2dCompareX(vector2dA, vector2dB)
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="vector2dA"></param>
        /// <param name="vector2dB"></param>
        /// <returns type=""></returns>
        return vector2dA.x - vector2dB.x;
    }
    op.graphics.vector2dCompareX = Vector2dCompareX;

    function Vector2dCompareY(vector2dA, vector2dB) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="vector2dA"></param>
        /// <param name="vector2dB"></param>
        /// <returns type=""></returns>
        return vector2dA.y - vector2dB.y;
    }

    op.graphics.vector2dCompareY = Vector2dCompareY;


})();


