
var numOfMoves = 0;
var checkedBoxes = 0;

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


var tileNumbers = [1,2,3,4,5,6,7,8,9];
var copiedTileNumbers = [1,2,3,4,5,6,7,8,9];
var shuffledTileNumbers = shuffle(copiedTileNumbers);


function generateGrid() {
    var grid = document.getElementById("grid");


    for (var i = 0; i < 9; i++) {
        grid.innerHTML +='<div class="box"><input onclick="checkTileLimit()" class="tile-checkbox" type="checkbox"/><br/><img id="img-'+shuffledTileNumbers[i]+'" src="images/'+shuffledTileNumbers[i]+'.png"/></div>'

    }
}

function checkTileLimit() {
    var checkboxes = document.getElementsByClassName("tile-checkbox");
    var counter = 0;
    for(var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            counter++;
        }
    }
    
    if (counter == 2) {
        for (var i = 0; i < checkboxes.length; i++) {
            if (!checkboxes[i].checked)
                checkboxes[i].disabled= true;
        }
        return;
    } else {
        for (var i = 0; i < checkboxes.length; i++) {
            if (!checkboxes[i].checked)
                checkboxes[i].disabled= false;
        }
    }

}

function swap() {
    var checkboxes = document.getElementsByClassName("tile-checkbox");
    var counter = 0;
    for(var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            counter++;
        }
    }
    

    if (counter < 2) {
        alert("Please select 2 images!");
        return;
    }

    numOfMoves++;
    var moveSpan = document.getElementById("moves");
    moveSpan.innerHTML = "Moves:" +numOfMoves;


    var checkboxes = document.getElementsByClassName("tile-checkbox");
    var numbers = [];
    var indexes = [];

    for (var i =0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            numbers.push(shuffledTileNumbers[i]);
            indexes.push(i);
            checkboxes[i].checked = false;
        } else {
            checkboxes[i].disabled = false;
        }
    }

    var imgElement1 = document.getElementById("img-"+numbers[0]);
    var imgElement2 = document.getElementById("img-"+numbers[1]);
    


    var imgTmp = imgElement1.src;
    imgElement1.src = imgElement2.src;
    imgElement2.src = imgTmp;

    var tmpId = "img-"+numbers[0];
    imgElement1.id = imgElement2.id;
    imgElement2.id = tmpId;

    var tempNum = shuffledTileNumbers[indexes[0]];
    shuffledTileNumbers[indexes[0]] = shuffledTileNumbers[indexes[1]];
    shuffledTileNumbers[indexes[1]] = tempNum;

    finishedGame();
}

function finishedGame() {
    for (var i = 0; i< 9; i++) {
        if(shuffledTileNumbers[i] != tileNumbers[i])
            return;
    }
    alert('You won the game!');
}