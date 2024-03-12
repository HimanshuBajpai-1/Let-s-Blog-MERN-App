import {configureStore} from '@reduxjs/toolkit';
import setUserDetail from '../Reducers/UserReducer/getUserDetailsReducer';



export const store = configureStore({
    reducer: {
        userDetails : setUserDetail
    }
})
