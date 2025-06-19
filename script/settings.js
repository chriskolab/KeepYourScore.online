

//Add player in HTML grid
function addPlayer() {

   //Create div element for whitespace
   var elementWhitespace = document.createElement("div");
   elementWhitespace.setAttribute("class", "bc-players__whitespace");

   //Create input element for player names
   var elementInput = document.createElement("input");
   elementInput.setAttribute("type", "text");
   elementInput.setAttribute("maxlength", "15");
   elementInput.setAttribute("class", "input--standard bc-players__input input--shape1");

   //Create button element to remove players
   var elementButton = document.createElement("button");
   elementButton.setAttribute("id", "js-btn-removePlayers");
   elementButton.setAttribute("btn-state", "is-disabled");
   elementButton.setAttribute("class", "bc-players__btn-actions bc-players__actions--delete");

   //Add elements to grid
   document.getElementById("js-div-playerGrid").appendChild(elementWhitespace);
   document.getElementById("js-div-playerGrid").appendChild(elementInput);
   document.getElementById("js-div-playerGrid").appendChild(elementButton);

}

//Remove player in HTML grid
function removePlayer(e) {

   //Get self element
   //Trigger only for elements that have delete action class (event bubbling)
   if (e.target.classList.contains("bc-players__actions--delete")) {
      e.target.previousElementSibling.remove();
      e.target.previousElementSibling.remove();
      e.target.remove();
   }

}


//Check entries
function checkGameEntries() {

   //Get IDs
   var inputConda2 = document.getElementById("js-input-cond-a-2");
   var inputConda3 = document.getElementById("js-input-cond-a-3");
   var inputCond11 = document.getElementById("js-input-cond-1-1");
   var inputPlayers = document.getElementsByClassName("bc-players__input");
   var divModalContainer = document.getElementById("js-div-modalContainer");
   var divModalSmall = document.getElementById("js-div-modalSmall");
   var divModalSmallContent = document.getElementById("js-div-modalSmallContent");
   var divLangSettings = document.getElementById("js-div-pageLanguage");



   /* --- Error handling --- */
   //Condition for correct entries
   var check = true;
   var infoText = "";

   //Error text for incorrect entries
   switch (divLangSettings.innerHTML) {
   case "en": 
      infoText += "<b>Game can not start.</b> Please recheck following input fields:<br>"
      break;
   case "de":
      infoText += "<b>Spiel kann nicht gestartet werden.</b> Bitte überprüfe folgende Eingabefelder:<br>"
      break;
   }

   //Check inputs
   if (!inputConda2.value) {

      check = false;

      switch (divLangSettings.innerHTML) {
      case "en": 
         infoText += "<b>&#10137;</b> Points at start are not set or not a number.<br>";
         break;
      case "de":
         infoText += "<b>&#10137;</b> Feld für die Startpunktzahl ist leer oder keine Zahl.<br>";
         break;
      }

   }

   if (!inputCond11.value) {

      check = false;

      switch (divLangSettings.innerHTML) {
      case "en": 
         infoText += "<b>&#10137;</b> Points to win are not set or not a number.<br>";
         break;
      case "de":
         infoText += "<b>&#10137;</b> Feld für die Zielpunktzahl ist leer oder keine Zahl.<br>";
         break;
      }

   }

   if (!inputConda2.value || !inputCond11.value) {

      check = false;

      switch (divLangSettings.innerHTML) {
      case "en": 
         infoText += "<b>&#10137;</b> Decimals are separated by a point (e.g. 3.41).<br>";
         break;
      case "de":
         infoText += "<b>&#10137;</b> Dezimalstellen werden durch einen Punkt getrennt (z.B. 3.41).<br>";
         break;
      }

   }

   if (inputConda2.value == inputCond11.value) {

      check = false;

      switch (divLangSettings.innerHTML) {
      case "en": 
         infoText += "<b>&#10137;</b> Start and end points must be different.<br>";
         break;
      case "de":
         infoText += "<b>&#10137;</b> Start- und Endpunktzahl müssen sich unterscheiden.<br>";
         break;
      }

   }

   if (inputConda3.value == -100) {

      check = false;

      switch (divLangSettings.innerHTML) {
      case "en": 
         infoText += "<b>&#10137;</b> Winning condition is not set.<br>";
         break;
      case "de":
         infoText += "<b>&#10137;</b> Gewinnbedingung ist nicht gesetzt.<br>";
         break;
      }

   }

   if (inputPlayers.length == 0) {

      check = false;

      switch (divLangSettings.innerHTML) {
      case "en": 
         infoText += "<b>&#10137;</b> You need at least one player.<br>";
         break;
      case "de":
         infoText += "<b>&#10137;</b> Spieleranzahl muss mindestens Eins sein.<br>";
         break;
      }
   }

   //Results of input check
   if (check) {

      //Start game
      startGame();

   } else {

      //Display modal
      divModalSmallContent.innerHTML = infoText;
      divModalContainer.style.display = "block";
      divModalSmall.style.display = "flex";
   }

}

//Store user input in web storage and start game scoreboard
function startGame() {

   //Get IDs
   var inputConda1 = {value: 1};
   var inputConda2 = document.getElementById("js-input-cond-a-2");
   var inputConda3 = document.getElementById("js-input-cond-a-3");
   var inputCond11 = document.getElementById("js-input-cond-1-1");
   var inputCond12 = document.getElementById("js-input-cond-1-2");

   var players = document.getElementsByClassName("bc-players__input");

   //Clear game items in web storage if exist
   const keysToRemove = ["KeepYourScore?gamestat-status",
                         "KeepYourScore?gamestat-mode",
                         "KeepYourScore?gamestat-gameround",
                         "KeepYourScore?gamestat-startpoints",
                         "KeepYourScore?gamestat-endpoints",
                         "KeepYourScore?gamestat-numplayer",
                         "KeepYourScore?gamestat-currplayer",
                         "KeepYourScore?playerstat-names",
                         "KeepYourScore?playerstat-points",
                         "KeepYourScore?playerstat-rounds"];

   for (key of keysToRemove) {
      localStorage.removeItem(key);
   }

   //Set game mode
   switch (true) {
   case (inputConda1.value == "1" && inputConda2.value < inputCond11.value && inputConda3.value == "0" && inputCond12.checked == true):
      console.log("gamemode 1111")
      gameMode = "1111";
      break;
   case (inputConda1.value == "1" && inputConda2.value < inputCond11.value && inputConda3.value == "0" && inputCond12.checked == false):
      console.log("gamemode 1112")
      gameMode = "1112";
      break;
   case (inputConda1.value == "1" && inputConda2.value < inputCond11.value && inputConda3.value == "2" && inputCond12.checked == true):
      console.log("gamemode 1121")
      gameMode = "1121";
      break;
   case (inputConda1.value == "1" && inputConda2.value < inputCond11.value && inputConda3.value == "2" && inputCond12.checked == false):
      console.log("gamemode 1122")
      gameMode = "1122";
      break;
   case (inputConda1.value == "1" && inputConda2.value > inputCond11.value && inputConda3.value == "0" && inputCond12.checked == true):
      console.log("gamemode 1211")
      gameMode = "1211";
      break;
   case (inputConda1.value == "1" && inputConda2.value > inputCond11.value && inputConda3.value == "0" && inputCond12.checked == false):
      console.log("gamemode 1212")
      gameMode = "1212";
      break;
   case (inputConda1.value == "1" && inputConda2.value > inputCond11.value && inputConda3.value == "2" && inputCond12.checked == true):
      console.log("gamemode 1221")
      gameMode = "1221";
      break;
   case (inputConda1.value == "1" && inputConda2.value > inputCond11.value && inputConda3.value == "2" && inputCond12.checked == false):
      console.log("gamemode 1222")
      gameMode = "1222";
      break;
   default:
      console.log("error")
      break;
   }

   //Get and concatenate player names separated by comma
   var numPlayers = players.length;
   var playerNames = "";         //Initial values

   for (var i = 0; i < numPlayers; i++) {

      var name = players[i].value;
      playerNames += name;
      playerNames += ",";

   }

   playerNames = playerNames.slice(0,-1);       //Remove last comma from string

   //Set starting points and game round from each player
   var playerPoints = "";
   var playerRounds = "";

   for (var i = 0; i < numPlayers; i++) {

      playerPoints += inputConda2.value.toString();
      playerPoints += ",";

      playerRounds += "1";
      playerRounds += ","; 

   }

   playerPoints = playerPoints.slice(0,-1);        //Remove last comma from string
   playerRounds = playerRounds.slice(0,-1);        //Remove last comma from string

   //Store game items in web storage
   localStorage.setItem("KeepYourScore?gamestat-status", "1");
   localStorage.setItem("KeepYourScore?gamestat-mode", gameMode);
   localStorage.setItem("KeepYourScore?gamestat-gameround", "1");
   localStorage.setItem("KeepYourScore?gamestat-startpoints", inputConda2.value);
   localStorage.setItem("KeepYourScore?gamestat-endpoints", inputCond11.value);
   localStorage.setItem("KeepYourScore?gamestat-numplayer", numPlayers);
   localStorage.setItem("KeepYourScore?gamestat-currplayer", "1");
   localStorage.setItem("KeepYourScore?playerstat-names", playerNames);
   localStorage.setItem("KeepYourScore?playerstat-points", playerPoints);
   localStorage.setItem("KeepYourScore?playerstat-rounds", playerRounds);

   //Start game
   window.location = "./game";
   
}
