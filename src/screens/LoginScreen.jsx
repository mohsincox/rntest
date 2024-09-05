import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {login} from '../redux/user/userSlice';
import {useDispatch} from 'react-redux';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  // const {loading, user, token, error, success} = useSelector(
  //   state => state.authUser,
  // );

  // useEffect(() => {
  //   if (error) {
  //     Toast.show({type: 'error', text1: error});
  //   }
  // });

  const handleSubmit = async () => {
    const userData = {
      email: username,
      password,
    };

    dispatch(login(userData));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="USERNAME"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingVertical: 40,
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 7,
  },
  button: {
    backgroundColor: '#000000',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 40,
  },
});
