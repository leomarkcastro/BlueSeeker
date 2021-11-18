import React from 'react';
import { createStackNavigator, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import { JobsScreen } from '../scenes/jobs/jobs.component';
import { JobViewScreen } from '../scenes/jobs/jobview.component';

const Stack = createStackNavigator();

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
          //{
          //  rotate: current.progress.interpolate({
          //    inputRange: [0, 1],
          //    outputRange: [1, 0],
          //  }),
          //},
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
}

export const JobsNavigator = (): React.ReactElement => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name='Jobs' component={JobsScreen}/>
    <Stack.Screen name='JobView' component={JobViewScreen} options={MyTransition}/>
  </Stack.Navigator>
);
