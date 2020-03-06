import React, {Component} from 'react';
import {emailCheck, callApi, config} from '../Utils';
// import App from './App';
const {ROUTES} = config;
import AsyncStorage from '@react-native-community/async-storage';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Text,
} from 'react-native';

// import App from './App';
export default class LOGIN extends Component {
  constructor(props) {
    super(props);

    this.emailRef = React.createRef();

    this.state = {
      email: '',

      error: {},
    };
  }
  createAccount = () => {
    this.props.navigation.navigate('SignUp');
    //alert('Create  account ok');
  };

  login = () => {
    this.props.navigation.navigate('Login');
  };
  forget = () => {
    let {email} = this.state;

    if (!emailCheck.email(email)) {
      this.setState({error: {email: 'Invalid Email'}});
      this.emailRef.current.focus();
    } else {
      //alert('forget Sucess');
      callApi({
        method: 'POST',
        url: ROUTES.FORGET_PASSWORD,
        data: this.state,
      }).then(response => {
        console.log('RESPONSE ------------------- ', response.data.status);
        status = response.data.status;
        alert(status);
        this.setState({status});
      });
    }
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../Images/image.jpeg')}
          style={{width: '100%', height: '100%'}}>
          <Text
            style={{
              fontSize: 60,
              textAlign: 'center',
              marginTop: 10,
              fontFamily: 'vincHand',
              color: '#ffa21d',
            }}>
            WELCOME TO PPL
          </Text>
          <Text
            style={{
              fontSize: 40,
              textAlign: 'center',
              marginTop: 10,
              fontFamily: 'vincHand',
              color: '#ffa21d',
            }}>
            Forgot password
          </Text>

          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255,0.1)',
              marginTop: 250,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 30,
            }}>
            <TextInput
              ref={this.emailRef}
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'Email invalid']}
              style={styles.input}
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor="white"
              value={this.state.email}
              onChangeText={text => {
                // this.state =
                this.setState(previousState => {
                  return {
                    email: text,
                    error: '',
                  };
                });
              }}
            />
            {this.state.error.email ? (
              <Text style={{marginLeft: 20, color: 'red'}}>
                {this.state.error.email}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.forget()}>
              <Text> Forgot Password </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{color: '#ffa21d', marginTop: 5, textAlign: 'center'}}
            onPress={this.login}>
            Login Account
          </Text>
          <Text
            onPress={this.createAccount}
            style={{color: '#ffa21d', marginTop: 8, textAlign: 'center'}}>
            Create My Account Now !
          </Text>
        </ImageBackground>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#ffa21d',
    padding: 10,
    borderRadius: 20,
    margin: 20,
  },
  input: {
    marginTop: 8,
    marginHorizontal: 20,

    fontSize: 18,

    borderBottomWidth: 2,
    borderBottomColor: '#ffa21d',
    color: 'white',
  },
});
