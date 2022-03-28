import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from '../pages/Search';
import MovieDetail from '../pages/MovieDetail';

const Stack = createNativeStackNavigator();

function SearchNavigator() {
  return (
    <Stack.Navigator
      // 헤더 안보이게 하기
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

export default SearchNavigator;
