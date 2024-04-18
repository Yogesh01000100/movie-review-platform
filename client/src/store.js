import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../src/features/auth/authSlice';

export const store=configureStore({
    reducer:{
        auth: authReducer
    },
});