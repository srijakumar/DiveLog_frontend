const url = "http://localhost:3000/days"


document.addEventListener("DOMContentLoaded", () => {
    //fetch and load dive days
    fetchDays()
    const createDayForm = document.querySelector('#diveInputForm')
    createDayForm.addEventListener("submit", (e) => createFormHandler(e))
  })


//this is a get request
function fetchDays() {
  fetch(url)
  .then(response => response.json())
  .then(days => {
    days.forEach(day => {
        // this is manipulating the DOM
      //  render(day)
      let newDay = new Day(day, logs_attributes, marinelives_attributes)
      document.querySelector('#diveList').innerHTML += dayMarkup;
      document.querySelector('#diveList').innerHTML += logMarkup
      document.querySelector('#diveList').innerHTML += marineMarkup

      })
    })
}

//manipulating the DOM




function createFormHandler(e){
  //debugger
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

function postFetch(title,date,location,depth,current, visibility, content){
  let bodyData ={
    day: {
          title,
          date,
          logs_attributes: [{  // this is a nested object of the log data
        			"location" : location,
        			"depth": depth,
        			"current": current,
        			"visibility": visibility,
              //day_id: day_id
		       } ],
            marinelives_attributes: [{
        			"content":content}
              //day_id: day_id
		         ]}}
  //console.log(bodyData)

  fetch(url, {
    // POST request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(day => {
    //debugger
    console.log(day);
    let newDay = new Day(day, logs_attributes, marinelives_attributes)
    document.querySelector('#diveList').innerHTML += dayMarkup;
    document.querySelector('#diveList').innerHTML += logMarkup
    document.querySelector('#diveList').innerHTML += marineMarkup

  })
}
