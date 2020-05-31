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
      submitML.addEventListener("click", event =>{
        MarineLife.createML(newDay, event)
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

      //added the day data
      workarea.innerHTML += this.title;
      workarea.innerHTML += this.date;

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
            logDisplay.innerHTML = "Dive Log Details"
            container.append(logDisplay)
            logDisplay.append(br)
      const mlDisplay = document.createElement('lh')
            mlDisplay.id = `mlDisplay-${this.id}`
            mlDisplay.innerHTML = "Dive Observation Details"
            container.append(mlDisplay)

      this.logs.forEach(log => {
            this.displayLogs(log)
            })

      this.marinelives.forEach(ml => {
            this.displayMLs(ml)
            })

    }

    displayLogs(log) {
        console.log(log.id)
        const lh = document.getElementById(`logDisplay-${this.id}`)
        const ul = document.createElement('ul')
        lh.append(ul)
        const logList = document.createElement('li')
        logList.id = `log-container-${log.id}`
        ul.append(logList)
        logs.innerHTML += log.location
        logs.innerHTML += log.depth
        logs.innerHTML += log.current
        logs.innerHTML += log.visibility

        //changes
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = "Delete this log"
        deleteButton.id = `log-delete-${log.id}`
        //deleteButton.classList.add('delete')
        logList.append(deleteButton)
        deleteButton.addEventListener("click", event => {
            Log.deleteLog(log, event)
        })
    }


    displayMLs(ml) {
        const lh = document.getElementById(`mlDisplay-${this.id}`)
        const ul = document.createElement('ul')
        lh.append(ul)
        const mlList = document.createElement('li')
        mlList.id = `ml-container-${ml.id}`
        ul.append(mlList)
        mlList.innerHTML = ml.content
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
        const location = event.target.previousSibling.value
        //is this correct way to add on to the previously displayed values
        const depth = event.target.previousSibling.value
        const current = event.target.previousSibling.value
        const visibility = event.target.previousSibling.value

        fetch(LOGS_URL, {
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
          logList.id = `log-container-${log.id}`
          ul.append(logList)
          //can I do that?
          logList.innerHTML = newLog.location
          logList.innerHTML += newLog.depth
          logList.innerHTML += newLog.current
          logList.innerHTML += newLog.visibility

          const deleteButton = document.createElement('button')
          deleteButton.id = `log-delete-${log.id}`
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
