import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
}

export const citizensRequestSlice = createSlice({
    name: 'login',
    initialState:{
        isLogin: false,
    },
    reducers: {
        login:(state,action)=>{
            // console.log(action)
            return {isLogin: true,data:action.payload}
        }
    },
})

// Action creators are generated for each case reducer function
export const { login } = citizensRequestSlice.actions

export default citizensRequestSlice.reducer