

//Check web storage settings from used browser
function checkWebStorage() {

   //Get IDs from button and modal
   var divModalContainer = document.getElementById("js-div-modalContainer");
   var divModalSmall = document.getElementById("js-div-modalSmall");
   var divModalSmallContent = document.getElementById("js-div-modalSmallContent");
   var divLangSettings = document.getElementById("js-div-pageLanguage");

   //Try web storage and write string into dynamic dictionary
   var sample = "sampletext";            //Example entry for web storage

   try {
      localStorage.setItem(sample, sample);           //Store item in web storage
      localStorage.removeItem(sample);             //Remove item from web storage
      switch (divLangSettings.innerHTML) {
      case "en": 
         divModalSmallContent.innerHTML = "Web Storage is enabled. You are good to go.";
         break;
      case "de":
         divModalSmallContent.innerHTML = "Web Storage ist freigeschaltet. Es kann los gehen.";
         break;
      }
      
   } catch(err) {
      switch (divLangSettings.innerHTML) {
      case "en": 
         divModalSmallContent.innerHTML = "Web Storage is disabled. Please check your browser settings.";
         break;
      case "de":
         divModalSmallContent.innerHTML = "Web Storage ist nicht freigeschalten. Bitte überprüfe deine Browser-Einstellungen."
         break;
      }
   }

   //Display modal
   divModalContainer.style.display = "block";
   divModalSmall.style.display = "flex";

}


//Clear all data stored in web storage
function clearWebStorage() {

   const keysToRemove = ["KeepYourScore?layout-language",
                         "KeepYourScore?layout-mode",
                         "KeepYourScore?layout-theme",
                         "KeepYourScore?..."];

   for (key of keysToRemove) {
      localStorage.removeItem(key);
   }

}














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

//Test function for local storage
function test() {

   //Variables
   var players = document.getElementsByClassName("bc-players__input");
   var numPlayers = players.length;

   //Initial values
   var playerNames = "";

   //Get and concatenate player names separated by comma
   for (var i = 0; i < numPlayers; i++) {

      var name = players[i].value;
      playerNames += name;
      playerNames += ",";

   }

   //Remove last comma from string
   playerNames = playerNames.slice(0,-1);

   console.log(playerNames)

   console.log(numPlayers)
}