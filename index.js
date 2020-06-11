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
   fetch(DAYS_URL)
    .then(response => response.json())
    .then(days => {
      days.forEach(day => {
          // this is manipulating the DOM
        //  render(day)
        let newDay = new Day(day.id, day.title, day.date, day.logs, day.marinelives)
        //this is where the order was wrong - now corrected
        console.log(newDay.marinelives)
        newDay.showDay()
        //debugger


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
      var hr = document.createElement('hr')

      workarea.append(container)
      container.classList.add("day-container")
      container.id = "main-container"

      //added the day data
      //workarea.innerHTML += bodyData;

      let day = new Day(newDay.id, newDay.title, newDay.date, [], [])
                 day.showDay();

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
            currentInput.placeholder = "Current"

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

      container.append(logTitle)
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
      submitML.addEventListener("click", event =>{
        MarineLife.createML(newDay, event)
      })

      // const logDisplay = document.createElement('lh')
      //       logDisplay.id = `logDisplay-${newDay.id}`
      //
      //       logDisplay.innerHTML = "Dive Log Details"
      //       container.append(logDisplay)
      //       logDisplay.append(br)
      const mlDisplay = document.createElement('lh')
            mlDisplay.id = `mlDisplay-${newDay.id}`

            container.append(mlDisplay)
            mlDisplay.innerHTML = "Dive Details Below:"

    })

  }


  class Day {
    constructor(id, title, date, logs, marinelives){
      //this is wrong order
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


      //container.classList.add("day-container")
      container.id = "main-container"
      //this contain is created and appended to DOM and then select it from the dom again and compare it to the created container - is it the same object?


      //added the day data
      //debugger
      // workarea.innerHTML += this.title;
      // workarea.innerHTML += this.date;

      workarea.append(hr)
      workarea.append(this.title);
      container.append(br)
      workarea.append(this.date);


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
        Log.createLog(this, event)
      })

      container.append(mlTitle)
      container.append(mlInput)

      container.append(submitML)
      submitML.addEventListener("click", event =>{
        MarineLife.createML(this, event)
      })

      //moved


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
      // workarea.append(mlList);
    }

    displayLogs(log, logsList) {
      //debugger
        console.log("I am here")
        const spanTag = document.createElement('span')
        const text = document.createTextNode(`Location: ${log.location} - Depth: ${log.depth} - Current: ${log.current}${String.fromCharCode(160)}${String.fromCharCode(160)}`)
        spanTag.appendChild(text);

        const logListItem = document.createElement('li')
        logListItem.id = `log-container-${log.id}`
        logListItem.append(spanTag);

        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = "Delete this log"
        deleteButton.id = `log-delete-${log.id}`
        //deleteButton.classList.add('delete')
        logsList.append(deleteButton)
        deleteButton.addEventListener("click", event => {
            Log.deleteLog(log, event)
        })
    }


    //This worked but only for the last one
    // displayMLs(ml) {
    //     const lh = document.getElementById(`mlDisplay-${this.id}`)
    //     const ul = document.createElement('ul')
    //     lh.append(ul)
    //     const mlList = document.createElement('li')
    //     mlList.id = `ml-container-${ml.id}`
    //     ul.append(mlList)
    //     mlList.innerHTML = ml.content
    //     const deleteButton = document.createElement('button')
    //     deleteButton.innerHTML = "Delete this Observation"
    //     deleteButton.id = `ml-delete-${ml.id}`
    //
    //     mlList.append(deleteButton)
    //     deleteButton.addEventListener("click", event => {
    //         Marinelife.deleteml(ml, event)
    //     })
    // }

    displayMLs(ml, mlList){
      const spanTag = document.createElement('span');
      const text = document.createTextNode(`Marine Life Observed: ${ml.content}`)
      spanTag.appendChild(text);

      const mlListItem = document.createElement('li')
      mlListItem.id = 'ml-container-${log.id}'
      mlListItem.append(spanTag);

      const deleteButton = document.createElement('button')
      deleteButton.innerHTML = "Delete this Observation"
      deleteButton.id = `ml-delete-${ml.id}`

      mlList.append(deleteButton)
      deleteButton.addEventListener("click", event => {
         Marinelife.deleteml(ml, event)
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
          //can I do that?

          logList.append(newLog.location)
          console.log("I am here")
          logList.append(newLog.depth)
          logList.append(newLog.current)
          logList.append(newLog.visibility)


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
