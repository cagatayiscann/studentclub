import axios from 'axios'
import {
    CLUB_LIST_REQUEST,
    CLUB_LIST_SUCCESS,
    CLUB_LIST_FAIL,

    CLUB_DETAILS_REQUEST,
    CLUB_DETAILS_SUCCESS,
    CLUB_DETAILS_FAIL,

    CLUB_DELETE_REQUEST,
    CLUB_DELETE_SUCCESS,
    CLUB_DELETE_FAIL,

    CLUB_CREATE_REQUEST,
    CLUB_CREATE_SUCCESS,
    CLUB_CREATE_FAIL,

    CLUB_UPDATE_REQUEST,
    CLUB_UPDATE_SUCCESS,
    CLUB_UPDATE_FAIL,

    CLUB_CREATE_REVIEW_REQUEST,
    CLUB_CREATE_REVIEW_SUCCESS,
    CLUB_CREATE_REVIEW_FAIL,

    CLUB_CREATE_EVENT_REQUEST,
    CLUB_CREATE_EVENT_SUCCESS,
    CLUB_CREATE_EVENT_FAIL,

} from '../constants/clubConstants'

export const listClubs = () => async (dispatch) => {
    try{
        dispatch({ type: CLUB_LIST_REQUEST })

        const { data } = await axios.get('/api/clubs/')

        dispatch({ 
            type: CLUB_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: CLUB_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listClubDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type: CLUB_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/clubs/${id}`)

        dispatch({ 
            type: CLUB_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: CLUB_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteClub = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLUB_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/clubs/delete/${id}/`,
            config
        )

        dispatch({
            type: CLUB_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: CLUB_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createClub = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLUB_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/clubs/create/`,
            {},
            config
        )
        dispatch({
            type: CLUB_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CLUB_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateClub = (club) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLUB_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/clubs/update/${club._id}/`,
            club,
            config
        )
        dispatch({
            type: CLUB_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: CLUB_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: CLUB_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createclubReview = (clubId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLUB_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/clubs/${clubId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: CLUB_CREATE_REVIEW_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: CLUB_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createClubEvent = (clubId, event) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLUB_CREATE_EVENT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/clubs/${clubId}/events/`,
            event,
            config
        )
        dispatch({
            type: CLUB_CREATE_EVENT_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: CLUB_CREATE_EVENT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}