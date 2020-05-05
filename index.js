const BASE_URL = "http://localhost:3000"
const DAYS_URL = `${BASE_URL}/days`
const LOGS_URL = `${BASE_URL}/logs`
const MARINELIVES_URL = `${BASE_URL}/marinelives`


function fetchDives () {
  var dives = JSON.parse(localStorage.getItem('dives'));
  var divesList = document.getElementById('divesList');

  divesList.innerHTML = '';

  for (var i = 0; i < dives.length; i++) {
    var id = dives[i].id;
    var title = dives[i].title;
    var day = dives[i].day;
    var location = dives[i].location;
    var depth = dives[i].depth;
    var current = dives[i].current;
    var isibility = dives[i].visibility;

    divesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + title + '</span></p>'+
                              '<h3>' + day + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + location + ' '+
                              '<span class="glyphicon glyphicon-user"></span> ' + depth + '</p>'+
                              '<span class="glyphicon glyphicon-user"></span> ' + current + '</p>'+
                              '<span class="glyphicon glyphicon-user"></span> ' + visibility + '</p>'+
                              '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                              '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                              '</div>';
  }
}
