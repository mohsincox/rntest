import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  console.log('🚀 ~ HomeScreen ~ token:', token);

  useEffect(() => {
    const fetchUser = async () => {
      const tkn = await AsyncStorage.getItem('token');
      setToken(tkn);
    };

    // const tokenCheck = () => {
    //   if (!token) {
    //     navigation.replace('Login');
    //   }
    // };

    fetchUser();
    // tokenCheck();
  }, []);

  // const tokenCheck = () => {
  //   if (!token) {
  //     navigation.replace('Login');
  //   }
  // };

  // tokenCheck();
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    const url = `${process.env.API_URL}/logout`;
    console.log('🚀 ~ clearAuthToken ~ url:', url);
    try {
      await AsyncStorage.removeItem('token');
      setToken('');
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      });

      const json = await response.json();
      console.log('🚀 ~ clearAuthToken ~ json:', json);
      if (json.success) {
        navigation.replace('Login');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <View>
      <Text>rrrrrrrrrrrrrrr {token}</Text>
      <Button onPress={logout} title="Logout"></Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
