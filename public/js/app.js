// Custom JavaScript by Garrett Estrin | GarrettEstrin.com
var teamID = 26;
var favicon = 'http://didthekingswin.com/public/favicon.ico';

var gameinfo;
var gameDetails;
var ducksScore;
var opponentScore;
var win;
var $content = $('.content')[0];
var $logo = $('#logo')
$(document).ready(function() {
  $.getJSON(`https://statsapi.web.nhl.com/api/v1/teams/${teamID}?expand=team.schedule.previous`, function(data) {
    if(TeamIsHomeTeam(data)){
      var teamScore = data.teams[0].previousGameSchedule.dates[0].games[0].teams.home.score;
      var oppScore = data.teams[0].previousGameSchedule.dates[0].games[0].teams.away.score;
    } else {
      var oppScore = data.teams[0].previousGameSchedule.dates[0].games[0].teams.home.score;
      var teamScore = data.teams[0].previousGameSchedule.dates[0].games[0].teams.away.score;
    }
    gameDetails = getGameDetails(data);
    didTeamWin(teamScore, oppScore);
  })
  setFavicon();
})

function TeamIsHomeTeam(data){
  if(data.teams[0].previousGameSchedule.dates[0].games[0].teams.away.team.id == teamID){
    return false;
  } else {
    return true;
  }
}

function didTeamWin(teamScore, oppScore){
  if(teamScore>oppScore){
    win = true
  } else {
    win = false
  }
  buildDom(win)
}

function buildDom(win){
  // Fade out logo
  $logo.fadeOut(2000, function(){
    if(win === true){
      $content.textContent = "YES"
    } else {
      $content.textContent = "NO"
    }
    $('body').click(function(){
      showDetails();
    })
  })
}

function getGameDetails(data){
  let gameInfo = data.teams[0].previousGameSchedule.dates[0].games[0];
  let { away, home } = gameInfo.teams;
  return `Final Score ${home.team.name} ${home.score} - ${away.team.name} ${away.score}`;
}

function showDetails(){
  $('.details')[0].textContent = gameDetails;
}

function setFavicon() {
	head = document.getElementsByTagName('head')[0];
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = favicon;
    document.getElementsByTagName('head')[0].appendChild(link);
}

