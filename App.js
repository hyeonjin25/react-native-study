/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BoxOffice from './pages/BoxOffice';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="BoxOffice" component={BoxOffice} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
