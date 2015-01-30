   
 

var Tile = function (){

	var Setter = function(x){
		//Layout for a basic setter function
	}

	var Getter = function(){
		//Layout for basic Getter function
		return x;
	}

	return {
		Setter: Setter,
		Getter:Getter
		}

};

exports.Tile = Tile;