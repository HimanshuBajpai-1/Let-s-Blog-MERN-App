import {configureStore} from '@reduxjs/toolkit';
import setUserDetail from '../Reducers/UserReducer/getUserDetailsReducer';
import setBlogList from '../Reducers/BlogReducer/getBlogsList';
import setBlogDetails from '../Reducers/BlogReducer/getBlogDetails';



export const store = configureStore({
    reducer: {
        userDetails : setUserDetail,
        blogList : setBlogList,
        blogDetails : setBlogDetails
    }
})
