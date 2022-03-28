/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BoxOffice from './pages/BoxOffice';
import MovieDetail from './pages/MovieDetail';

const Stack = createNativeStackNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    primary: 'rgb(255, 45, 85)',
  },
};

const App: () => Node = () => {
  return (
    <>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator
          // 헤더 안보이게 하기
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="BoxOffice" component={BoxOffice} />
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
