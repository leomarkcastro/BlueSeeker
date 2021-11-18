import React, { ReactElement } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';
import { Button, Input, Text, Icon, Avatar } from '@ui-kitten/components';
import { ImageOverlay } from '../../extra/image-overlay.component';
import { PersonIcon } from '../../extra/icons';
//import { KeyboardAvoidingView } from '../../extra/3rd-party';
import { useDispatch } from 'react-redux';

import { loginUser } from "../../../service/firebase/firebase_init.js"

export default ({ navigation }): React.ReactElement => {

  return (
      <ImageOverlay
        style={styles.container}
        source={require('../assets/image-background.png')}>

        <View style={styles.headerContainer}>
          <Avatar
            style={styles.logo}
            size='giant'
            source={require('../../../assets/images/image-app-icon.png')}
          />
          <Text
            style={styles.signInLabel}
            category='s1'
            status='control'>
            Let's find you a job
          </Text>
          <Text
            style={styles.signInLabel}
            category='s1'
            status='control'>
            Connecting to Server...
          </Text>
        </View>
        <View style={styles.formContainer}>

        </View>

      </ImageOverlay>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  formContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  logo: {
    borderRadius: 10,
    transform : [
      {
        scale: 2
      },
      {
        translateY: -20
      }
    ]  
  }
});

