const url = "http://localhost:3000/days"


document.addEventListener("DOMContentLoaded", () => {
    fetchDays()
    const createDayForm = document.querySelector('#diveInputForm')
    //const input = document.createElement('input')
    //createDayForm.appendChild(input)
    createDayForm.addEventListener("submit", (e) => createFormHandler(e))
  })


function fetchDays() {
  fetch(url)
  .then(response => response.json())
  .then(days => {
    days.forEach(day => {
        // double check how your data is nested in the console so you can successfully access the attributes of each individual object
        const dayMarkup = `
          <div data-id=${day.id}>
            <h3>${day.title}</h3>
            <h4>${day.date}</h4>
          </div>
          `;
          //debugger
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
    debugger
    console.log(day);

    const dayMarkup = `
      <div data-id=${day.id}>
       <h3>${day.title}</h3>
       <h4>${day.date}</h4>

     </div>
     `;

    document.querySelector('#diveList').innerHTML += dayMarkup;
    day.logs.forEach(log=>{
      debugger
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


}



document.addEventListener("DOMContentLoaded", () => {
  fetchDays()
})



class Day {
  constructor(id, date, logs, marinelives){
    this.id = id
    this.date = date
    this.logs = logs
    this.marinelives = marinelives
  }


}

class Log {
  constructor(day, log){
    this.day = day.id
    this.location = log.location
    this.current = log.current
    this.visibility = log.visibility
    this.depth = log.depth
  }
}



class Marinelife{
  constructor(day, ml){
    this.day = day.id
    this.content = ml.content
  }
}
