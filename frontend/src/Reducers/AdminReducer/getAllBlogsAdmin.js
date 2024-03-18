import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading : false,
    blogs : []
}

const setAllBlogs = createSlice({
    name:'setAllBlogs',
    initialState,
    reducers : {
        getAllBlogsAdmin : (state,action) => {
            state.loading = true;
            state.blogs = action.payload;
        }
    }
})

export const {getAllBlogsAdmin} = setAllBlogs.actions;
export default setAllBlogs.reducer;