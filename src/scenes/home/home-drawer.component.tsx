import React, { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Divider,
  Drawer,
  DrawerItem,
  DrawerElement,
  Layout,
  Text,
  IndexPath,
} from '@ui-kitten/components';
import { HomeIcon, LogoutIcon } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
//import { WebBrowserService } from '../../services/web-browser.service';
import { AppInfoService } from '../../service/app-info.service';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../service/firebase/firebase_init.js'

const version: string = AppInfoService.getVersion();

export const HomeDrawer = ({ navigation }): DrawerElement => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(null);
  const dispatch = useDispatch();

  const DATA = [
    /*
    {
      title: 'Home',
      icon: HomeIcon,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate('Home');
      },
    },
    
    {
      title: 'Libraries',
      icon: GithubIcon,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate('Libraries');
      },
    },
    {
      title: 'Documentation',
      icon: BookIcon,
      onPress: () => {
        WebBrowserService.openBrowserAsync('https://akveo.github.io/react-native-ui-kitten');
        navigation.toggleDrawer();
      },
    },
    */
    {
      title: 'Sign Out',
      icon: LogoutIcon,
      onPress: () => {
        navigation.toggleDrawer();
        logoutUser();
        dispatch({type: "SET_AUTH", value: false});
      },
    },
  ];

  const renderHeader = (): ReactElement => (
    <SafeAreaLayout insets='top' level='2'>
      <Layout style={styles.header} level='2'>
        <View style={styles.profileContainer}>
          <Avatar
            size='giant'
            source={require('../../assets/images/image-app-icon.png')}
          />
          <Text style={styles.profileName} category='h6'>
            BlueSeeker
          </Text>
        </View>
      </Layout>
    </SafeAreaLayout>
  );

  const renderFooter = () => (
    <SafeAreaLayout insets='bottom'>
      <React.Fragment>
        <Divider />
        <View style={styles.footer}>
          <Text>{`Version ${AppInfoService.getVersion()}`}</Text>
        </View>
      </React.Fragment>
    </SafeAreaLayout>
  );

  return (
    <Drawer
      header={renderHeader}
      footer={renderFooter}
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      {DATA.map((el, index) => (
        <DrawerItem
          key={index}
          title={el.title}
          onPress={el.onPress}
          accessoryLeft={el.icon}
        />
      ))}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});
