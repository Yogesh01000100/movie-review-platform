import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        email: '',
        password: ''
    },
    reducers:{
        login: (state, action)=>{
            state.user = {
                uid: action.payload.uid,
                email: action.payload.email,
                displayName: action.payload.displayName,
                photoURL: action.payload.photoURL
            };
        },

        logout: (state)=>{
            state.user=null
        }
    }
});

export const {login, logout}=authSlice.actions;

export default authSlice.reducer;