import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LayoutsScreen } from '../scenes/layouts/layouts.component';

const Stack = createStackNavigator();

export const LayoutsNavigator = (): React.ReactElement => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name='Layouts' component={LayoutsScreen}/>
  </Stack.Navigator>
);
