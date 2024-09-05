import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const initialState = {
  loading: false,
  user: {},
  token: null,
  error: null,
  success: false,
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const {data} = await axiosInstance.post('/login', JSON.stringify(user));
    console.log('data----', data);
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
    Toast.show({type: 'success', text1: data.message});
    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    Toast.show({type: 'error', text1: '-slice- ' + message});
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const {data} = await axiosInstance.get('/logout');
    console.log('🚀 ~ logout ~ data:', data);
    if (data.success === true) {
      Toast.show({type: 'success', text1: data.message});
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return data; // working without return
  } catch (error) {
    console.log('🚀 ~ handleSignOut ~ error:', error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // Toast.show({type: 'error', text1: error.response.data.message});
    Toast.show({type: 'error', text1: '-slice logout- ' + message});
    return thunkAPI.rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('signInSuccess action.payload', action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.log('signInFailure action.payload', action.payload);
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logout.pending, state => {
        console.log('-----logout.pending-----');
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        console.log('-----logout.fulfilled-----');
        state.user = {};
        state.token = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log('-----logout.rejected-----', action.payload);
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const {} = userSlice.actions;

export const selectToken = state => state.authUser.token;
export default userSlice.reducer;
