// Copyright Nand Homan, 2020 > Nandhoman.nl

var lastColorCode = "";

function colorProccesor(dict) {
  var stringOfColors = dict.toString();
  var arrayOfColors = stringOfColors.split(" ");
  var numberInArray;
  // console.log(arrayOfColors[0]);
  for (numberInArray = 1; numberInArray < 102 * 7; numberInArray += 7) {
    var tile = arrayOfColors[numberInArray];
    var red = arrayOfColors[numberInArray + 2];
    var green = arrayOfColors[numberInArray + 3];
    var blue = arrayOfColors[numberInArray + 4];
    var white = arrayOfColors[numberInArray + 5];
    var time = arrayOfColors[numberInArray + 6];
    var tileName = "tile" + tile;
    var PanelInHtml = document.getElementById(tileName);
    var RGBcolorInString = "rgb(" + red + ", " + green + ", " + blue + ")";
    // console.log(PanelInHtml, RGBcolorInString);
    PanelInHtml.style.backgroundColor = RGBcolorInString;
  }
}

function colorProccesoralreadystring(dict) {
  var stringOfColors = dict;
  var arrayOfColors = stringOfColors.split(" ");
  var numberInArray;
  // console.log(arrayOfColors);
  for (numberInArray = 1; numberInArray < 102 * 7; numberInArray += 7) {
    var tile = arrayOfColors[numberInArray];
    var red = arrayOfColors[numberInArray + 2];
    var green = arrayOfColors[numberInArray + 3];
    var blue = arrayOfColors[numberInArray + 4];
    var white = arrayOfColors[numberInArray + 5];
    var time = arrayOfColors[numberInArray + 6];
    var tileName = "tile" + tile;
    var PanelInHtml = document.getElementById(tileName);
    var RGBcolorInString = "rgb(" + red + ", " + green + ", " + blue + ")";
    // console.log(PanelInHtml, RGBcolorInString);
    PanelInHtml.style.backgroundColor = RGBcolorInString;
  }
}

function getColorstring() {
  var ColorStringToSendBack = "102 ";
  var AllTile;
  for (AllTile = 1; AllTile < ((rows * columns) + 1); AllTile++) {
    var TileIdforGetColorstring = "tile" + AllTile;
    TileInHTML = document.getElementById(TileIdforGetColorstring);
    var role1 = AllTile;
    var role2 = "1";
    var color = TileInHTML.style.backgroundColor;
    color = color.replace("rgb(", "")
    color = color.replace(")", "")
    var colorarray = color.split(", ")
    // console.log(AllTile, colorarray);
    var role3 = colorarray[0];
    var role4 = colorarray[1];
    var role5 = colorarray[2];
    var role6 = "200";
    ColorStringToSendBack = ColorStringToSendBack + role1 + " " + role2 + " " + role3 + " " + role4 + " " + role5 + " 0 " + role6 + " ";
  }
  return ColorStringToSendBack
}

function ClickEvent(tile) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
      var dict = JSON.parse(this.responseText);
      // console.log(dict["animData"])
      var lastColorCode = dict["animData"];
      // console.log(lastColorCode);
      colorProccesoralreadystring(lastColorCode);
    }
  };
  console.log(tile);
  var colorstring = "colorstring=" + getColorstring();
  console.log(getColorstring());
  var dataTouchedTile = "data=" + tile + "&" + colorstring;
  xhttp.open("POST", "http://nanoleaf.nandhoman.nl:3000/levelContinuation", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(dataTouchedTile);
}

var oldColorString = "hoi";
function updateCurrentColorString() {
  ThisColorString = getColorstring();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) { };
  }
  console.log("started Update Current Colorstring");

  var colorstring = "colorstring=" + getColorstring();
  console.log(getColorstring());
  var ColorstringFor1BE = colorstring;
  xhttp.open("Post", "http://nanoleaf.nandhoman.nl:3000/currentColorStringFormFE", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(ColorstringFor1BE);
  oldColorString = getColorstring();
};

var TileNumber;

function setAllWhite() {
  for (TileNumber = 1; TileNumber < (rows * columns) + 1; TileNumber++) {
    var tile = TileNumber;
    var red = "255";
    var green = "255";
    var blue = "255";
    var white = "0";
    var time = "1";
    var tileName = "tile" + tile;
    var PanelInHtml = document.getElementById(tileName);
    var RGBcolorInString = "rgb(" + red + ", " + green + ", " + blue + ")";
    PanelInHtml.style.backgroundColor = RGBcolorInString;
  }
}

function SingleClickEvent(tile) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) { }
  };
  var dataTouchedTile = "data=" + tile;
  xhttp.open("POST", "http://nanoleaf.nandhoman.nl:3000/singleClickEvent", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(dataTouchedTile);
}

function getNewColorString() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var dict = JSON.parse(this.responseText);
      // console.log(dict["animData"])
      var lastColorCode = dict["animData"];
      // console.log(lastColorCode);
      colorProccesoralreadystring(lastColorCode);
    }
  };
  xhttp.open("GET", "http://nanoleaf.nandhoman.nl:3000/PostNewColorString", true);
  xhttp.send();
  updateCurrentColorString();
}

setAllWhite();
updateCurrentColorString();
  
setInterval(getNewColorString, 200);
