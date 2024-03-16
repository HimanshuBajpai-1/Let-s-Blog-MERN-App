import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading : false,
    users : []
}

const setAllUsers = createSlice({
    name:'setAllUsers',
    initialState,
    reducers : {
        getAllUsersAdmin : (state,action) => {
            state.loading = true;
            state.users = action.payload;
        }
    }
})

export const {getAllUsersAdmin} = setAllUsers.actions;
export default setAllUsers.reducer;