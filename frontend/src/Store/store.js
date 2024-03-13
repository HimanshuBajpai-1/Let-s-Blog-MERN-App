import {configureStore} from '@reduxjs/toolkit';
import setUserDetail from '../Reducers/UserReducer/getUserDetailsReducer';
import setBlogList from '../Reducers/BlogReducer/getBlogsList';



export const store = configureStore({
    reducer: {
        userDetails : setUserDetail,
        blogList : setBlogList
    }
})
