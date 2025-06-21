
//Calculate final results
function calcFinalStanding() {

   //Get web storage data
   var strGamestatMode = localStorage.getItem("KeepYourScore?gamestat-mode");
   var strPlayerstatNames = localStorage.getItem("KeepYourScore?playerstat-names");
   var strPlayerstatPoints = localStorage.getItem("KeepYourScore?playerstat-points");
   var strPlayerstatRounds = localStorage.getItem("KeepYourScore?playerstat-rounds");
   /*
   var strGamestatMode = "1112";
   var strGamestatRound = "1";
   var strGamestatEndpoints = "10000";
   var strGamestatNumPlayer = "6";
   var strGamestatCurrPlayer = "1";
   var strPlayerstatNames = "Lisi,Chrisi,Sarah,Fabi,Vale,Isi";
   var strPlayerstatPoints = "14,10,10,6,6,4";
   var strPlayerstatRounds = "13,10,10,13,9,15";
   */

   //Get IDs
   var divPodestFirst = document.getElementById("js-div-podestFirst");
   var divPodestSecond = document.getElementById("js-div-podestSecond");
   var divPodestThird = document.getElementById("js-div-podestThird");
   var divResultTable = document.getElementById("js-div-resultTable");
   var divLangSettings = document.getElementById("js-div-pageLanguage");

   //Input conversions
   const arrPlayerstatNames = strPlayerstatNames.split(",");                        //Array of strings
   const arrPlayerstatPoints = strPlayerstatPoints.split(",").map(Number);          //Array of numbers
   const arrPlayerstatRounds = strPlayerstatRounds.split(",").map(Number);          //Array of numbers

   // Create playerstat matrix
   const arrPlayerstats = arrPlayerstatNames.map((name, i) => ({
     name,
     points: arrPlayerstatPoints[i],
     rounds: arrPlayerstatRounds[i]
   }));

   //Sort playerstat
   switch(strGamestatMode) {
   case "1111": case "1211":
      arrPlayerstats.sort((a, b) => b.points - a.points);
      break;

   case "1121": case "1221":
      arrPlayerstats.sort((a, b) => a.points - b.points);
      break;

   case "1112": case "1122": case "1212": case "1222":
      arrPlayerstats.sort((a, b) => a.rounds - b.rounds);
      break;
   }

   // Grouping by player values
   const getGroupKey = player => {
      switch(strGamestatMode) {
      case "1111": case "1121": case "1211": case "1221":
         return player.points;
         break;

      case "1112": case "1122": case "1212": case "1222":
         return player.rounds;
         break;
      }
   };

   const grouped = [];
   for (let player of arrPlayerstats) {
      const key = getGroupKey(player);
      let group = grouped.find(g => g.key === key);
      if (group) {
         group.players.push(player);
      } else {
         grouped.push({ key, players: [player] });
      }
   }


   //Create table for results
   const table = document.createElement("table");
   table.setAttribute("class", "bc-results__table");

   //Create table headline
   switch (divLangSettings.innerHTML) {
   case "en": 
      var arrHeadline = ["Rank", "Name", "Points", "Rounds"];
      break;
   case "de":
      var arrHeadline = ["Rang", "Name", "Punkte", "Runden"];
      break;
   }
   const thead = document.createElement("thead");
   const headRow = document.createElement("tr");
   arrHeadline.forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      headRow.appendChild(th);
   });
   thead.appendChild(headRow);
   table.appendChild(thead);

   //Create table body content
   const tbody = document.createElement("tbody");
   let rank = 1;

   grouped.forEach(group => {
      const tr = document.createElement("tr");

      // Rank cell
      const tdRank = document.createElement("td");
      tdRank.textContent = rank + ".";
      tr.appendChild(tdRank);

      // Names cell
      const tdNames = document.createElement("td");
      if (group.players.length === 1) {
         tdNames.textContent = group.players[0].name;
      } else {
         group.players.forEach((p, idx) => {
         tdNames.appendChild(document.createTextNode(p.name));
         if (idx < group.players.length - 1) {
            tdNames.appendChild(document.createElement("br"));
         }
         });
      }
      tr.appendChild(tdNames);

      // Points cell
      const tdPoints = document.createElement("td");
      const uniquePoints = [...new Set(group.players.map(p => p.points))];

      if (group.players.length === 1 || uniquePoints.length === 1) {
         // All points the same, or only one player
         tdPoints.textContent = group.players[0].points;
      } else {
         // Show each player's points aligned with name lines
         group.players.forEach((p, idx) => {
         tdPoints.appendChild(document.createTextNode(p.points));
         if (idx < group.players.length - 1) {
            tdPoints.appendChild(document.createElement("br"));
            }
         });
      }
      tr.appendChild(tdPoints);

      // Rounds cell
      const tdRounds = document.createElement("td");
      const uniqueRounds = [...new Set(group.players.map(p => p.rounds))];

      if (group.players.length === 1 || uniqueRounds.length === 1) {
         // All rounds the same, or only one player
         tdRounds.textContent = group.players[0].rounds;
      } else {
         // Show each player's rounds aligned with name lines
         group.players.forEach((p, idx) => {
         tdRounds.appendChild(document.createTextNode(p.points));
         if (idx < group.players.length - 1) {
            tdRounds.appendChild(document.createElement("br"));
            }
         });
      }
      tr.appendChild(tdRounds);

      tbody.appendChild(tr);
      //rank += group.players.length;     //Skip ranks if multiple people have the same rank
      rank++;                             //Consecutive ranks
   });

   table.appendChild(tbody);


   //Select all table rows inside the tbody
   const rows = table.querySelector("tbody").rows;

   //Get the innerHTML of the name cell for the first 3 ranks
   const arrPodest = [];
   for (let i = 0; i < Math.min(3, rows.length); i++) {
      const tdNames = rows[i].cells[1];         // Names starting at second cell (index 1)
      arrPodest.push(tdNames.innerHTML);
   }

   //Show resulting table and podest
   divResultTable.appendChild(table);
   divPodestFirst.innerHTML = arrPodest[0];
   divPodestSecond.innerHTML = arrPodest[1];
   divPodestThird.innerHTML = arrPodest[2];
   
   //Error handling for podest
   if (divPodestSecond.innerHTML === "undefined") {
      divPodestSecond.innerHTML = "-";
   }
   if (divPodestThird.innerHTML === "undefined") {
      divPodestThird.innerHTML = "-";
   }

}



