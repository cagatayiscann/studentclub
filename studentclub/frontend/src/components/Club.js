import React from 'react'
import { Card, Ratio } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

function Club({ club }) {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/club/${club._id}`}>
            <Card.Img src={club.image}/>
        </Link>

        <Card.Body>
          <Link to={`/club/${club._id}`} style={{ textDecoration: 'none' }}>
            <Card.Title as="div">
              <strong>{club.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as='div'>
            {club.description}
          </Card.Text>

          <Card.Text as="div">
            <div className='my-3'>
              <Rating value={club.rating} text={`${club.numReviews} reviews`} color={'#f8e825'} />
             </div>
          </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Club