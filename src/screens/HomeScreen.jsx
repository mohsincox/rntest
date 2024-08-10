import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../App';

const HomeScreen = () => {
  const {authUser, setAuthUser} = useContext(UserContext);

  console.log('🚀 ~ HomeScreen ~ token:', authUser.token);
  console.log('🚀 ~ HomeScreen ~ user:', typeof authUser.user);

  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    const url = `${process.env.API_URL}/logout`;
    console.log('🚀 ~ clearAuthToken ~ url:', url);
    try {
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.token}`,
        },
        method: 'GET',
      });

      const json = await response.json();
      console.log('🚀 ~ clearAuthToken ~ json:', json);

      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setAuthUser(prev => {
        return {...prev, token: null, user: {}};
      });
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <View>
      <Text>Token: {authUser.token}</Text>
      <Text>Name: {authUser.user.name}</Text>
      <Button onPress={logout} title="Logout" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
