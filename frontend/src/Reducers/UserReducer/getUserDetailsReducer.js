import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading : false,
    isAuthenticated: false,
    isAdmin : false,
    user : {}
}

const userDetails = createSlice({
    name:'getUserDetail',
    initialState, 
    reducers : {
        setUserDetail : (state , action) =>{
            state.loading = true;
            state.isAuthenticated =true;
            state.user = action.payload;
            if(action.payload.role==='Admin'){
                state.isAdmin = true
            }
        },
        logOutUser : (state) => {
            state.loading = true;
            state.isAuthenticated =false;
            state.isAdmin = false;
            state.user = {}
        },
        notFound : (state) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.isAdmin = false;
        }
    }
})

export const {setUserDetail ,logOutUser ,notFound} = userDetails.actions;
export default userDetails.reducer