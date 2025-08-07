import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type UserJwtState from '../../types/UserJwt,interface';



// Define the initial state with the proper type
const initialState: UserJwtState = {
  token: null,
};

const userJwtSlice = createSlice({
  name: 'userJwt',
  initialState,
  reducers: {
    // Action to set the JWT token
    setJwt: (state, action: PayloadAction<string>) => {
      state.token = action.payload; // Store the JWT token
    },
    
    // Action to clear the JWT token
    clearJwtToken: (state) => {
      state.token = null; // Clear the JWT token
    },
  },
});

// Export actions
export const { setJwt, clearJwtToken } = userJwtSlice.actions;

// Export selector to access the JWT token from state
export const selectJwtToken = (state: { userJwt: UserJwtState }) => state.userJwt.token;

// Export reducer
export default userJwtSlice.reducer;
