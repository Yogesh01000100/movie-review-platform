import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:false,
        email: '',
        password: ''
    },
    reducers:{
        login: (state)=>{
            state.user=true
        },

        logout: (state)=>{
            state.user=false
        },

        setEmail: (state, action)=>{
            state.email=action.payload;
        },

        setPassword: (state, action)=>{
            state.password=action.payload;
        }
    }
});

export const {login, logout, setEmail, setPassword}=authSlice.actions;

export default authSlice.reducer;