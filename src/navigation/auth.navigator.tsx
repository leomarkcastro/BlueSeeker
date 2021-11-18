import React, { useEffect, useState } from 'react';
import { createStackNavigator, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import LoginScreen from '../scenes/auth/loginpage/login.component';
import SignupPage from '../scenes/auth/signuppage/signup.component';
import LoadingPage from '../scenes/auth/loadingpage/loading.component';

import { useDispatch, useSelector } from 'react-redux';
import { HomeNavigator } from './home.navigator';

import { hookAccount, getAccountInfo } from "../service/firebase/firebase_init"
import { FirstRunNavigator } from './firstrun.navigator';

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
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width*2, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
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

export const AuthNavigator = (): React.ReactElement => {

  const [ isLoading, setLoading ] = useState(true)
  const dispatch = useDispatch();
  //dispatch({type: "SET_AUTH", value: false});
  const isSignedIn = useSelector( state => state.auth.auth );
  const isFirstRun = useSelector( state => state.auth.authaccount );

  hookAccount(async (auth) => {
    //console.log(auth)
    // null or object
    if (auth === null){
      setLoading(false)
    }
    else if (auth && (!isSignedIn)){
      try{
        let data = await getAccountInfo(auth.uid);
        dispatch({type: "SET_AUTHACCOUNT", account: auth, info: data});
        setLoading(false)
      }
      catch(e){
        console.log(e)
      }
      
    }
    
  })

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {
        isLoading ?
        <Stack.Screen name='StartLoading' component={LoadingPage}/>
        :
        isFirstRun && isFirstRun["first_run"] ?
        <Stack.Screen name='FirstRun1' component={FirstRunNavigator}/>
        :
        isSignedIn ?
        <Stack.Screen name='HomeRoot' component={HomeNavigator}/>
        :
        <>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='SignUp' component={SignupPage} options={MyTransition}/>
        </>
      }
      
      

    </Stack.Navigator>
    )
};
