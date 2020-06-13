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


  //this is a get request. This is being activated only when the page dom loads, not when you create
  function fetchDays() {
   fetch(DAYS_URL)
    .then(response => response.json())
    .then(days => {
      days.forEach(day => {
        let newDay = new Day(day.id, day.title, day.date, day.logs, day.marinelives)
        newDay.showDay()
        })
      })
  }

//issue is with createform that is generating a new blank form
function createFormHandler(e){
  //e.preventDefault()
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
      var hr = document.createElement('hr')

      workarea.append(container)
      container.classList.add("day-container")
      container.id = "main-container"

      let day = new Day(newDay.id, newDay.title, newDay.date, [], [])
                 day.showDay();
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
      var hr = document.createElement('hr');
      container.id = "main-container"

    //This area displays the title and break line
      workarea.append(hr)
      const spanTagTitle = document.createElement('span')
      const text = document.createTextNode(`Title: ${this.title} | Date: ${this.date}`)
      spanTagTitle.appendChild(text);
      workarea.append(spanTagTitle);

      //now creating the log version of the file
      const logTitle= document.createElement("H4")
      logTitle.innerText = "Log details about this dive:"

      const locInput = document.createElement('input')
           locInput.type = "text"
           locInput.id = "diveLoc-" + this.id
           locInput.className = "form-group"
           locInput.placeholder = "Location"

      const depthInput = document.createElement('input')
            depthInput.type = "text"
            depthInput.id = "diveDepth-" + this.id
            depthInput.className = "form-group"
            depthInput.placeholder = "Depth (in meters)"

      const currentInput = document.createElement('input')
            currentInput.type = "text"
            currentInput.id = "current-" + this.id
            currentInput.className = "form-group"
            currentInput.placeholder = "Currents"

      const visInput = document.createElement('input')
            visInput.type = "text"
            visInput.id = "visibility-" + this.id
            visInput.className = "form-group"
            visInput.placeholder = "Visibility"

      const submitLog = document.createElement('button')
      submitLog.innerHTML = "Enter Log Information"

      const mlTitle= document.createElement("H4")
      mlTitle.innerText = "Did you see any marine life:"

      const mlInput = document.createElement('input')
            mlInput.type = "text"
            mlInput.id = "marinelife"
            mlInput.className = "form-group"
            mlInput.placeholder = "Corals? Sharks?"

      const submitML = document.createElement('button')
      submitML.innerHTML = "Enter MarineLife Information"

      container.append(br)
      container.append(logTitle)
      container.append(locInput)
      container.append(depthInput)
      container.append(currentInput)
      container.append(visInput)

      container.append(submitLog)
      submitLog.addEventListener("click", event =>{
        //debugger
        Log.createLog(this, event)
      })

      container.append(mlTitle)
      container.append(mlInput)

      container.append(submitML)
      submitML.addEventListener("click", event =>{
        MarineLife.createML(this, event)
      })

      const logDisplay = document.createElement('lh')
            logDisplay.id = `logDisplay-${this.id}`
            //logDisplay.innerHTML = "Dive Log Details"
            container.append(logDisplay)
            logDisplay.append(br)
      const mlDisplay = document.createElement('lh')
            mlDisplay.id = `mlDisplay-${this.id}`

            container.append(mlDisplay)
            // mlDisplay.innerHTML = "Dive Details Below:"

      workarea.append(container)
      const logsList = document.createElement('ul')// create single list for each day, holds all the logs

      this.logs.forEach(log => {
            this.displayLogs(log, logsList)// pass in the log and the list
            })

      workarea.append(logsList); //after all logs have been added to list, append the list to the dom

      //new changes
      const mlList = document.createElement('ul')

      //as is
      this.marinelives.forEach(ml => {
            this.displayMLs(ml, mlList)

            })
      //new change
      // workarea.append(ml);
      workarea.append(mlList);
    }

    displayLogs(log, logsList) {
      //debugger
        console.log(log)
        const spanTag = document.createElement('span')
        const text = document.createTextNode(`Location: ${log.location} - Depth: ${log.depth}m - Current: ${log.current}${String.fromCharCode(160)}${String.fromCharCode(160)}- Visibility: ${log.visibility}`)
        spanTag.appendChild(text);

        const logListItem = document.createElement('li')
        logListItem.id = `log-container-${log.id}`
        logListItem.append(spanTag);
        logsList.append(logListItem);

        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = "Delete this log"
        deleteButton.id = `log-delete-${log.id}`
        logListItem.append(deleteButton)
        deleteButton.addEventListener("click", event => {
            Log.deleteLog(log, event)
        })
    }


    displayMLs(ml, mlList){
      const spanTag = document.createElement('span');
      const text = document.createTextNode(`Marine Life Observed: ${ml.content}`)
      spanTag.appendChild(text);



      const mlListItem = document.createElement('li')
      mlListItem.id = 'ml-container-${log.id}'
      mlListItem.append(spanTag);

      mlList.append(mlListItem)

      const deleteButton = document.createElement('button')
      deleteButton.innerHTML = "Delete this Observation"
      deleteButton.id = `ml-delete-${ml.id}`
      mlListItem.append(deleteButton)

      deleteButton.addEventListener("click", event => {
        //issue marinelife not defined
         MarineLife.deleteML(ml, event)
      })

    }

  }


    class Log {
      constructor(day, log){
        this.day = day.id
        this.location = log.location
        this.depth = log.depth
        this.current = log.current
        this.visibility = log.visibility
      }

      static createLog(day, event){

        const location = document.getElementById(`diveLoc-${day.id}`).value
        const depth = document.getElementById(`diveDepth-${day.id}`).value
        const current = document.getElementById(`current-${day.id}`).value
        const visibility = document.getElementById(`visibility-${day.id}`).value

        fetch(LOGS_URL,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            //this will be sent to create method in Day Controller?
            day: day,
            location: location,
            depth: depth,
            current: current,
            visibility: visibility
          })
        })
        .then(resp => resp.json())
        .then(newLog =>{
          const lh = document.getElementById(`logDisplay-${day.id}`)
          const ul = document.createElement('ul')
          lh.append(ul)
          const logList = document.createElement('li')
          logList.id = `log-container-${newLog.id}`
          ul.append(logList)


          //updating display here

          const spanTagLocDisplay = document.createElement('span')
          const text = document.createTextNode(`Location: ${newLog.location} - Depth: ${newLog.depth}m - Current: ${newLog.current}${String.fromCharCode(160)}${String.fromCharCode(160)}- Visibility: ${newLog.visibility}`)
          spanTagLocDisplay.appendChild(text);
          logList.append(spanTagLocDisplay)



          const deleteButton = document.createElement('button')
          deleteButton.id = `log-delete-${newLog.id}`
          deleteButton.innerHTML = "Delete this Log"
          logList.append(deleteButton)
          //can be refactored to so its not duplicated
          deleteButton.addEventListener("click", event => {
            this.deleteLog(newLog, event)
          })
        })
    }


    static deleteLog(log, event) {
        fetch(`${LOGS_URL}/${log.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => {
            event.target.parentElement.remove()
        })
    }
  }

  class MarineLife{
    constructor(day, ml){
      this.day = day.id
      this.content = ml.content
    }

    static createML(day, event){
      const content = event.target.previousSibling.value
      fetch(ML_URL,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
                 //is this right? Data structure may need to be corrected
                 marinelife: content,
                 day: day
             })
      })
      .then(resp => resp.json())
      .then(newML =>{
        const lh = document.getElementById(`mlDisplay-${day.id}`)
            const ul = document.createElement('ul')
            lh.append(ul)
            const mlList = document.createElement('li')
            mlList.id = `ml-container-${newML.id}`
            ul.append(mlList)
            mlList.innerHTML = newML.content
            const deleteButton = document.createElement('button')
            deleteButton.innerHTML = "Delete this observation"
            deleteButton.id =  `ml-delete-${newML.id}`
            mlList.append(deleteButton)
            deleteButton.addEventListener("click", event => {
            this.deleteML(newML, event)
            })
      })
    }

    static deleteML(ml, event) {
        fetch(`${ML_URL}/${ml.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => {
            event.target.parentElement.remove()
        })
    }
  }
