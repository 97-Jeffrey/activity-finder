import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { Button, Alert, Container } from "react-bootstrap"
import '../css/confirmation.css'

import useBookingData from '../hooks/useBookingData'

function Confirmation(props) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [individualPrice, setIndividualPrice] = useState(0)
  const [maxPeople, setMaxPeople] = useState(0)
  const [peopleSelected, setPeopleSelected] = useState(0)
  const { createBooking } = useBookingData()
  const [date, setDate] = useState('')

  useEffect(() => {
    const id = props.match.params.id;
    const url = `/api/activities/${id}`
    axios.get(url)
      .then(res => {
        setTitle(res.data.title)
        setIndividualPrice(res.data.price_per_person)
        setMaxPeople(res.data.max_number_of_participants)
        setDate(res.data.date)
      })
      .catch(res => console.log(res))
  }, [])

  const exception = (event) => {
    if (peopleSelected == 0 || peopleSelected > maxPeople) {
      event.preventDefault();
    } else {
      createBooking(id, individualPrice, peopleSelected)
    }
  }

  const id = props.match.params.id
  const backLink = `/activities/${id}`

  return (
    <>
      <Container>
        <row><h1 className='confirm'>Awesome!</h1></row>
        <row><h2 className='title'>Let's book you in for {title}</h2></row>
        <row>
          <span className='question-spot'>How many spots do you want to book?</span>
          <input
            className='input-spot'
            type='number'
            min='1'
            placeholder='# of spots'
            size='10px'
            onChange={event => {
              setPrice(event.target.value * individualPrice)
              setPeopleSelected(event.target.value)
            }
            }
          />
        </row>
        {peopleSelected > maxPeople && <Alert variant='danger' className='error-max'>Exceeds the maximum number of spots available on that day</Alert>}
        {peopleSelected < 1 && <Alert variant='info' className='error-min'>You must select at least one spot</Alert>}
        <row><h3 className='total-price'>Total price : ${price}.00</h3></row>
        <div className='button-group'>
          <Link to={{pathname:"/bookings", data:[title,date]}}>
            <Button variant="warning" onClick={exception}>Confirm your booking</Button>{' '}
          </Link>
          <Link to={backLink}>
            <Button variant="danger">Cancel</Button>{' '}
          </Link>
        </div>
      </Container>
    </>
  )
}

export default Confirmation