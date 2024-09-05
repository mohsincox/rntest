import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from '../redux/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import axiosInstance from '../services/api';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authUser.token);
  console.log('🚀 ~ HomeScreen ~ token:', token);
  const user = useSelector(state => state.authUser.user);
  console.log('🚀 ~ HomeScreen ~ user:', typeof user);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const {data} = await axiosInstance.get('/logout');
      if (data.success === true) {
        dispatch(signOutUserSuccess(data));
        Toast.show({type: 'success', text1: data.message});
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
      }
    } catch (error) {
      console.log('🚀 ~ handleSignOut ~ error:', error);
      dispatch(signOutUserFailure(error.response.data.message));
      Toast.show({type: 'error', text1: error.response.data.message});
    }
  };
  return (
    <View>
      <Text>Token: {token}</Text>
      {/* {user && <Text>Name: {JSON.parse(user)?.name}</Text>} */}
      {user && <Text>Name: {user?.name}</Text>}
      <View style={{marginHorizontal: 50}}>
        <Button onPress={handleSignOut} title="Logout" />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
