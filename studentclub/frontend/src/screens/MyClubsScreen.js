import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Club from '../components/Club'
import clubs from '../clubs'

function MyClubsScreen() {
  return (
    <div>
        <Row>
        <ListGroup variant='flush'>
                            
                            {clubs.map( item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                
                                            >
                                                <i class="fa fa-sign-out" aria-hidden="true"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
        </Row>
    </div>
  )
}

export default MyClubsScreen