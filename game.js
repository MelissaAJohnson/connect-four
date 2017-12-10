  var vals = new Array()
  var gameActive = 0
  var redSpot = new Image()
  var blackSpot = new Image()
  var emptySpot = new Image()
  var emptyChecker = new Image()
  var redChecker = new Image()
  var blackChecker = new Image()
  var whosTurn = "red"
  var whosTurnSpot = new Image()
  var whosTurnChecker = new Image()
  var placeLoc
  var redPlayer
  var blackPlayer
  var whosFirst
  var lookForSrc
  var redScore = 0
  var blackScore = 0
  var someOneWon
  var rowsFull = 0

  redSpot.src = "img/fillred.gif"
  blackSpot.src = "img/fillblack.gif"
  emptySpot.src = "img/fillempty.gif"
  emptyChecker.src = "img/clearness.gif"
  redChecker.src = "img/redchecker.gif"
  blackChecker.src = "img/blackchecker.gif"
  whosTurnSpot.src = redSpot.src
  whosTurnChecker.src = redChecker.src

  function rePlay() {
    if (gameActive == 1) {
      clearBoard()
    }
    for (var c1 = 0; c1 <= 6; c1++) {
      vals[c1] = 0
    }
    gameActive = 1
    var matchMade = 1
    askForNames()
  }

  function clearBoard() {
    for (var a = 7; a <= 48; a++) {
      document.images[a].src = emptySpot.src
    }
  }

  function placeTop(picToPlace) {
    if (gameActive == 1) {
      document.images[picToPlace].src = whosTurnChecker.src
    }
  }

  function unPlaceTop(picToUnplace) {
    if (gameActive == 1) {
      document.images[picToUnplace].src = emptyChecker.src
    }
  }

  function dropIt(whichRow) {
    if (gameActive == 1) {
      placeLoc = (7 - vals[whichRow]) * 7 -7 + whichRow
      if (vals[whichRow] < 6) {
        document.images[placeLoc].src = whosTurnSpot.src
        vals[whichRow] = vals[whichRow] + 1
        checkForWinner(whosTurn)
        switchTurns()
        placeTop(whichRow)
      }
    }
  }

  function whoGoesFirst() {
    whosTurn = whosFirst
    switchTurns()
    if (whosFirst == "red") {
      whosFirst = "black"
    } else {
      whosFirst = "red"
    }
  }

  function switchTurns() {
    if (gameActive == 1) {
      if (whosTurn == "red") {
        whosTurn = "black"
        whosTurnSpot.src = blackSpot.src
        whosTurnChecker.src = blackChecker.src
        document.formo.texter.value = blackPlayer + "'s turn"
      } else {
        whosTurn = "red"
        whosTurnSpot.src = redSpot.src
        whosTurnChecker.src = redChecker.src
        document.formo.texter.value = redPlayer + "'s turn"
      }
    }
  }

  function askForNames() {
    if (gameActive == 1) {
      redScore = 0
      blackScore = 0
      document.formo.redScoreBoard.value = redScore + ""
      document.formo.blackScoreBoard.value = blackScore + ""
      matchMade = 1
      //redPlayer = Prompt.render("What is the name of the red player?", "")
      //blackPlayer = Prompt.render("What is the name of the black player?", "")
      //whosFirst = Prompt.render("Which player is going first?", "")
      if (redPlayer == null || redPlayer == "") {
        redPlayer = "Red player"
      }
      if (blackPlayer == null || blackPlayer == "") {
        blackPlayer = "Black player"
      }
      if (whosFirst == "r" || whosFirst == "red" || whosFirst == redPlayer) {
        document.formo.texter.value = redPlayer + "'s turn."
        whosTurn = "black"
        switchTurns()
        whosFirst = "red"
      } else {
        document.formo.texter.value = blackPlayer + "'s turn."
        whosTurn = "red"
        switchTurns()
        whosFirst = "black"
      }
    }
  }

  function checkForWinner(colorToCheck) {
    if (gameActive == 1) {
      //alert("func checkForWinner")
      someOneWon = 0
      if (colorToCheck == "red") {
        lookForSrc = redSpot.src
      }
      if (colorToCheck == "black") {
        lookForSrc = blackSpot.src
      }
      rowsFull = 0
      //alert("LookForSrc = " + lookForSrc + ".  And document.images[7].src = " + document.images[7].src)
      for (var counter = 7; counter <= 48; counter++) {
        if (document.images[counter].src == lookForSrc) {
          if ((counter + 3 <= 48
          && counter != 11 && counter != 12 && counter != 13
          && counter != 18 && counter != 19 && counter != 20
          && counter != 25 && counter != 26 && counter != 27
          && counter != 32 && counter != 33 && counter != 34
          && counter != 39 && counter != 40 && counter != 41
          && document.images[counter + 1].src == lookForSrc
          && document.images[counter + 2].src == lookForSrc
          && document.images[counter + 3].src == lookForSrc)
          || (counter + 3 * 7 <= 48
          && document.images[counter + 7].src == lookForSrc
          && document.images[counter + 7*2].src == lookForSrc
          && document.images[counter + 7*3].src == lookForSrc)
          || (counter + 3 * 7 <= 48
          && counter != 11 && counter != 12 && counter != 13
          && counter != 18 && counter != 19 && counter != 20
          && counter != 25 && counter != 26 && counter != 27
          && document.images[counter + 7 + 1].src == lookForSrc
          && document.images[counter + 7*2 + 2].src == lookForSrc
          && document.images[counter + 7*3 + 3].src == lookForSrc)
          || (counter - 3 * 7 >= 7
          && counter != 32 && counter != 33 && counter != 34
          && counter != 39 && counter != 40 && counter != 41
          && counter != 46 && counter != 47 && counter != 48
          && document.images[counter - 7 + 1].src == lookForSrc
          && document.images[counter - 7*2 + 2].src == lookForSrc
          && document.images[counter - 7*3 + 3].src == lookForSrc)) {
            for (var c2 = 0; c2<= 6; c2++) {
              unPlaceTop(c2)
            }
            if (colorToCheck == "red") {
              Alert.render(redPlayer + " Wins!")
              redScore += 1
            } else if (colorToCheck == "black") {
              Alert.render(blackPlayer + " wins!")
              blackScore += 1
            }
            gameActive = 0
            someOneWon = 1
            counter = 49
            document.formo.redScoreBoard.value = redScore + ""
            document.formo.blackScoreBoard.value = blackScore + ""
          }
        }
      }
      if (someOneWon != 1) {
        for (var poo = 0; poo <= 6; poo++) {
          if (vals[poo] == 6) {
            rowsFull += 1
          }
        }
        if (rowsFull == 7) {
          for (var c3 = 0; c3<= 6; c3++) {
            unPlaceTop(c3)
          }
          gameActive = 0
          Alert.render("This game has reached a draw.")
        }
      }
    }
  }

  function newGame() {
    Confirm.render("Are you sure you want to start a new game?")
  }

  function newGameStart() {
    document.formo.redScoreBoard.value = redScore + ""
    document.formo.blackScoreBoard.value = blackScore + ""
    rePlay()
    if (matchMade == 1) {
      gameActive = 1
      rePlay()
      //whoGoesFirst()
    }
  }

  function newMatchUp() {
    clearBoard()
    if (matchMade == 1) {
      gameActive = 1
      for (var c1 = 0; c1 <= 6; c1++) {
        vals[c1] = 0
      }
    }
  }

  function setMsg(whatToSay) {
    window.status = whatToSay
    return true
  }

  function CustomAlert(){
  	this.render = function(dialog){
  		var winW = window.innerWidth;
  	    var winH = window.innerHeight;
  		var dialogoverlay = document.getElementById('dialogoverlay');
  	    var dialogbox = document.getElementById('dialogbox');
  		dialogoverlay.style.display = "block";
  	    dialogoverlay.style.height = winH+"px";
  		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
  	    dialogbox.style.top = "100px";
  	    dialogbox.style.display = "block";
  		document.getElementById('dialogboxhead').innerHTML = "Alert";
  	    document.getElementById('dialogboxbody').innerHTML = dialog;
  		document.getElementById('dialogboxfoot').innerHTML = '<button class="btn btn-defaul" onclick="Alert.ok()">Close</button>';
  	}
  	this.ok = function(){
  		document.getElementById('dialogbox').style.display = "none";
  		document.getElementById('dialogoverlay').style.display = "none";
  	}
  }

  var Alert = new CustomAlert();
  function CustomConfirm(){
  	this.render = function(dialog,op,id){
  		var winW = window.innerWidth;
  	    var winH = window.innerHeight;
  		var dialogoverlay = document.getElementById('dialogoverlay');
  	    var dialogbox = document.getElementById('dialogbox');
  		dialogoverlay.style.display = "block";
  	    dialogoverlay.style.height = winH+"px";
  		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
  	    dialogbox.style.top = "100px";
  	    dialogbox.style.display = "block";

  		document.getElementById('dialogboxhead').innerHTML = "Confirm";
  	    document.getElementById('dialogboxbody').innerHTML = dialog;
  		document.getElementById('dialogboxfoot').innerHTML = '<button class="btn btn-default" onclick="Confirm.yes()">Yes</button> <button class="btn btn-defaul" onclick="Confirm.no()">No</button>';
  	}
  	this.no = function(){
  		document.getElementById('dialogbox').style.display = "none";
  		document.getElementById('dialogoverlay').style.display = "none";
  	}
  	this.yes = function(){
  		document.getElementById('dialogbox').style.display = "none";
  		document.getElementById('dialogoverlay').style.display = "none";
      newGameStart()
  	}
  }

  var Confirm = new CustomConfirm();
  function CustomPrompt(){
  	this.render = function(dialog,func){
  		var winW = window.innerWidth;
  	    var winH = window.innerHeight;
  		var dialogoverlay = document.getElementById('dialogoverlay');
  	    var dialogbox = document.getElementById('dialogbox');
  		dialogoverlay.style.display = "block";
  	    dialogoverlay.style.height = winH+"px";
  		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
  	    dialogbox.style.top = "100px";
  	    dialogbox.style.display = "block";
  		document.getElementById('dialogboxhead').innerHTML = dialog;
  		document.getElementById('dialogboxbody').innerHTML += '<br><input id="prompt_value1">';
  		document.getElementById('dialogboxfoot').innerHTML = '<button class="btn btn-default" onclick="Prompt.cancel()">Computer Selects</button>   <button onclick="Prompt.ok()" class="btn btn-primary">OK</button>';
  	}
  	this.cancel = function(){
  		document.getElementById('dialogbox').style.display = "none";
  		document.getElementById('dialogoverlay').style.display = "none";
  	}
  	this.ok = function(){
  		var prompt_value1 = document.getElementById('prompt_value1').value;
  		window[func](prompt_value1);
  		document.getElementById('dialogbox').style.display = "none";
  		document.getElementById('dialogoverlay').style.display = "none";
  	}
  }
  var Prompt = new CustomPrompt();
