import React, {Fragment, useState} from 'react';
import axios from 'axios';
import Activity from "./Activity"
import "../css/activities.css"

function Activities(props){

  const [state, setState] = useState({message:"click button to load data!"})
  const [activities, setActivities] = useState([])

  const fetchData = () => {
    axios.get('/api/activities') 
    .then((response) => {
      console.log(response) // The entire response from the Rails API
      setActivities(response.data) //The first activity
      setState({
        message: `All ${response.data.length} activities are rendered at this point`
      });
    }) 
  }

  const activityList = activities.map(item=>{
    return(
    <Activity 
      key={item.id}
      item={item} 
    />
    )
  })

  return (
    <Fragment>
    <div className="App">
      <h1>This is the index(or home) page of our App</h1>
      <h1>{ state.message }</h1>
      <button onClick={fetchData} >
        Render all activities 
      </button>       
    </div>
    
      <ul className='grid'>{activityList}</ul>
    
  </Fragment>
  )
}

export default Activities