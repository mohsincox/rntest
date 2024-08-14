import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import StackNavigator from './src/navigation/StackNavigator';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigator />
        <Toast position="top" visibilityTime={10000} />
      </PersistGate>
    </Provider>
  );
}

export default App;
