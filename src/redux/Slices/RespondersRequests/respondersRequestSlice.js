import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
}

export const respondersRequestSlice = createSlice({
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
export const { login } = respondersRequestSlice.actions

export default respondersRequestSlice.reducer