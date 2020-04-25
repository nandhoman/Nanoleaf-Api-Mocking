// Copyright Nand Homan, 2020 > Nandhoman.nl

var rows = 17;
var columns = 6;
var table = document.getElementById("table");

// -- X means X-axis and is equal to columns
// -- Y means Y-axis and is equal to rows

for (y = 1; y < rows + 1; y++) {
    var tr = document.createElement("tr");
    table.appendChild(tr).setAttribute("id", "row" + y);
}

for (y = 1; y < rows + 1; y++) {
    var rowNumber = "row" + y;
    var rowInTable = document.getElementById(rowNumber);
    for (x = 1; x < columns + 1; x++) {
        var td = document.createElement("td");
        var tileNumber = x + (y * columns) - columns;
        var tileNumberText = document.createTextNode(tileNumber);
        td.appendChild(tileNumberText); 
        var tileId = "tile" + tileNumber;
        rowInTable.appendChild(td).setAttribute("id", tileId);
    }
}

for (totalTile = 1; totalTile < (rows * columns + 1); totalTile++){
    var tileNumberId = "tile" + totalTile;
    var changeAbleDocument = document.getElementById(tileNumberId);
    changeAbleDocument.setAttribute("class", "AllTileClass");
    var SingleclickEvent = "SingleClickEvent('" + tileNumberId + "')";
    changeAbleDocument.setAttribute("onclick", SingleclickEvent);
}
