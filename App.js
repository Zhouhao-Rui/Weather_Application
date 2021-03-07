/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  View,
} from 'react-native';
import store from './android_app/store'
import { Provider } from 'react-redux'

import TxComp from './android_app/TxComp'
import AuthProvider from './android_app/contexts/authContext'

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <TxComp />
      </AuthProvider>
    </Provider>
  );
};


export default App;
