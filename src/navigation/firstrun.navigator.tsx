import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FirstRunPage1 from '../scenes/auth/firstrunpage/firstrun.component';
import FirstRunPage2 from '../scenes/auth/firstrunpage/firstrun2.component';
import FirstRunPage3 from '../scenes/auth/firstrunpage/firstrun3.component';

const Stack = createStackNavigator();

export const FirstRunNavigator = (): React.ReactElement => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name='FirstRun1' component={FirstRunPage1}/>
    <Stack.Screen name='FirstRun2' component={FirstRunPage2}/>
    <Stack.Screen name='FirstRun3' component={FirstRunPage3}/>
  </Stack.Navigator>
);
