import React, { Component } from 'react';
import { Animated, KeyboardAvoidingView, Alert, Modal, TouchableHighlight, SafeAreaView, Platform, StyleSheet, Button, Text, TextInput, View, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

import Icon from 'react-native-vector-icons/FontAwesome';
import { SocialIcon } from 'react-native-elements';

import bg from '../images/bgSpace.jpg';
import logo from '../images/logo.png';
const WIDTH = Dimensions.get('window').width;
import User from '../User';


const myButton = (
  <Icon.Button name="facebook" onPress={this.loginWithFacebook} solid>
    Login with Facebook
  </Icon.Button>
);

export default class LoginScreen extends Component<Props> {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  constructor() {
    super();
    this.state = { email: '', password: '', error: '', loading: false };
    this.state = {
      showPass: true,
      press: false,
      modalVisible: false
    }
  }
  onLoginPress() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      User.email = this.state.email;
      this.setState({ error: 'Login sucessful', loading: true });

      this.props.navigation.navigate('Swipe')
    })
      .catch(() => {
        this.setState({ error: 'Email/Password incorrect', loading: false });
      });
  }
  showPass = () => {
    if (this.state.press = false) {
      this.setState({ showPass: false, press: true })
    }
    else {
      this.setState({ showPass: true, press: false })
    }
  }
  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1500
    }).start()
  }
  render() {
    const interpolateRotation = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0rad', '11.75rad'],
    })
    const animatedStyle = {
      transform: [
        { rotate: interpolateRotation }
      ]
    }
    return (
      <ImageBackground source={bg} style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <View style={styles.inputContainer}>
            <View style={styles.logoContainer}>
              <Animated.View style={[animatedStyle]}>
                <Image source={logo} style={styles.logo} />
              </Animated.View>
              <Text style={styles.logoText}> Desti</Text>
            </View>
            <View>
              <Icon name={'user'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={'Username'}
                returnKeyType={'next'}
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCorrect={false}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View>
              <Icon name={'lock'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={'Password'}
                returnKeyType={'go'}
                secureTextEntry={this.state.showPass}
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                secureTextEntry
                onChangeText={password => this.setState({ password })}

              // ref = {(input) => this.passwordInput = input}
              />
            </View>
            <TouchableOpacity style={styles.btnEye}
              onPress={this.showPass.bind(this)}>
            </TouchableOpacity>
            <Text style={styles.text} >{this.state.error}</Text>

            <View>
              <TouchableOpacity style={styles.btnLogin}
                onPress={this.onLoginPress.bind(this)}>
                <Text style={styles.text} >Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignSelf: 'center' }}>
            <TouchableOpacity style={styles.btnSignUp}
              // onPress={() => { this.props.navigation.navigate('SignUp') }}>
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text style={styles.text} >Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Modal
              animationType="slide"
              visible={this.state.modalVisible}
            >
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <View>
                  <SocialIcon
                    title='Sign In With Facebook'
                    button
                    type='facebook'
                  />

                  <SocialIcon
                    title='Some Twitter Message'
                    button
                    type='twitter'
                  />

                  <SocialIcon
                    button
                    type='medium'
                  />

                  <SocialIcon
                    button
                    light
                    type='instagram'
                  />
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text style={{ marginTop: 60 }}>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text>Show Modal</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    justifyContent: 'center',
    alignItems: 'center'
  }, footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logoContainer: {
    // marginTop: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '55%',
    marginBottom: 100
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 3,
    opacity: 0.83
  },
  inputContainer: {
    marginBottom: 10
  },
  input: {
    width: WIDTH - 90,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(255,255,255,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37
  },
  btnLogin: {
    width: WIDTH - 100,
    height: 45,
    alignSelf: 'center',
    borderRadius: 36,
    backgroundColor: '#432577',
    justifyContent: 'center',
    marginTop: 32,
    marginHorizontal: 25
  },
  btnSignUp: {
    width: WIDTH - 240,
    height: 45,
    borderRadius: 9,
    backgroundColor: 'black',
    justifyContent: 'center',
    opacity: 0.50
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    textAlign: 'center'
  },
});
