import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: {},
  token: null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: state => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      console.log('signInSuccess action.payload', action.payload);
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.success = true;
    },
    signInFailure: (state, action) => {
      console.log('signInFailure action.payload', action.payload);
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: state => {
      state.loading = true;
    },
    signOutUserSuccess: state => {
      state.user = {};
      state.token = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      console.log('signOutUserFailure action.payload', action.payload);
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} = userSlice.actions;

export const selectToken = state => state.authUser.token;
export default userSlice.reducer;
