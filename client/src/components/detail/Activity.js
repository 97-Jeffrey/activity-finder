import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Badge, Row, Container, Col } from 'react-bootstrap';
import "../detail/activity.css"
import Banner from '../Banner'
import useFavoriteData from '../../hooks/useFavoriteData'
import { Link } from 'react-router-dom';

function Activity(props) {
  const [activity, SetActivity] = useState({})
  const { createFavorite, getFavoredActivities } = useFavoriteData();
  useEffect(() => {
    const id = props.match.params.id;
    const url = `/api/activities/${id}`
    console.log(props)
    axios.get(url)
      .then(res => SetActivity(res.data))
      .catch(res => console.log(res))

  }, [])
  const id = props.match.params.id
  const confirmationLink = `${id}/confirmation`
  console.log(activity)
  function addFav() {
    return createFavorite(id)
    .then(console.log("Add to Fav"))
    .then(getFavoredActivities())
    .catch(err => console.log("Err adding fav from detail activity page" ,err))
  }
  return (
    <>
    <Banner></Banner>
      <Container>

        <Row>
          <Col>
            <div className='info'>
              <h1>{activity.title}</h1>
              <div className='date'>Date: {activity.date}</div>
            </div>
            <div className='spots'>
              Spots remaining:  <Badge color='info'>{activity.max_number_of_participants}</Badge>
            </div>
            <div className='pricetag'>Price per person: ${activity.price_per_person}
            </div>
            <div className='CTA'>
              <Link to = {confirmationLink}>
              <Button variant="warning">Join this activity</Button>{' '}
              </Link>
              <Link to='/favorites'>
                <Button variant="info" onClick={addFav}>Add to favorites</Button>{' '}
              </Link>
            </div>
          </Col>

          <Col>
            <div className='image'><img src={activity.image_url} alt={activity.title}></img></div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='description'>{activity.description}</div>
          </Col>

        </Row>

      </Container>

    </>
  )
}

export default Activity