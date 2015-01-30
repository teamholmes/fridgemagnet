
var Tile = function (id,char) {
    var x = Math.floor(Math.random() * 900)  + 36;
    var y = Math.floor(Math.random() * 700) + 72;
    var letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);

    if (char != undefined) {
        letter = char;
    }
    var id = id;
    var isMoving = false;

    return {
        x: x,
        y: y,
        letter: letter,
        id: id,
        isMoving:isMoving
    }
};

exports.Tile = Tile;