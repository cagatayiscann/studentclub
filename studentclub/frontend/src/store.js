import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' 
import { 
    clubListReducer,
    clubDetailsReducer,
    clubDeleteReducer,
    clubCreateReducer,
    clubUpdateReducer,
    clubReviewCreateReducer,
    clubEvetCreateReducer,
} from './reducers/clubReducers'
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userUpdateReducer
} from './reducers/userReducers'


const reducer = combineReducers({
    clubList: clubListReducer,
    clubDetails: clubDetailsReducer,
    clubDelete: clubDeleteReducer,
    clubCreate: clubCreateReducer,
    clubUpdate: clubUpdateReducer,
    clubReviewCreate: clubReviewCreateReducer,
    clubEventCreate: clubEvetCreateReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDetailsReducer,
    userUpdate: userUpdateReducer,

})



const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null



const initialState = {
    userLogin:{userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store