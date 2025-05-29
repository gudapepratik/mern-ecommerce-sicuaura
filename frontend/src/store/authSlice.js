import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status: false,
    userData: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state,action) =>{
            state.status = true,
            state.userData = action.payload // data of the current logged in user
        },
        logout: (state,action) => {
            state.status = false,
            state.userData = null
        }
    }
})

// to import in componenets
export const {login,logout} = authSlice.actions

// to import in store
export default authSlice.reducer


