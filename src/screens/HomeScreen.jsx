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

const HomeScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  console.log('🚀 ~ HomeScreen ~ token:', token);
  const user = useSelector(state => state.user.user);
  console.log('🚀 ~ HomeScreen ~ user:', typeof user);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${process.env.API_URL}/logout`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      });
      const data = await res.json();
      console.log('🚀 ~ handleSignOut ~ data:', data);
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        Toast.show({type: 'error', text1: data.message});
        return;
      }
      if (res.status === 401) {
        dispatch(signOutUserFailure(data.message));
        Toast.show({type: 'error', text1: data.message});

        return;
      }
      if (data.success === true) {
        dispatch(signOutUserSuccess(data));
        Toast.show({type: 'success', text1: data.message});
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
      }
    } catch (error) {
      console.log('🚀 ~ handleSignOut ~ error:', error);
      dispatch(signOutUserFailure(error.message));
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
