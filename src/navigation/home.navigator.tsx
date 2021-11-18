import React from 'react';
import { LogBox } from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LayoutsNavigator } from './layouts.navigator';
import { HomeBottomNavigation } from '../scenes/home/home-bottom-navigation.component';
import { HomeDrawer } from '../scenes/home/home-drawer.component';
import { JobsNavigator } from './jobs.navigator';
import { ProposalsNavigator } from './proposals.navigator';
import { ProfileNavigator } from './profile.navigator';
//import { LibrariesScreen } from '../scenes/libraries/libraries.component';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? 'Components' : 'Layouts';

const ROOT_ROUTES: string[] = ['Jobs', 'Proposals', 'Profile'];

const TabBarVisibilityOptions = ({ route }): BottomTabNavigationOptions => {
  const isNestedRoute: boolean = route.state?.index > 0;
  const isRootRoute: boolean = ROOT_ROUTES.includes(route.name);

  return { tabBarVisible: isRootRoute && !isNestedRoute, headerShown: false };
};

const HomeTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibilityOptions}
    initialRouteName={initialTabRoute}
    tabBar={props => <HomeBottomNavigation {...props} />}>
    <BottomTab.Screen name='Jobs' component={JobsNavigator} />
    <BottomTab.Screen name='Proposals' component={ProposalsNavigator} />
    <BottomTab.Screen name='Profile' component={ProfileNavigator} />
  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: false, headerShown: false}}
    drawerContent={props => <HomeDrawer {...props} />}>
    <Drawer.Screen name='Home' component={HomeTabsNavigator} />
    {/*
    <Drawer.Screen name='Libraries' component={LibrariesScreen} />
    */}
  </Drawer.Navigator>
);

LogBox.ignoreLogs(['Accessing the \'state\'']);
