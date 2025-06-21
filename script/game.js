
//Compare current player points with points to win
function checkCurrentPlayer() {

   //Get web storage data
   var strGamestatMode = localStorage.getItem("KeepYourScore?gamestat-mode");
   var strGamestatEndpoints = localStorage.getItem("KeepYourScore?gamestat-endpoints");
   var strGamestatCurrPlayer = localStorage.getItem("KeepYourScore?gamestat-currplayer");
   var strPlayerstatPoints = localStorage.getItem("KeepYourScore?playerstat-points");
   /*
   var strGamestatMode = "1112";
   var strGamestatEndpoints = "10000";
   var strGamestatCurrPlayer = "1";
   var strPlayerstatPoints = "14,10,10,6,6,4";
   */

   //Input conversions
   var numGamestatEndpoints = Number(strGamestatEndpoints);
   var numGamestatCurrPlayer = Number(strGamestatCurrPlayer);
   const arrPlayerstatPoints = strPlayerstatPoints.split(",");

   //Get current player points
   strCurrentPlayerPoints = arrPlayerstatPoints[numGamestatCurrPlayer - 1];
   numCurrentPlayerPoints = Number(strCurrentPlayerPoints);

   //Define next step in game cycle
   switch(strGamestatMode) {
   case "1111": case "1112": case "1121": case "1122":
      if (numCurrentPlayerPoints >= numGamestatEndpoints) {
         getNextPlayer();
      } else {
         displayCurrentPlayer();
      }
      break;

   case "1211": case "1212": case "1221": case "1222":
      if (numCurrentPlayerPoints <= numGamestatEndpoints) {
         getNextPlayer();
      } else {
         displayCurrentPlayer();
      }
      break;
   }

}



//Get next player in game cycle or end game
function getNextPlayer() {

   //Get web storage data
   var strGamestatMode = localStorage.getItem("KeepYourScore?gamestat-mode");
   var strGamestatRound = localStorage.getItem("KeepYourScore?gamestat-gameround");
   var strGamestatNumPlayer = localStorage.getItem("KeepYourScore?gamestat-numplayer");
   var strGamestatCurrPlayer = localStorage.getItem("KeepYourScore?gamestat-currplayer");
   var strPlayerstatPoints = localStorage.getItem("KeepYourScore?playerstat-points");
   /*
   var strGamestatMode = "1112";
   var strGamestatRound = "1";
   var strGamestatNumPlayer = "6";
   var strGamestatCurrPlayer = "1";
   var strPlayerstatPoints = "14,10,10,6,6,4";
   */

   //Input conversions
   var numGamestatRound = Number(strGamestatRound);
   var numGamestatNumPlayer = Number(strGamestatNumPlayer);
   var numGamestatCurrPlayer = Number(strGamestatCurrPlayer);
   const arrPlayerstatPoints = strPlayerstatPoints.split(",").map(Number);         //Array of numbers

   //Check how to continue the game cycle
   if (numGamestatCurrPlayer < numGamestatNumPlayer) {

      //Get next player
      numGamestatCurrPlayer++;
      localStorage.setItem("KeepYourScore?gamestat-currplayer", numGamestatCurrPlayer);

   } else if (numGamestatCurrPlayer == numGamestatNumPlayer) {

      //Check end of game
      switch(strGamestatMode) {
      case "1111": case "1121": case "1211": case "1221":

         //Check player points - one player reaches final points
         if (arrPlayerstatPoints.some(checkPoints)) {
            localStorage.setItem("KeepYourScore?gamestat-status", "2");
            window.location = "./results";
            return;
         }
         break;

      case "1112": case "1122": case "1212": case "1222":

         //Check player points - every player reaches final points
         if (arrPlayerstatPoints.every(checkPoints)) {
            localStorage.setItem("KeepYourScore?gamestat-status", "2");
            window.location = "./results";
            return;
         }
         break;
      }

      //Start next game round
      numGamestatRound++;
      localStorage.setItem("KeepYourScore?gamestat-gameround", numGamestatRound);

      numGamestatCurrPlayer = 1;
      localStorage.setItem("KeepYourScore?gamestat-currplayer", numGamestatCurrPlayer);

   }

   checkCurrentPlayer();

}



function checkPoints(points) {

   //Get web storage data
   var strGamestatMode = localStorage.getItem("KeepYourScore?gamestat-mode");
   var strGamestatEndpoints = localStorage.getItem("KeepYourScore?gamestat-endpoints");
   /*
   var strGamestatMode = "1112";
   var strGamestatEndpoints = "10000";
   */

   //Input conversions
   var numGamestatEndpoints = Number(strGamestatEndpoints);
   var points = Number(points);

   //
   switch(strGamestatMode) {
   case "1111": case "1112": case "1121": case "1122":
      return points >= numGamestatEndpoints;
      break;

   case "1211": case "1212": case "1221": case "1222":
      return points <= numGamestatEndpoints;
      break;
   }
}



//Display the player that plays the next round
function displayCurrentPlayer() {

   //Get web storage data
   var strGamestatMode = localStorage.getItem("KeepYourScore?gamestat-mode");
   var strGamestatRound = localStorage.getItem("KeepYourScore?gamestat-gameround");
   var strGamestatNumPlayer = localStorage.getItem("KeepYourScore?gamestat-numplayer");
   var strGamestatCurrPlayer = localStorage.getItem("KeepYourScore?gamestat-currplayer");
   var strPlayerstatNames = localStorage.getItem("KeepYourScore?playerstat-names");
   var strPlayerstatPoints = localStorage.getItem("KeepYourScore?playerstat-points");
   /*
   var strGamestatMode = "1112";
   var strGamestatRound = "1";
   var strGamestatNumPlayer = "6";
   var strGamestatCurrPlayer = "1";
   var strPlayerstatNames = "Lisi,Chrisi,Sarah,Fabi,Vale,Isi";
   var strPlayerstatPoints = "14,10,10,6,6,4";
   */

   //Get IDs
   var divPlayerstatsName = document.getElementById("js-div-playerstatsName");
   var divPlayerstatsGameround = document.getElementById("js-div-playerstatsGameround");
   var divPlayerstatsPlayer = document.getElementById("js-div-playerstatsPlayer");
   var divPlayerstatsPoints = document.getElementById("js-div-playerstatsPoints");
   var divInputCalcValue = document.getElementById("js-input-calcValue");
   var divLangSettings = document.getElementById("js-div-pageLanguage");

   //Input conversions
   var numGamestatCurrPlayer = Number(strGamestatCurrPlayer);
   const arrPlayerstatNames = strPlayerstatNames.split(",");
   const arrPlayerstatPoints = strPlayerstatPoints.split(",");

   //Get current player stats
   strCurrentPlayerName = arrPlayerstatNames[numGamestatCurrPlayer - 1];
   strCurrentPlayerPoints = arrPlayerstatPoints[numGamestatCurrPlayer - 1];

   //Display game values
   switch (divLangSettings.innerHTML) {
   case "en": 
      divPlayerstatsName.innerHTML = strCurrentPlayerName + "'S TURN";
      divPlayerstatsGameround.innerHTML = "Round " + strGamestatRound;
      divPlayerstatsPlayer.innerHTML = "Player " + strGamestatCurrPlayer + "/" + strGamestatNumPlayer;
      switch(strGamestatMode) {
      case "1111": case "1112": case "1121": case "1122":
         divInputCalcValue.placeholder = "Add points";
         break;
      case "1211": case "1212": case "1221": case "1222":
         divInputCalcValue.placeholder = "Substract points";
         break;
      }
      break;
   case "de":
      divPlayerstatsName.innerHTML = strCurrentPlayerName + "'S ZUG";
      divPlayerstatsGameround.innerHTML = "Runde " + strGamestatRound;
      divPlayerstatsPlayer.innerHTML = "Spieler " + strGamestatCurrPlayer + "/" + strGamestatNumPlayer;
      switch(strGamestatMode) {
      case "1111": case "1112": case "1121": case "1122":
         divInputCalcValue.placeholder = "Addiere Punkte";
         break;
      case "1211": case "1212": case "1221": case "1222":
         divInputCalcValue.placeholder = "Subtrahiere Punkte";
         break;
      }
      break;
   }
   divPlayerstatsPoints.innerHTML = strCurrentPlayerPoints;
}



//Calculate the new values of the current player after user input
function calcNewPlayerValues() {

   //Get web storage data
   var strGamestatMode = localStorage.getItem("KeepYourScore?gamestat-mode");
   var strGamestatCurrPlayer = localStorage.getItem("KeepYourScore?gamestat-currplayer");
   var strPlayerstatPoints = localStorage.getItem("KeepYourScore?playerstat-points");
   var strPlayerstatRounds = localStorage.getItem("KeepYourScore?playerstat-rounds");
   /*
   var strGamestatMode = "1112";
   var strGamestatCurrPlayer = "1";
   var strPlayerstatPoints = "14,10,10,6,6,4";
   var strPlayerstatRounds = "13,10,10,13,9,15";
   */

   //Get IDs
   var divModalContainer = document.getElementById("js-div-modalContainer");
   var divModalSmall = document.getElementById("js-div-modalSmall");
   var divModalSmallContent = document.getElementById("js-div-modalSmallContent");
   var divInputCalcValue = document.getElementById("js-input-calcValue");
   var divLangSettings = document.getElementById("js-div-pageLanguage");

   //Declare variables
   var numNewPlayerPoints;
   var numNewPlayerRound;

   //Input conversions
   var numGamestatCurrPlayer = Number(strGamestatCurrPlayer);
   const arrPlayerstatPoints = strPlayerstatPoints.split(",").map(Number);         //Array of numbers
   const arrPlayerstatRounds = strPlayerstatRounds.split(",").map(Number);         //Array of numbers
   var numInputCalcValue = Number(divInputCalcValue.value);

   //Get current player stats
   numCurrentPlayerPoints = arrPlayerstatPoints[numGamestatCurrPlayer - 1];
   numCurrentPlayerRound = arrPlayerstatRounds[numGamestatCurrPlayer - 1];

   //Calculate new player stats
   switch(strGamestatMode) {
   case "1111": case "1112": case "1121": case "1122":
      numNewPlayerPoints = numCurrentPlayerPoints + numInputCalcValue;
      break;
   case "1211": case "1212": case "1221": case "1222":
      numNewPlayerPoints = numCurrentPlayerPoints - numInputCalcValue;
      break;
   }

   numNewPlayerRound = numCurrentPlayerRound + 1;


   /* --- Error handling --- */
   //Condition for correct entry
   var check = true;
   var infoText = "";

   //Error text for incorrect entries
   switch (divLangSettings.innerHTML) {
   case "en": 
      infoText += "<b>Wrong user input.</b> Please recheck following criteria:<br>"
      break;
   case "de":
      infoText += "<b>Fehlerhafte Eingabe.</b> Bitte überprüfe folgende Kriterien:<br>"
      break;
   }

   //Check input
   if (!numNewPlayerPoints) {

      check = false;

      switch (divLangSettings.innerHTML) {
      case "en": 
         infoText += "<b>&#10137;</b> Entered points are not a number.<br>";
         infoText += "<b>&#10137;</b> Decimals are separated by a point (e.g. 3.41).<br>";
         break;
      case "de":
         infoText += "<b>&#10137;</b> Eingegebene Punkte sind keine Zahl.<br>";
         infoText += "<b>&#10137;</b> Dezimalstellen werden durch einen Punkt getrennt (z.B. 3.41).<br>";
         break;
      }

   }

   //Results of input check
   if (check) {

      //Save new player values
      arrPlayerstatPoints[numGamestatCurrPlayer - 1] = numNewPlayerPoints;
      arrPlayerstatRounds[numGamestatCurrPlayer - 1] = numNewPlayerRound;

      localStorage.setItem("KeepYourScore?playerstat-points", arrPlayerstatPoints);
      localStorage.setItem("KeepYourScore?playerstat-rounds", arrPlayerstatRounds);

      //Continue with next player via loading screen
      loadingScreen();

   } else {

      //Display modal
      divModalSmallContent.innerHTML = infoText;
      divModalContainer.style.display = "block";
      divModalSmall.style.display = "flex";
   }

}



//Blurry loading screen between two players
function loadingScreen() {

   //Get IDs
   var divPlayerstatsName = document.getElementById("js-div-playerstatsName");
   var divPlayerstatsGameround = document.getElementById("js-div-playerstatsGameround");
   var divPlayerstatsPlayer = document.getElementById("js-div-playerstatsPlayer");
   var divPlayerstatsPoints = document.getElementById("js-div-playerstatsPoints");

   //Add blurry style
   divPlayerstatsName.classList.add("ct--blurry");
   divPlayerstatsGameround.classList.add("ct--blurry");
   divPlayerstatsPlayer.classList.add("ct--blurry");
   divPlayerstatsPoints.classList.add("ct--blurry");

   //Remove blurry style after random timeout and continue with next player
   setTimeout(function() {
      divPlayerstatsName.classList.remove("ct--blurry");
      divPlayerstatsGameround.classList.remove("ct--blurry");
      divPlayerstatsPlayer.classList.remove("ct--blurry");
      divPlayerstatsPoints.classList.remove("ct--blurry");

      getNextPlayer();

   }, Math.floor(Math.random() * (300)) + 400);

}