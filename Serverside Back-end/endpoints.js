// Copyright Nand Homan, 2020 > Nandhoman.nl

var bodyParser = require('body-parser');
//npm install body-parser
var http = require("http");
//npm install http
var express = require("express");
//npm install express
var app = express();
var sessionkey = null;
var totalNumberOfPanels = 102;


var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(express.urlencoded());
app.use(express.json());

// Offical Features to FE
var ColorstringFromFE;
var ClickedTileArray = ["000"];
var PostedColorstring;
app.post("/currentColorStringFormFE", function (request, res) {
    ColorstringFromFE = request.body.colorstring;
    res.send("done")
});

app.post("/singleClickEvent", function (request, res) {
    console.log("function /singleClickEvent")
    var touchedTile = request.body.data;
    res.send("Single Click Event Transmitted");

    touchedTile = touchedTile.replace("tile", "");

    if (ClickedTileArray[0] == "000") {
        ClickedTileArray[0] = touchedTile;
    }
    else {
        ClickedTileArray.push(touchedTile);
    }
});


app.get("/PostNewColorString", function (req, res) {
    console.log("function /PostNewColorString")
    res.send(
        {
            "command": "display/add",
            "animType": "static",
            "animData": PostedColorstring,
            "loop": false
        }
    )
});


// Offical Endpoints
app.get("/currentColorString", function (req, res) {
    console.log("function /currentColorString")
    res.send(
        {
            "command": "display/add",
            "animType": "static",
            "animData": ColorstringFromFE,
            "loop": false
        }
    )
});

app.get("/lastTouchedTiles", function (req, res) {
    console.log("function /lastTouchedTiles")
    var TileNumbers;
    console.log(ClickedTileArray);
    if (ClickedTileArray.length == 1) {
        var tempTileName = ClickedTileArray[0];
        var ArrayOfEvents = [{ "gesture": 0, "panelId": tempTileName }];
    }
    else {
        var tempTileName = ClickedTileArray[0].toString();
        var ArrayOfEvents = [{ "gesture": 0, "panelId": tempTileName }];
        for (TileNumbers = 1; TileNumbers < ClickedTileArray.length; TileNumbers++) {
            var SmallTouchDict = { "gesture": 0, "panelId": ClickedTileArray[TileNumbers] };
            ArrayOfEvents.push(SmallTouchDict);
        }
    }
    
    res.send(
        {
            "events": ArrayOfEvents
        }
    )
    ClickedTileArray = [];
});

app.post("/colorString", function (req, res) {
    console.log("function /colorstring")
    PostedColorstring = req.body.animData;
    res.send("Done.");
});


http.createServer(app).listen(3000, function () {
    console.log("Server started at port 3000")
})

