import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listClubDetails, updateClub } from '../actions/clubActions'
import { CLUB_UPDATE_RESET } from '../constants/clubConstants'

function ClubEditScreen() {

    const clubId = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const clubDetails = useSelector(state => state.clubDetails)
    const { error, loading, club } = clubDetails

    const clubUpdate = useSelector(state => state.clubUpdate)
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = clubUpdate

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: CLUB_UPDATE_RESET })
            navigate('/admin/clubList')
        }else{
            if (!club.name || club._id !== Number(clubId.id)) {
                dispatch(listClubDetails(clubId.id))
            } else {
                setName(club.name)
                setName(club.image)
                setName(club.description)
            }
        }
    }, [dispatch, club, clubId, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateClub({
            _id:clubId.id,
            name,
            image,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('club_id', clubId.id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/clubs/upload/', formData, config)
            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/clubList'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>
                                <Form.Control
                                    type="file"
                                    onChange={uploadFileHandler}
                                ></Form.Control>
                                {uploading && <Loader/>}

                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>

                        </Form>

                )}

                        
            </FormContainer >
        </div>

    )
}

export default ClubEditScreen