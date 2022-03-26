/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BoxOffice from './pages/BoxOffice';

const App: () => Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="BoxOffice" component={BoxOffice } />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
