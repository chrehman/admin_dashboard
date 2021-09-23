import { configureStore } from '@reduxjs/toolkit'


import loginReducer from './Slices/Login/loginSlice'
import citizensReducer from './Slices/Citizens/citizensSlice'
import citizensRequestReducer from './Slices/CitizensRequests/citizensRequestSlice';
import  respondersReducer  from './Slices/Responders/respondersSlice';
import respondersRequestReducer  from './Slices/RespondersRequests/respondersRequestSlice';

export default configureStore({
    reducer: {
        login: loginReducer,
        citizens: citizensReducer,
        citizensRequests: citizensRequestReducer,
        responders: respondersReducer,
        responderRequests: respondersRequestReducer
    },
})