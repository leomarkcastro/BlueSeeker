import React from 'react';
import { createStackNavigator, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import { ProfileScreen } from '../scenes/profile/profile.component';
import { FirstRunNavigator } from './firstrun.navigator';

const Stack = createStackNavigator();

export const ProfileNavigator = (): React.ReactElement => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name='Profile' component={ProfileScreen}/>
    <Stack.Screen name='FirstRun1' component={FirstRunNavigator}/>
  </Stack.Navigator>
);
