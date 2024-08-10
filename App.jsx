import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
export const UserContext = createContext(null);

function App() {
  const [authUser, setAuthUser] = useState({
    user: {},
    token: null,
  });
  console.log(
    '🚀 ~ App ~ authUser:------------------in App.jsx-------',
    authUser,
  );

  useEffect(() => {
    const fetchUser = async () => {
      const tkn = await AsyncStorage.getItem('token');
      const usr = await AsyncStorage.getItem('user');
      setAuthUser(prev => {
        return {...prev, token: tkn, user: JSON.parse(usr)};
      });
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{authUser, setAuthUser}}>
      <NavigationContainer>
        {authUser.token === null || authUser.token === '' ? (
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
      <Toast position="top" visibilityTime={10000} />
    </UserContext.Provider>
  );
}

export default App;
