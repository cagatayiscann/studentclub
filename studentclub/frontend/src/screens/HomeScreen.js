import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col,  } from 'react-bootstrap'
import Club from '../components/Club'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listClubs } from '../actions/clubActions'
import { useLocation, useNavigate } from 'react-router-dom'

function HomeScreen() {

  const dispatch = useDispatch()
  const location = useLocation()

  const clubList = useSelector(state => state.clubList)
  const {error, loading, clubs} = clubList

  let keyword = location

  useEffect(() => {
    dispatch(listClubs(keyword))
  }, [dispatch, keyword])


  return (
    <div>
        <h1>Clubs</h1>
        {loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>
            :
            <div>
              <Row>
                {clubs.map( club => (
                    <Col key={club._id} sm={12} md={6} lg={4} xl={3}>
                        <Club club={club}/>
                    </Col>
                ))}
              </Row>
            </div>
        }
        
    </div>
  )
}

export default HomeScreen