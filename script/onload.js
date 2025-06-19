function onPageLoad() {

   /* --- Check web storage entries --- */

   //Check for language pre settings
   //If nothing is stored in local storage, use English language
   var langPreSetting = localStorage.getItem("KeepYourScore?layout-language");

   if (!langPreSetting) {
      selLanguage("en");
      document.getElementById("js-div-pageLanguage").innerHTML = "en";
   } else {
      selLanguage(langPreSetting);
      document.getElementById("js-div-pageLanguage").innerHTML = langPreSetting;
   }



	//selLanguage("en");




   /* --- Add event listener --- */

   //Close modals by click outside of modal
   try {
      var areaModalContainer = document.getElementById("js-div-modalContainer");
      areaModalContainer.addEventListener("click", closeModalOutside)
      console.log("Close Modal via outside click!")
   } catch(err) {
      console.log("X - Kein Close Modal via outside click!")
   }

   //Close modals (small) by x
   try {
      var btnCloseModalSmall = document.getElementById("js-btn-closeModalSmall");
      btnCloseModalSmall.addEventListener("click", closeModal)
      console.log("Close Modal (small) Button da!")
   } catch(err) {
      console.log("X - Kein Close Modal (small) Button!")
   }

   //New game
   try {
      var btnNewGame = document.getElementById("js-btn-newGame");
      btnNewGame.addEventListener("click", function() {
         window.location = "./gamecond";
      });
      console.log("New Game Button da!")
   } catch(err) {
      console.log("X - Kein New Game Button!")
   }

   //Check browser settings for web storage API
   try {
      var btnCheckWebStorage = document.getElementById("js-btn-checkWebStorage");
      btnCheckWebStorage.addEventListener("click", checkWebStorage);
      console.log("Check Web Storage Button da!")
   } catch(err) {
      console.log("X - Kein Check Web Storage Button!")
   }

   //Add players
   try {
      var btnAddPlayers = document.getElementById("js-btn-addPlayers");
      btnAddPlayers.addEventListener("click", addPlayer);      //addPlayerInNewGame vs addPlayerInRunningGame (later)
      console.log("Add Players Button da!")
   } catch(err) {
      console.log("X - Kein Add Players Button!")
   }

   //Remove players
   try {
      //Event handler for entire player grid container (event bubbling)
      var divPlayerGrid = document.getElementById("js-div-playerGrid");
      divPlayerGrid.addEventListener("click", removePlayer);   //removePlayerInNewGame vs removePlayerInRunningGame (later)
      console.log("Remove Players Button da!")
   } catch(err) {
      console.log("X - Kein Remove Players Button!")
   }

   //Start game
   try {
      var btnStartGame = document.getElementById("js-btn-startGame");
      btnStartGame.addEventListener("click", checkGameEntries);
      console.log("Start Game Button da!")
   } catch(err) {
      console.log("X - Kein Start Game Button!")
   }

   //Statistics
   try {
      var btnStatistics = document.getElementById("js-btn-statistics");
      btnStatistics.addEventListener("click", calcFinalStanding);
      console.log("Statistic Button da!")
   } catch(err) {
      console.log("X - Kein Statistics Button!")
   }

   //Rematch
   try {
      var btnRematch = document.getElementById("js-btn-rematch");
      btnRematch.addEventListener("click", calcFinalStanding);
      console.log("Rematch Button da!")
   } catch(err) {
      console.log("X - Kein Rematch Button!")
   }

   //Main menu
   try {
      var btnMainMenu = document.getElementById("js-btn-mainMenu");
      btnMainMenu.addEventListener("click", function() {
         window.location = "./";
      });
      console.log("Main Menu Button da!")
   } catch(err) {
      console.log("X - Kein Main Menu Button!")
   }

   //Run results script when gamestatus condition fulfilled
   var gameStatus = localStorage.getItem("KeepYourScore?gamestat-status");

   if (gameStatus == "2") {
      calcFinalStanding();
      console.log("Auf Results Seite")
   } else {
      console.log("X - Nicht auf Results Seite")
   }

}




/* --- Modals --- */

//Open modal
function openModal(content,title,style,image) {

   //input 2-4 optional
   //style = content for close button e.g. confirm, OK, Got it, close

}

//Close modal
function closeModal() {

   //Get IDs from modals
   var divModalContainer = document.getElementById("js-div-modalContainer");
   var divModalSmall = document.getElementById("js-div-modalSmall");
   var divModalMedium = document.getElementById("js-div-modalMedium");
   var divModalLarge = document.getElementById("js-div-modalLarge");

   //Hide all modals
   divModalContainer.style.display = "none";
   divModalSmall.style.display = "none";
   divModalMedium.style.display = "none";
   divModalLarge.style.display = "none";
}

function closeModalOutside(e) {

   //Get IDs from modals
   var divModalContainer = document.getElementById("js-div-modalContainer");
   var divModalSmall = document.getElementById("js-div-modalSmall");
   var divModalMedium = document.getElementById("js-div-modalMedium");
   var divModalLarge = document.getElementById("js-div-modalLarge");

   if (e.target !== this) {
      return
   } else {
      divModalContainer.style.display = "none";
      divModalSmall.style.display = "none";
      divModalMedium.style.display = "none";
      divModalLarge.style.display = "none";
   }
}


/* --- Languages --- */


function selLanguage(language) {

   dict = loadDict();

   var i18n = document.querySelectorAll("[i18n-id]");

   for (var i = 0; i < i18n.length; i++) {

      element = i18n[i].attributes["i18n-id"].value;

      i18n[i].innerHTML = dict[language][element];
   }
}


function loadDict() {

   const dict = {
      "en": {
         "nav-theme__button": "<i>soon</i>",
         "logo__caption": "Your digital scoreboard",
         "new-game__button": "New Game",
         "tutorial-step1__headline": "Check web storage",
         "tutorial-step1__content": "This application uses <i>Web Storage API</i> to store data locally within the user's browser.\
                     It is used to transfer game data between the pages.\
                     Each user can enable or disable this option in his browser.",
         "tutorial-step1__button": "Check current settings",
         "tutorial-step2__headline": "Set up your game",
         "tutorial-step2__content": "To start a new score counter, just press the button 'New Game' above.\
                     Select different options that the score counter fits the game you want to play.\
                     After all players are set, you can start the game.",
         "tutorial-step3__headline": "Enter your points",
         "tutorial-step3__content": "Each player is shown one at a time per game round with its current score.\
                     There you can enter points or skip right to the next player.\
                     When all players are done, the next game round begins automatically.\
                     The game continues until all ending conditions are fulfilled.",
         "tutorial-step4__headline": "The results",
         "tutorial-step4__content": "At the end of a game, the results are shown in a scoreboard.\
                     There you can see the final standing, the points of each player (and also the games statistic - soon).\
                     If your game mates are mortified enough, you can end the session or start a rematch.",
         "card-details__headline": "<i>KeepYourScore online</i>",
         "card-details__content": "by ChrisKolab<br><br>v0.0.7<br>18th August 2023<br><br>",
         "card-about__headline": "About",
         "card-about__content": "<b><i>KeepYourScore online</i></b> is a small web application to track your game scores.\
               If you are tired of trying to find a pen or pencil and a piece of paper, this is the right place for you.\
               <br><br>Hope you enjoy it!<br><br>\
               This project is being developed and maintained by one person as a hobby.\
               If you find any bugs, have any suggestions or just want to say <i>Hi</i>, please send me feedback.\
               <br><u><i>Get in touch - soon</i></u>",
         "card-news__headline": "News",
         "card-news__content": "<b>18th August 2023</b><br>Version v0.0.7 is out now.\
               This version contains all background calculations to play a full game in any game mode with a following result table.\
               <br><br>The next updates will add describing content and design elements only. First full release is going to be version v0.1.0.\
               <br><br><u><i>See full changelog - soon</i></u>",
         "conditions__headline": "Game conditions",
         "conditions-cond-a-2": "Points at start",
         "conditions-cond-1-1": "Points to win",
         "conditions-cond-a-3": "Winning condition",
         "conditions-cond-a-3-option-1": "Highest points",
         "conditions-cond-a-3-option-2": "Lowest points",
         "conditions-cond-1-2": "Last game round if one player hits final points",
         "players__headline": "Players",
         "players-tbl__headline": "Name",
         "start-game__button": "Start Game",
         "statistics__button": "<i>Statistics - soon</i>",
         "rematch__button": "<i>Rematch - soon</i>",
         "main-menu__button": "Main Menu"
      },
      "de": {
         "theme": "Thema",
         "underline": "Dein digitaler Spielstand",
         "content": "Inhalt",
         "footer": "Fußzeile",
         "conditions-cond4": "Letzte Spielrunde, sobald ein Spieler die Zielpunktzahl erreicht"
      },
   };

   return dict;
}