/*******************************************************************************************
   Title:  Open Platform MathHelper 
   Description:  Generic static class to store helper Math Functions
   Author:  Iain Brown
   Updated: 28/01/2013
   Version 0.0.1
   Usage Example:

          
*********************************************************************************************/

var op = op || {};

var MathHelper = MathHelper || {};
op.mathHelper = MathHelper

Clamp = function (value, minimum, maximum) {
    /// <summary>
    /// Clamps the value to the minimum and maximum vales
    /// if the value is within the min and max the value is returned,
    /// if the value is out with the min and max then the min or max is returned
    /// </summary>
    /// <param name="value">the value to clamp</param>
    /// <param name="minimum">the minimum the value can be</param>
    /// <param name="maximum">the maximum the value can be</param>
    /// <returns type="int"> the value or the min or the max </returns>
	if (value > maximum) return maximum;
	else if (value < minimum) return minimum;
	else return value;
};
TwoPi = function () {
    return 2.0 * Math.PI;
}

op.mathHelper.clamp = Clamp;
op.mathHelper.TwoPI = TwoPi;