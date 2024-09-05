import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const token = useSelector(state => state.authUser.token);
  console.log('🚀 ~ StackNavigator ~ token:', token);
  return (
    <NavigationContainer>
      {token === null || token === '' || token === undefined ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
