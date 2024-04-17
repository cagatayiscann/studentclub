import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listClubDetails, createclubReview, createClubEvent } from '../actions/clubActions'
import { CLUB_CREATE_REVIEW_RESET, CLUB_CREATE_EVENT_RESET } from '../constants/clubConstants'


function ClubScreen() {

    const [quota, setQuota] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [description, setDescription] = useState('')

    const match = useParams()
    const dispatch = useDispatch()

    const clubDetails = useSelector(state => state.clubDetails)
    const { loading, error, club} = clubDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const clubReviewCreate = useSelector(state => state.clubReviewCreate)
    const { 
        loading:loadingClubReview, 
        error:errorClubReview,
        success:successClubReview,
    } = clubReviewCreate
    
    useEffect(() => {
        if(successClubReview){
            setRating(0)
            setComment('')
            dispatch({ type: CLUB_CREATE_REVIEW_RESET })
        }
        
       dispatch(listClubDetails(match.id))
    
    }, [dispatch, match, successClubReview])

    const JoinHandler = (e) =>{
        e.preventDefault()
        console.log('join')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createclubReview(
            match.id, {
                rating,
                comment
            }
        ))
    }

    const submitEventHandler = (e) =>{
        e.preventDefault()
        console.log('submit event')
        
    }


  return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        {loading ? 
            <Loader />
            : error 
                ? <Message variant='danger'>{error}</Message>
                :  (
                        <div>
                            <Row>

                                <Col md={6}>
                                    <Image src={club.image} alt={club.name} fluid />
                                </Col>


                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h1>{club.name}</h1>
                                        </ListGroup.Item>

                                        <ListGroup.Item variant='flush'>
                                            <Rating value={club.rating} text={`${club.numReviews} reviews`} color={'#f8e825'} />
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            {club.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {club.quota > 0 ? 'Available' : 'Club is full'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            

                                            <ListGroup.Item>
                                                <Button
                                                    onClick={JoinHandler}
                                                    className='btn-block'
                                                    //disabled={club.quota === 0 }
                                                    type='button'>
                                                    Join Club
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>    
                                    </Card>
                                        <Card>
                                            <ListGroup.Item>
                                                <h4>Events</h4>
                                            </ListGroup.Item>

                                        </Card>

                                        <Card>
                                            <ListGroup variant="flush">

                                                <ListGroup.Item>
                                                    <Button
                                                    type='submit'>
                                                        Members
                                                    </Button>
                                                </ListGroup.Item>

                                            </ListGroup>
                                        </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <h4>Reviews</h4>
                                    {club.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                                    <ListGroup variant='flush'>
                                        {club.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825'/>
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4>Write a review</h4>

                                            {loadingClubReview && <Loader/>}
                                            {successClubReview && <Message variant='success'>Review submitted</Message>}
                                            {errorClubReview && <Message variant='danger'>{errorClubReview}</Message>}
                                            
                                            
                                            {userInfo ? (
                                                    <Form onSubmit={submitHandler}>
                                                        <Form.Group controlId='rating'>
                                                            <Form.Label>Rating</Form.Label>
                                                            <Form.Control
                                                                as='select'
                                                                value={rating}
                                                                onChange={(e) => setRating(e.target.value)}
                                                            >
                                                                <option value=''>Select...</option>
                                                                <option value='1'>1 - Poor</option>
                                                                <option value='2'>2 - Fair</option>
                                                                <option value='3'>3 - Good</option>
                                                                <option value='4'>4 - Very Good</option>
                                                                <option value='5'>5 - Excellent</option>
                                                            </Form.Control>
                                                        </Form.Group>
    
                                                        <Form.Group controlId='comment'>
                                                            <Form.Label>Review</Form.Label>
                                                            <Form.Control
                                                                as='textarea'
                                                                row='5'
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                            ></Form.Control>
                                                        </Form.Group>
    
                                                        <Button
                                                            disabled={loadingClubReview}
                                                            type='submit'
                                                            variant='primary'
                                                        >
                                                            Submit
                                                        </Button>
    
                                                    </Form>
                                            ): (
                                                <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                )
        }

    </div>
  )
}

export default ClubScreen