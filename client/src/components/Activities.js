import React, {  useState } from 'react';
import axios from 'axios';
import Activity from "./Activity"
import "../css/activities.css"
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import Banner from './Banner'
import { Button, CardColumns, Container, Spinner } from 'react-bootstrap'

function Activities(props) {

  const [state, setState] = useState( "Let's go!" )
  const [activities, setActivities] = useState([])
  const [city, setCity] = useState("Choose Your City")
  const [priceRange, setPriceRange] = useState('Your Ideal Price Range')
  const [status, setStatus] = useState('')

  const fetchData = () => {
    axios.get('/api/activities')
      .then((response) => {
        setStatus('loading')
        console.log(response) // The entire response from the Rails API
        setActivities(response.data) //The first activity
        setState();
      })
  }
  console.log(city);
  const inRange = (item) => {
    const rangeArray = priceRange.split(" - ").map(item => parseInt(item.substring(1)));
    if (item.price_per_person >= rangeArray[0] && item.price_per_person <= rangeArray[1]) {
      return true
    }
  }

  const activityList = activities.map(item => {
    if (item.city === city && inRange(item)) {
      return (
        <Activity
          key={item.id}
          item={item}
        />
      )
    }
  })

  return (

    <>
      <Banner>
        <div className="search-box">
          <h3>Enter your location and budget below to view our activities!</h3>
          <br />
          <div className='dropdown-button'>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {city}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { setCity('Vancouver') }}>Vancouver</Dropdown.Item>
                <Dropdown.Item onClick={() => { setCity('North Vancouver') }}> North Vancouver</Dropdown.Item>
                <Dropdown.Item onClick={() => { setCity('Whistler') }}>Whistler</Dropdown.Item>
                <Dropdown.Item onClick={() => { setCity('Delta') }}>Delta</Dropdown.Item>
                <Dropdown.Item onClick={() => { setCity('Victoria') }}>Victoria</Dropdown.Item>
                <Dropdown.Item onClick={() => { setCity('Squamish') }}>Squamish</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {priceRange}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { setPriceRange("$0 - $40") }}>$0 - $40</Dropdown.Item>
                <Dropdown.Item onClick={() => { setPriceRange('$41 - $80') }}>$41 - $80</Dropdown.Item>
                <Dropdown.Item onClick={() => { setPriceRange('$81 - $120') }}>$81 - $120</Dropdown.Item>
                <Dropdown.Item onClick={() => { setPriceRange('$121 - $160') }}>$121 - $160</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button id="search-button" variant="primary" onClick={fetchData} >
              Search activities nearby
      </Button>
          </div>
        </div>

      </Banner>
      <div className="App">
        <h1>{state}</h1>
      </div>
      {status ==='loading' && activities.length === 0 &&
      <div className='spinner-container'>
         <Button variant="dark" disabled>
          <Spinner animation="border" role="status" className='spinner'>
        </Spinner>
        <span className='spinner-text'>loading activities</span>
        </Button>
      </div>}  
      <Container>
        <CardColumns>
          {activityList}
        </CardColumns>
      </Container>

    </>
  )
}

export default Activities