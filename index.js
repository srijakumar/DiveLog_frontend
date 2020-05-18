const url = "http://localhost:3000/days"


document.addEventListener("DOMContentLoaded", () => {
    fetchDays()
    const createDayForm = document.querySelector('#diveInputForm')
    createDayForm.addEventListener("submit", (e) => createFormHandler(e))
  })


function fetchDays() {
  fetch(url)
  .then(response => response.json())
  .then(days => {
    days.forEach(day => {
      debugger
        // double check how your data is nested in the console so you can successfully access the attributes of each individual object
        const dayMarkup = `
          <div data-id=${day.id}>
            <h3>${day.title}</h3>
            <h4>${day.date}</h4>
          </div>
          `;
          document.querySelector('#diveList').innerHTML += dayMarkup
          day.logs.forEach(log=>{
            const logMarkup = `
              <div data-id=${day.id}>
                <p>Location: ${log.location}</p>
                <p>Current: ${log.current}</p>
                <p>Visibility: ${log.visibility}</p>
                <p>Depth: ${log.depth}m</p>
              </div>`;
                document.querySelector('#diveList').innerHTML += logMarkup
          })

          day.marinelives.forEach(marinelife=>{
            const marineMarkup = `
              <div data-id=${day.id}>
                <p>Marine life spotted: ${marinelife.content}</p>
              </div>
              <br><br>`;
                document.querySelector('#diveList').innerHTML += marineMarkup
          })
      })
    })
}

function createFormHandler(e){
  debugger
  e.preventDefault()
  const titleInput = document.querySelector('#diveDesc').value
  const dayInput = document.querySelector('#diveDay').value
  const locInput = document.querySelector('#diveLoc').value
  const depthInput = document.querySelector('#diveDepth').value
  const currentInput = document.querySelector('#current').value
  const visInput = document.querySelector('#visibility').value
  const marInput = document.querySelector('#marinelife').value
  postFetch(titleInput, dayInput, locInput, depthInput, currentInput, visInput, marInput)

}

function postFetch(title,date,location,depth, current, visibility, content){
  //console.log(title,day,location,depth, current, visibility, content)
  let bodyData ={

    title,date,location,depth, current, visibility, content


  }
  console.log(bodyData)
  //debugger

  fetch(url, {
    // POST request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(day => {

    console.log(day);
    debugger

    const dayMarkup = `
    <div data-id=${day.id}>
      <h3>${day.title}</h3>
      <h4>${day.date}</h4>
    </div>
    <br><br>`;

    document.querySelector('#diveList').innerHTML += dayMarkup;
  })


}





// const BASE_URL = "http://localhost:3000"
// const DAYS_URL = `${BASE_URL}/days`
// const LOGS_URL = `${BASE_URL}/logs`
// const MARINELIVES_URL = `${BASE_URL}/marinelives`
//
// //this section
// document.addEventListener("DOMContentLoaded", () => {
//     fetchDays()
//     const button = document.getElementById("new-dive-button")
//     button.addEventListener("click", event => {
//     createDay(event) })
// })
//
//
// function fetchDays(){
//   fetch(DAYS_URL)
//   .then(resp => resp.json())
//   .then(json => {
//         json.forEach(day => {
//             let newDay = new Day(day.id, day.day, day.title, day.logs, day.marinelives)
//             console.log(newDay)
//             newDay.showDay()
//         })
//     })
// }
//
//
//
//
// function createDay(event) {
//     const content = document.getElementById("new-day-info").value// this is the id associated with date in the form
//     fetch(DAYS_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             day: content //the value that you entered
//         })
//     })
//     .then(resp => resp.json())
//     .then(newDay => {
//            const main = document.querySelector("main") //main is the main content of the document
//            const containerDiv = document.createElement('div') //create a div
//            const br = document.createElement("BR") //create a <br>
//
//            main.append(containerDiv)
//            containerDiv.classList.add("day-container")//returns the class name(s) of an element, as a DOMTokenList object.
//            containerDiv.id = "main-container"
//            containerDiv.innerHTML = content
//            const obsInput = document.createElement('input')
//            obsInput.type = "text"
//            obsInput.id = "observations-form"
//            obsInput.placeholder = "New Observation"
//         const submitObservation = document.createElement('button')
//             submitObservation.id = "observations-button"
//             containerDiv.append(obsInput)
//             containerDiv.append(submitObservation)
//             submitObservation.addEventListener("click", event => {
//                 Observation.createObservation(newDay, event) //maybe this NEEDS to be an instance function, not class function?
//             })
//         const refInput = document.createElement('input')
//             refInput.type = "text"
//             refInput.id = "reflection-form"
//             refInput.placeholder = "New Reflection"
//         const submitReflection = document.createElement('button')
//             submitReflection.id = "reflections-button"
//             containerDiv.append(refInput)
//             containerDiv.append(submitReflection)
//             submitReflection.addEventListener("click", event => {
//                 Reflection.createReflection(newDay, event)
//             })
//         const obsHeader = document.createElement('lh')
//             obsHeader.id = `observations-header-${newDay.id}` //id
//             obsHeader.innerHTML = "Observations"
//             containerDiv.append(obsHeader)
//             obsHeader.append(br)
//         const refHeader = document.createElement('lh')  //append day id here too
//             refHeader.id = `reflections-header-${newDay.id}` //id
//             refHeader.innerHTML = "Reflections"
//             containerDiv.append(refHeader)
//
//     })
//     }
//
//
//
//
//
//
//
// // function fetchDives () {
// //   var dives = JSON.parse(localStorage.getItem('dives'));
// //   //retrieving issues from Local Storage. parse the string result into a JSON object
// //   var divesList = document.getElementById('divesList');
// //
// //   divesList.innerHTML = '';
// //
// //   for (var i = 0; i < dives.length; i++) {
// //     var id = dives[i].id;
// //     var title = dives[i].title;
// //     var day = dives[i].day;
// //     var location = dives[i].location;
// //     var depth = dives[i].depth;
// //     var current = dives[i].current;
// //     var isibility = dives[i].visibility;
// //
// //     divesList.innerHTML +=   '<div class="well">'+
// //                               '<h6>Issue ID: ' + id + '</h6>'+
// //                               '<p><span class="label label-info">' + title + '</span></p>'+
// //                               '<h3>' + day + '</h3>'+
// //                               '<p><span class="glyphicon glyphicon-time"></span> ' + location + ' '+
// //                               '<span class="glyphicon glyphicon-user"></span> ' + depth + '</p>'+
// //                               '<span class="glyphicon glyphicon-user"></span> ' + current + '</p>'+
// //                               '<span class="glyphicon glyphicon-user"></span> ' + visibility + '</p>'+
// //                               '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
// //                               '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
// //                               '</div>';
// //   }
// // }
