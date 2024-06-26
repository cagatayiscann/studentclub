import React, { useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()
    
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}`);
        } else {
            navigate(navigate.location.pathname);
        }
    }

    console.log("my keyword", keyword)

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={ (e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-3'
            ></Button>
        </Form>
    )
}

export default SearchBox