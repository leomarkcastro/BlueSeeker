import React from 'react';
import { createStackNavigator, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import { ProposalsScreen } from '../scenes/proposals/proposals.component';

const Stack = createStackNavigator();

export const ProposalsNavigator = (): React.ReactElement => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name='Jobs' component={ProposalsScreen}/>
  </Stack.Navigator>
);
