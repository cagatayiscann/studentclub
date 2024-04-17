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
    CLUB_CREATE_RESET,

    CLUB_UPDATE_REQUEST,
    CLUB_UPDATE_SUCCESS,
    CLUB_UPDATE_FAIL,
    CLUB_UPDATE_RESET,

    CLUB_CREATE_REVIEW_REQUEST,
    CLUB_CREATE_REVIEW_SUCCESS,
    CLUB_CREATE_REVIEW_FAIL,
    CLUB_CREATE_REVIEW_RESET,

    CLUB_CREATE_EVENT_REQUEST,
    CLUB_CREATE_EVENT_SUCCESS,
    CLUB_CREATE_EVENT_FAIL,
    CLUB_CREATE_EVENT_RESET,
} from '../constants/clubConstants'



export const clubListReducer = (state = { clubs: [] }, action) =>{
    switch(action.type){
        case CLUB_LIST_REQUEST:
            return {loading: true, clubs:[]}

        case CLUB_LIST_SUCCESS:
            return {loading: false, clubs: action.payload}
            
        case CLUB_LIST_FAIL:
            return {loading: false, error: action.payload}
        
        default:
            return state
    }
}

export const clubDetailsReducer = (state = { club: {reviews:[]} }, action) =>{
    switch(action.type){
        case CLUB_DETAILS_REQUEST:
            return {...state, loading: true}

        case CLUB_DETAILS_SUCCESS:
            return {loading: false, club: action.payload}
            
        case CLUB_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        
        default:
            return state
    }
}

export const clubDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CLUB_DELETE_REQUEST:
            return { loading: true }

        case CLUB_DELETE_SUCCESS:
            return { loading: false, success: true }

        case CLUB_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const clubCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CLUB_CREATE_REQUEST:
            return { loading: true }

        case CLUB_CREATE_SUCCESS:
            return { loading: false, success: true, club: action.payload }

        case CLUB_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case CLUB_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const clubUpdateReducer = (state = { club: {} }, action) => {
    switch (action.type) {
        case CLUB_UPDATE_REQUEST:
            return { loading: true }

        case CLUB_UPDATE_SUCCESS:
            return { loading: false, success: true, club: action.payload }

        case CLUB_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case CLUB_UPDATE_RESET:
            return { club: {} }

        default:
            return state
    }
}

export const clubReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CLUB_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case CLUB_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        case CLUB_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case CLUB_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}

export const clubEvetCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CLUB_CREATE_EVENT_REQUEST:
            return { loading: true }

        case CLUB_CREATE_EVENT_SUCCESS:
            return { loading: false, success: true, }

        case CLUB_CREATE_EVENT_FAIL:
            return { loading: false, error: action.payload }

        case CLUB_CREATE_EVENT_RESET:
            return {}

        default:
            return state
    }
}