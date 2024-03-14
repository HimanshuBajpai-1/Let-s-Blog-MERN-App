import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading : false,
    blogs : []
}

const blogList = createSlice({
    name:'getBlogs',
    initialState, 
    reducers : {
        setBlogList : (state , action) =>{
            state.loading = true;            
            state.blogs = action.payload;
        }      
    }
})

export const {setBlogList} = blogList.actions;
export default blogList.reducer