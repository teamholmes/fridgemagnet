var socketioport = 81; //process.env.VCAP_APP_PORT || 81;
//var httprequestport = process.env.VCAP_APP_PORT ||8001;
var httprequestport = process.env.port ||8001;

var maxclients = 25;

var clientArray = new Array();
var tileArray = new Array();

var express = require('express'), http = require('http'), app = express();

var io = require('socket.io');
var connect = require('connect')
var fs = require('fs')
var Tile = require("./Tile").Tile;
var bodyParser     = require('body-parser');

// variables and their makeup
//var tile = { id: 0, character: 'a', x: 10, y: 10 };
var client = { name: 'Anonymous', socketid: 1 };


// ensure that form variables get parsed correctly

//app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

//app.configure(function () {
//    app.use(express.cookieParser());
//    app.use(express.session({ secret: 'secretzsd', key: 'express.sid' }));
//    app.use('/media', express.static(__dirname + '/media'));
//    app.use(express.static(__dirname + '/')); // you an replace the / with /public etc
//});

var env = process.env.NODE_ENV || 'development';
//if ('development' == env) {
   //app.use(express.cookieParser());
//    app.use(express.session({ secret: 'secretzsd', key: 'express.sid' }));
    app.use('/media', express.static(__dirname + '/media'));
    app.use(express.static(__dirname + '/')); // you an replace the / with /public etc
//}


// http://www.raymondcamden.com/index.cfm/2012/8/29/Thoughts-on-Nodejs-and-Express for ejs
// Handle GET requests on httprequestport
app.get('/', function (req, res) {
    //res.header("Connection", "keep-alive");
    res.shouldKeepAlive = true;
   // res.sendfile(__dirname + '/client.html');
});

// create all the tiles


GenerateTiles();


//app.listen(httprequestport);
app.set('port', process.env.PORT || 3000);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//var io = require('socket.io').listen(socketioport);

io = require('socket.io').listen(server);
        io.set('transports', ['websocket',
            'xhr-polling', 'jsonp-polling', 'htmlfile'
        ]);
        io.set('origins', '*:*');


io.set('log level', 1);

io.sockets.on('connection', function (socket) {

    // max client detection
    if (clientArray != undefined && (clientArray.length) >= maxclients ) {
        socket.emit('maxclients', { socketid: socket.id });
        socket.disconnect();
    }

    var client = { name: 'Anonymous', socketid: socket.id };

    clientArray.push(client);

    logger('Client connected ID : ' + socket.id);

    logger('Sending tiles & rendercommand to client : ' + socket.id);

    socket.emit('SendTilesAndRender', { arrayofTiles: JSON.stringify(tileArray) });

    socket.on('tilemoving', function (data) {
        // update the position of the tile
       // logger(Number(data.id) + " Tile being moved : " + data.xpos + "/" + data.ypos);
        tileArray[Number(data.id)].x = data.xpos;
        tileArray[Number(data.id)].y = data.ypos;
        
        // let all the ther users know its being updated
        io.sockets.emit('updatetileposition', { id: data.id, xpos: data.xpos, ypos: data.ypos, candrag: data.candrag });

    });

    socket.on('canmovetime', function (data) {
        // id: idofitembeingdragged, candrag: 'true'
        // let all the ther users know its being updated
        io.sockets.emit('updatedragstatus', { id: data.id, candrag: data.candrag });

    });

   

    socket.on('disconnect', function (data) {
        
        // get the position of the client in the array and remove
        var clientArrayPosition = GetClientIndexPosition(socket.id);
        RemoveClientFromArray(clientArrayPosition);
        io.sockets.emit('broadcastusers', { userlist: clientArray });

        logger("Client diconnected ID : " + socket.id);
    });
   
});


console.log("====================== SERVER STARTING ======================");

// Put a friendly message on the terminal
logger("Socket.io server on port " + socketioport );
logger("Web  server on port " + httprequestport );
logger("To see the tiles - enter 'http://127.0.0.1:8001/client.html' in your browser" );



function logger(data)
{
    console.log(">>>>>> " + clientArray.length + " / " + maxclients  + " " + data);
}

function UpdatePlayerUserName(clientid, username) {
    var clientarrayposition = GetClientIndexPosition(clientid);
    logger("UpdatePlayerUserName " + clientid + " " + clientArray[clientarrayposition].username + " -> " + username);
    clientArray[clientarrayposition].username = username;
}

function GetClientIndexPosition(socketid) {
    // Method that returns index position for a client socketid int eh array
    if (clientArray != null)
    {
        var index = -1;
        for (counter = 0; counter < clientArray.length; counter++) {

            if (clientArray[counter].socketid == socketid) {
                index = counter;
                break;
            }
        }
    }
    return index;
}

function RemoveClientFromArray(indexpos) {
    if (indexpos >= 0) {
        //logger("ClientArray cleanup for id " + clientArray[indexpos].socketid);
        clientArray.splice(indexpos, 1);
       
    }
}

function GenerateTiles() {
    for (i = 0; i < 90; i++) {
        tileArray.push(new Tile(i));
    }
    AddExtraTiles("A", 5);
    AddExtraTiles("E", 5);
    AddExtraTiles("I", 5);
    AddExtraTiles("O", 5);
    AddExtraTiles("U", 5);
    AddExtraTiles("T", 7);

}

function AddExtraTiles(character, count) {
    for (i = 0; i < count; i++) {
        tileArray.push(new Tile(tileArray.length,character) );
    }
}