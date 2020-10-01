import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Confirmation(props){
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [individualPrice, setIndividualPrice] = useState(0)

  useEffect(() => {
    const id = props.match.params.id;
    const url = `/api/activities/${id}`
    axios.get(url)
      .then(res => 
        {setTitle(res.data.title)
        console.log(res)
        setIndividualPrice(res.data.price_per_person)
        console.log(typeof price_per_person)
        })
        
      .catch(res => console.log(res))

  }, [])
  
  return(
    <>
    <h1>Awesome, let's have you booked in for</h1>
    <h2>{title}</h2>
    <h3>How many spots you want to book?</h3>
    <input type ='number' 
    min='1'
    placeholder='enter your spots'
    onChange={event => 
      setPrice(event.target.value * individualPrice)}
    />
    
    <h3>The total price is $ {price}</h3>
    </>
  )

}


export default Confirmation