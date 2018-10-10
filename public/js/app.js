// Custom JavaScript by Garrett Estrin | GarrettEstrin.com

var gameinfo;
var gameEnd;
var kingsScore;
var opponentScore;
var win;
var $content = $('.content')[0];
var $logo = $('#logo')
$(document).ready(function() {
  $.getJSON("https://spreadsheets.google.com/feeds/list/1HftBBQw7_9Dvwr1LGddy5ySGVWvELzAZQ9G7ovip8XA/od6/public/values?alt=json", function(data) {
    gameinfo = data.feed.entry[data.feed.entry.length-1].gsx$gameinfo.$t
    //getTypeOfEnd(gameinfo)
    getScores(gameinfo)
  })
  setFavicon();
})

function getTypeOfEnd(gameinfo){
  gameinfo = gameinfo.split(' ')
  if(gameinfo[0] == 'Final/OT:') {
    gameEnd = 'Overtime';
  } else if (gameinfo[0] == 'Final/SO:') {
    gameEnd = "Shoot Out"
  } else if(gameinfo[0] == 'Final:') {
    gameEnd = "Regulation"
  } else {
    gameEnd = "unknown";
  }
}

function getScores(gameinfo){
  gameinfo = gameinfo.toLowerCase().replace("final score ", "").split(' ')
  if(gameinfo[0] == "la"){
    kingsScore = gameinfo[1];
    opponentScore = gameinfo[gameinfo.length - 1];
  } else {
    kingsScore = gameinfo[gameinfo.length - 1];
    opponentScore = gameinfo[1];
  }
  didKingsWin(kingsScore,opponentScore)
}

function didKingsWin(kingsScore, opponentScore){
  console.log("la", kingsScore, "opp", opponentScore);
  if(kingsScore>opponentScore){
    win = true
  } else {
    win = false
  }
  buildDom(win);
}

function buildDom(win){
  // Fade out logo
  $logo.fadeOut(2000, function(){
    if(win === true){
      $content.innerHTML = "YES<p class='sub-content'>Unfortunately, but they still suck.</p>"
    } else {
      // $content.textContent = "NO"
      $content.innerHTML = "NO<p class='sub-content'>Because they suck.</p>";
    }
    $('body').click(function(){
      showDetails();
    })
  })
}

function showDetails(){
  $('.details')[0].textContent = gameinfo;
}

function setFavicon() {
	head = document.getElementsByTagName('head')[0];
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://didthekingswin.herokuapp.com/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
}
