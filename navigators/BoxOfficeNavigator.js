import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BoxOffice from '../pages/BoxOffice';
import MovieDetail from '../pages/MovieDetail';

const Stack = createNativeStackNavigator();

function BoxOfficeNavigator() {
  return (
    <Stack.Navigator
      // 헤더 안보이게 하기
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BoxOffice" component={BoxOffice} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
}

export default BoxOfficeNavigator;
