import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BoxOfficeNavigator from './BoxOfficeNavigator';
import SearchNavigator from './SearchNavigator';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="BoxOfficeNavigator"
        component={BoxOfficeNavigator}
        options={{drawerLabel: '박스오피스', title: ''}}
      />
      <Drawer.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{drawerLabel: '영화검색', title: ''}}
      />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
