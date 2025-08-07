import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/UserDateSlice"
import userJwtReducer from "./slice/UserJwtSlice"


const store = configureStore({
    reducer:{
        userJwtReducer,userReducer
    }
});

export default store; 
export type RootState = ReturnType<typeof store.getState>;