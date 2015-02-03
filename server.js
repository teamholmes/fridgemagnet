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

var client = { name: 'Anonymous', socketid: 1 };

// setup azure storage
//http://azure.microsoft.com/en-gb/documentation/articles/storage-nodejs-how-to-use-table-storage/

var azure = require('azure-storage');
//var azure = require('azure');

var dbaccountname = "fridgemagnetstorage";
var dbaccountkey = "s1io4G3cACTwcwVCQVNtMcscVF4pmxyHe6uWC/KWWp+t7oZDm2w1FqkWAf8Eybrxi9M4z5WaTd7SVM3BtNxmWg==";


process.env.AZURE_STORAGE_ACCOUNT = dbaccountname;
process.env.AZURE_STORAGE_ACCESS_KEY = dbaccountkey;

// create a new table
//var tableSvc = azure.createTableService(dbaccountname,dbaccountkey);
var tableSvc = azure.createTableService();
var entGen = azure.TableUtilities.entityGenerator;

var dbTable = "tbltitles" + "m";
var dbpartitionkey = dbTable + "_KEY";

// ensure that form variables get parsed correctly

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');


var env = process.env.NODE_ENV || 'development';
    app.use('/media', express.static(__dirname + '/media'));
    app.use(express.static(__dirname + '/')); // you an replace the / with /public etc


app.get('/', function (req, res) {
    res.shouldKeepAlive = true;
});

// create all the tiles


app.set('port', process.env.PORT || 3000);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


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




// check that the table does not already exist
tableSvc.createTableIfNotExists(dbTable, function(error, result, response){


if (error)
{
alertToClientBrowser("ERROR Testing for creation of table");
}

    alertToClientBrowser("Testing for creation of table");
    if(result == true)
    {
        // table newly created

        GenerateTiles();
         alertToClientBrowser("Generated tiles");
         alertToClientBrowser("Tile length " + tileArray.length)


    var stringrep = tileArray;
    stringrep = JSON.stringify(tileArray);

        var task = { 
                  PartitionKey: entGen.String(dbpartitionkey),
                  RowKey: entGen.String('1'),
                  data: entGen.String(stringrep)
                   };


        // save the data
        tableSvc.insertEntity(dbTable,task, function (error, result, response) 
        {
            
            if (result)
            {
                alertToClientBrowser("Tiles inserted into db " + JSON.stringify(task));
            }
            else if (!result)
            {
                alertToClientBrowser("Tiles AAAA inserted into db " + JSON.stringify(task));
            }

            if(error)
            {
            alertToClientBrowser("error for creation of table and tiles");

            }
        });

        

    }
    else
    {
         alertToClientBrowser("Table already exists");
        // table already exists - load in data

        tableSvc.retrieveEntity(dbTable, dbpartitionkey, '1', function(error, result, response){
        //alertToClientBrowser("---> " + JSON.stringify(result));
        //alertToClientBrowser("Tryign to retrieve tiles from db " + error + " " + JSON.stringify(result) + " " + JSON.stringify(response));
          if(!error)
          {

            alertToClientBrowser("1");
            alertToClientBrowser(JSON.stringify(result.data._));

            // result contains the entity
            tileArray =  JSON.parse(result.data._);

            alertToClientBrowser("Array length : " + tileArray.length);

            //alertToClientBrowser("Retrieveing tiles from db " + result.data);
          }
          else
          {
            alertToClientBrowser("ERROR Retrieveing tiles from db " + error);
          }
        });
    }

    //socket.emit('SendTilesAndRender', { arrayofTiles: JSON.stringify(tileArray) });

   
});


 alertToClientBrowser("--<><><>" +  JSON.stringify(tileArray));
    io.socket.emit('SendTilesAndRender', { arrayofTiles: JSON.stringify(tileArray) });

    socket.on('tilemoving', function (data) {
        // update the position of the tile
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


function alertToClientBrowser(data)
{
    io.sockets.emit('AlertClient', data);
}


console.log("====================== SERVER STARTING ======================");



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