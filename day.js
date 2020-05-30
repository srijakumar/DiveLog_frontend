class Day {

  constructor(day, logs_attributes, marinelives_attributes) {
    //day doesnt have all the attributes - do i need a separate model?
    this.id = day.id
    this.title = day.title
    this.date = day.date
    this.location = logs_attributes.location
    this.depth = logs_attributes.depth
    this.current = logs_attributes.current
    this.visibility = logs_attributes.visibility
    this.content = marinelives_attributes.content
    Day.all.push(this)
  }

  dayMarkup(){
    return `
      <div data-id=${day.id}>
       <h3>${day.title}</h3>
       <h4>${day.date}</h4>
     </div>
     `;
  }


logMarkup(){
  return`
    <div data-id=${day.id}>
      <p>Location: ${log.location}</p>
      <p>Current: ${log.current}</p>
      <p>Visibility: ${log.visibility}</p>
      <p>Depth: ${log.depth}m</p>
    </div>`;
    }


marineMarkup(){
  return `
      <div data-id=${day.id}>
        <p>Marine life spotted: ${marinelife.content}</p>
        <button data-id=${day.id}>Add Log</button>
        <button data-id=${day.id}>Add Observation</button>
        <button data-id=${day.id}>Edit</button>
        <button data-id=${day.id}>Delete</button>
      </div>
      <br><br>`;
    }


  // function render(day){
  //   const dayMarkup = `
  //     <div data-id=${day.id}>
  //      <h3>${day.title}</h3>
  //      <h4>${day.date}</h4>
  //
  //    </div>
  //    `;
  //
  //
  //    const logMarkup = `
  //      <div data-id=${day.id}>
  //        <p>Location: ${log.location}</p>
  //        <p>Current: ${log.current}</p>
  //        <p>Visibility: ${log.visibility}</p>
  //        <p>Depth: ${log.depth}m</p>
  //      </div>`;
  //
  //
  //
  //   document.querySelector('#diveList').innerHTML += dayMarkup;
  //   day.logs.forEach(log=>{
  //     //debugger
  //     // should the data ids be log and ml ids?
  //     const logMarkup = `
  //       <div data-id=${day.id}>
  //         <p>Location: ${log.location}</p>
  //         <p>Current: ${log.current}</p>
  //         <p>Visibility: ${log.visibility}</p>
  //         <p>Depth: ${log.depth}m</p>
  //       </div>`;
  //         document.querySelector('#diveList').innerHTML += logMarkup
  //   })
  //
  //   day.marinelives.forEach(marinelife=>{
  //     const marineMarkup = `
  //       <div data-id=${day.id}>
  //         <p>Marine life spotted: ${marinelife.content}</p>
  //         <button data-id=${day.id}>Add Log</button>
  //         <button data-id=${day.id}>Add Observation</button>
  //         <button data-id=${day.id}>Edit</button>
  //         <button data-id=${day.id}>Delete</button>
  //       </div>
  //       <br><br>`;
  //         document.querySelector('#diveList').innerHTML += marineMarkup
  //   })
  // }










}

Day.all = [];
