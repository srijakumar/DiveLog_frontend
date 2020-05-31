const URL = "http://localhost:3000"
const DAYS_URL = `${URL}/days`
const LOGS_URL = `${URL}/logs`
const ML_URL = `${URL}/marinelives`

document.addEventListener("DOMContentLoaded", () => {
    //fetch and load dive days
    fetchDays()
    const createDayForm = document.querySelector('#diveInputForm')
    createDayForm.addEventListener("submit", (e) => createFormHandler(e))
  })


//this is a get request
function fetchDays() {
  fetch(URL)
  .then(response => response.json())
  .then(days => {
    days.forEach(day => {
        // this is manipulating the DOM
      //  render(day)
      let newDay = new Day(day.id, day.date, day.logs, day.marinelives)
      console.log(newDay)
      newDay.showDay()


      })
    })
}


function createFormHandler(e){
  e.preventDefault()
  const titleInput = document.querySelector('#diveDesc').value
  const dayInput = document.querySelector('#diveDay').value
  postFetch(titleInput, dayInput)
}

function postFetch(title,date){
  let bodyData ={
    day: {
          title,
          date}
        }
    fetch(DAYS_URL,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bodyData)

      }
    )
    .then(resp => resp.json())
    .then(newDay => {
      const workarea = document.querySelector('#diveList')
      const container = document.createElement('div')
      const br = document.createElement("BR")

      workarea.append(container)
      container.id = "main-container"

      //added the day data
      workarea.innerHTML += bodyData;

      //now creating the log version of the file
      const logTitle= document.createElement("H4")
      logTitle.innerText = "Log details about this dive:"

      const locInput = document.createElement('input')
           locInput.type = "text"
           locInput.id = "diveLoc"
           locInput.className = "form-group"
           locInput.placeholder = "Log dive location - Fiji? Bahamas? Hawaii? jk we are jealous anyway"

      const depthInput = document.createElement('input')
            depthInput.type = "text"
            depthInput.id = "diveLoc"
            depthInput.className = "form-group"
            depthInput.placeholder = "Log dive depth - How deep did you go (in meters)"

      const currentInput = document.createElement('input')
            currentInput.type = "text"
            currentInput.id = "current"
            currentInput.className = "form-group"
            currentInput.placeholder = "Log dive current - Strong/Medium/Light"

      const visInput = document.createElement('input')
            visInput.type = "text"
            visInput.id = "visibility"
            visInput.className = "form-group"
            visInput.placeholder = "Log dive visibility - Murky/Medium/Clear"

      const submitLog = document.createElement('button')
      submitLog.innerHTML = "Enter Log Information"

      const mlTitle= document.createElement("H4")
      mlTitle.innerText = "Did you see any marine life:"

      const mlInput = document.createElement('input')
            mlInput.type = "text"
            mlInput.id = "marinelife"
            mlInput.className = "form-group"
            mlInput.placeholder = "Corals? Sharks? Turtles? What did you see"

      const submitML = document.createElement('button')
      submitML.innerHTML = "Enter MarineLife Information"

      container.append(locTitle)
      container.append(locInput)
      container.append(depthInput)
      container.append(currentInput)
      container.append(visInput)

      container.append(submitLog)
      submitLog.addEventListener("click", event =>{
        Log.createLog(newDay, event)
      })

      container.append(mlTitle)
      container.append(mlInput)

      container.append(submitML)
      submitLog.addEventListener("click", event =>{
        Log.createLog(newDay, event)
      })

      const logDisplay = document.createElement('lh')
            logDisplay.id = `logDisplay-${newDay.id}`
            logDisplay.innerHTML = "Dive Log Details"
            container.append(logDisplay)
            logDisplay.append(br)
      const mlDisplay = document.createElement('lh')
            mlDisplay.id = `mlDisplay-${newDay.id}`
            mlDisplay.innerHTML = "Dive Observation Details"
            container.append(mlDisplay)

    })

  }


  class Day {
    constructor(id, title, date, logs, marinelives){
      this.id = id
      this.title = title
      this.date = date
      this.logs = logs
      this.marinelives = marinelives
    }

    showDay(){
      const workarea = document.querySelector('#diveList')
      const container = document.createElement('div')
      const br = document.createElement("BR")

      workarea.append(container)
      container.id = "main-container"

      workarea.innerHTML += this.title;
      workarea.innerHTML += this.date;

    }
  }

//
//
//
//
//
//
//
//
// function createFormHandler(e){
//   //debugger
//   e.preventDefault()
//   const titleInput = document.querySelector('#diveDesc').value
//   const dayInput = document.querySelector('#diveDay').value
//   const locInput = document.querySelector('#diveLoc').value
//   const depthInput = document.querySelector('#diveDepth').value
//   const currentInput = document.querySelector('#current').value
//   const visInput = document.querySelector('#visibility').value
//   const marInput = document.querySelector('#marinelife').value
//
//   postFetch(titleInput, dayInput, locInput, depthInput, currentInput, visInput, marInput)
//
// }
//
// function postFetch(title,date,location,depth,current, visibility, content){
//   let bodyData ={
//     day: {
//           title,
//           date,
//           logs_attributes: [{  // this is a nested object of the log data
//         			"location" : location,
//         			"depth": depth,
//         			"current": current,
//         			"visibility": visibility,
//               //day_id: day_id
// 		       } ],
//             marinelives_attributes: [{
//         			"content":content}
//               //day_id: day_id
// 		         ]}}
//   //console.log(bodyData)
//
//   fetch(url, {
//     // POST request
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify(bodyData)
//   })
//   .then(response => response.json())
//   .then(day => {
//     //debugger
//     console.log(day);
//     let newDay = new Day(day, logs_attributes, marinelives_attributes)
//     document.querySelector('#diveList').innerHTML += dayMarkup;
//     document.querySelector('#diveList').innerHTML += logMarkup
//     document.querySelector('#diveList').innerHTML += marineMarkup
//
//   })
// }
