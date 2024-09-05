import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/user/userSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authUser.token);
  console.log('🚀 ~ HomeScreen ~ token:', token);
  const user = useSelector(state => state.authUser.user);
  console.log('🚀 ~ HomeScreen ~ user:', typeof user);

  const handleSignOut = async () => {
    dispatch(logout());
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
