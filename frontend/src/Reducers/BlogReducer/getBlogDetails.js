import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading : false,
    dataFound : false,
    blog : {}
}

const blogDetail = createSlice({
    name:'getBlogDetail',
    initialState, 
    reducers : {
        setBlogDetails : (state , action) =>{
            state.loading = true; 
            state.dataFound = true           
            state.blog = action.payload;
        },
        setError : (state) => {
            state.loading = true;  
            state.dataFound = false          
            state.blog = {};
        }         
    }
})

export const {setBlogDetails , setError} = blogDetail.actions;
export default blogDetail.reducer;