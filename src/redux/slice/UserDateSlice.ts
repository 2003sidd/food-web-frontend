import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type UserType from "../../types/user.types";
import type UserSliceInterface from "../../types/UserSlice.interface";

const initialState:UserSliceInterface={
 user:null
}
const userStore = createSlice({
    name:"userDataSlice",
    initialState,
    reducers:{
        setUserData :(state, action:PayloadAction<UserType>) => {
            state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUserData: (state) => {
      state.user = null;
      // Clear from localStorage
      localStorage.removeItem("user");
    }
    }
});

export const {setUserData, clearUserData} = userStore.actions
export default userStore.reducer;
export const selectJwtToken = (state: { userStore: UserSliceInterface }) => state.userStore.user;
