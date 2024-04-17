import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { listClubs, deleteClub, createClub } from '../actions/clubActions'
import { CLUB_CREATE_RESET } from '../constants/clubConstants'


function ClubListScreen({}) {

    const match = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const clubList = useSelector(state => state.clubList)
    const { loading, error, clubs } = clubList

    const clubDelete = useSelector(state => state.clubDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = clubDelete

    const clubCreate = useSelector(state => state.clubCreate)
    const { loading:loadingCreate, error:errorCreate, success:successCreate, club:createdClub } = clubCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        dispatch({ type: CLUB_CREATE_RESET })
        if (!userInfo.isAdmin) {
            navigate('/login')
        } 

        if(successCreate){
            navigate(`/admin/club/${createdClub._id}/edit`)
        }else{
            dispatch(listClubs())
        }

    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdClub])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this club?')) {
            dispatch(deleteClub(id))
        }
    }

    const createClubHandler = () => {
        dispatch(createClub())
    }

    return (
        <div>
            <Row className='allisgn-items-center'>
                <Col>
                    <h1>Clubs</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createClubHandler}>
                        <i className='fas fa-plus'></i> Create Club
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {clubs.map(club => (
                                        <tr key={club._id}>
                                            <td>{club._id}</td>
                                            <td>{club.name}</td>
                                            <td>
                                                <LinkContainer to={`/admin/club/${club._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(club._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        </div>
                    )}
        </div>
    )
}

export default ClubListScreen