import React, { ReactElement } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';
import { Button, Input, Text, Icon, Avatar, Modal, Card, Spinner, Layout } from '@ui-kitten/components';
import { ImageOverlay } from '../../extra/image-overlay.component';
import { PersonIcon } from '../../extra/icons';
//import { KeyboardAvoidingView } from '../../extra/3rd-party';
import { useDispatch } from 'react-redux';

import { loginUser } from "../../../service/firebase/firebase_init.js"
import ModalLoading from '../../../components/modal-loading.component';

export default ({ navigation }): React.ReactElement => {

  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const [visible, setVisible] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>("Logging In");
  const [loading, setLoading] = React.useState<boolean>(true);

  const dispatch = useDispatch();

  const onSignInButtonPress = (): void => {
    setVisible(true)
    setLoading(true)
    setText("Logging In")
    loginUser(email, password, (auth) => {
      if(auth === false){
        //setVisible(false)
        setLoading(false)
        setText("Failed To Log In")
      }
    });
  };

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate('ForgotPassword');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
      <ImageOverlay
        style={styles.container}
        source={require('../assets/image-background.png')}>

        <ModalLoading 
          visible={visible} 
          setVisible={setVisible} 
          dismissable={loading}
          isLoading={loading} 
          text={text}
        />

        <View style={styles.headerContainer}>
          <Avatar
            style={styles.logo}
            size='giant'
            source={require('../../../assets/images/image-app-icon-title.png')}
          />
          <Text
            style={styles.signInLabel}
            category='s1'
            status='control'>
            Let's find you a job
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            status='control'
            placeholder='Email'
            accessoryLeft={PersonIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            status='control'
            placeholder='Password'
            accessoryRight={renderPasswordIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          />
          {/*
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance='ghost'
              status='control'
              onPress={onForgotPasswordButtonPress}>
              Forgot your password?
            </Button>
          </View>
          */}
        </View>
        <Button
          style={styles.signInButton}
          status='control'
          size='giant'
          onPress={onSignInButtonPress}>
          SIGN IN
        </Button>
        <Button
          style={styles.signUpButton}
          appearance='ghost'
          status='control'
          onPress={onSignUpButtonPress}>
          Don't have an account? Sign Up
        </Button>

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

