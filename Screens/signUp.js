import React, {Component} from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  Text,
} from 'react-native';
import * as storage from '../Utils/AsyncStorage';
import CheckBox from '@react-native-community/checkbox';
import emailCheck from '../Utils/validation';
import callApi from '../Utils/api';
import config from '../Utils/config';
const {ROUTES} = config;
// import App from './App';
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.userNameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();

    this.state = {
      userName: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      error: {},
      checked: false,
    };
  }

  routingFunction = () => {
    this.props.navigation.navigate('Login');
  };
  signUp = () => {
    let {email, password, userName, firstName, lastName, checked} = this.state;
    //console.log('this state ', this.state);

    if (userName === '') {
      this.setState({error: {userName: 'This field is Required'}});
      this.userNameRef.current.focus();
    } else {
      if (firstName === '') {
        this.setState({error: {firstName: 'This field is Required'}});
        this.firstNameRef.current.focus();
      } else {
        if (lastName === '') {
          this.setState({error: {lastName: 'This field is Required'}});
          this.lastNameRef.current.focus();
        } else {
          if (!emailCheck.email(email)) {
            this.setState({error: {email: 'Invalid email'}});
            this.emailRef.current.focus();
          } else {
            if (password === '') {
              this.setState({error: {password: 'This field is Required'}});
              this.passwordRef.current.focus();
            } else {
              if (checked === false) {
                //this.setState({error: 'Please accept Terms and Condition'});
                this.setState({
                  error: {checkbox: 'Please accept Terms and Condition'},
                });
              } else {
                const data1 = {
                  username: userName,
                  password: password,
                  email: email,
                  firstName: firstName,
                  lastName: lastName,
                  termsCondition: checked,
                };
                //console.log('data', data1);
                callApi({
                  method: 'POST',
                  data: data1,
                  url: ROUTES.SIGN_UP,
                }).then(response => {
                  //console.log('-----------', response);
                  let status = response.data.status;
                  this.setState({status});
                  alert(status);
                  //alert("Status "+this.state.status);
                  // if(this.state.status==='User Created Successful')
                  // {
                  //   window.setTimeout(this.routingFunction(),5000);
                  // }
                });
                //alert('signup sucess');
              }
            }
          }
        }

        //   this.setState({email: '', password: '', userName: ''});
      }
    }
  };
  async componentDidMount() {
    let Id = await storage.get('Id');
    if (Id !== null) {
      this.props.navigation.navigate('Timeline');
    }
  }
  render() {
    this.state.status ===
    'User Created Successful Verification Link sent on your Email'
      ? setTimeout(
          function() {
            this.routingFunction();
          }.bind(this),
          2000,
        )
      : void 0;

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
              marginTop: -10,
              fontFamily: 'vincHand',
              color: '#ffa21d',
            }}>
            Create An Account
          </Text>

          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255,0.1)',
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 30,
            }}>
            <TextInput
              ref={this.userNameRef}
              style={styles.input}
              autoFocus={true}
              placeholder="Enter your username"
              placeholderTextColor="white"
              value={this.state.userName}
              onChangeText={text => {
                // this.state =
                this.setState(previousState => {
                  return {
                    userName: text,
                    error: {userName: ''},
                  };
                });
              }}
            />
            {this.state.error.userName ? (
              <Text style={{marginLeft: 20, color: 'red'}}>
                {this.state.error.userName}
              </Text>
            ) : null}
            <TextInput
              style={styles.input}
              ref={this.firstNameRef}
              placeholder="Enter your first name"
              placeholderTextColor="white"
              value={this.state.firstName}
              onChangeText={text => {
                // this.state =
                this.setState(previousState => {
                  return {
                    firstName: text,
                    error: {firstName: ''},
                  };
                });
              }}
            />
            {this.state.error.firstName ? (
              <Text style={{marginLeft: 20, color: 'red'}}>
                {this.state.error.firstName}
              </Text>
            ) : null}
            <TextInput
              style={styles.input}
              ref={this.lastNameRef}
              placeholder="Enter your last name"
              placeholderTextColor="white"
              value={this.state.lastName}
              onChangeText={text => {
                // this.state =
                this.setState(previousState => {
                  return {
                    lastName: text,
                    error: {lastName: ''},
                  };
                });
              }}
            />
            {this.state.error.lastName ? (
              <Text style={{marginLeft: 20, color: 'red'}}>
                {this.state.error.lastName}
              </Text>
            ) : null}
            <TextInput
              ref={this.emailRef}
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
                    error: {email: ''},
                  };
                });
              }}
            />
            {this.state.error.email ? (
              <Text style={{marginLeft: 20, color: 'red'}}>
                {this.state.error.email}
              </Text>
            ) : null}
            <TextInput
              ref={this.passwordRef}
              style={styles.input}
              value={this.state.password}
              keyboardType="default"
              placeholder="Enter your password"
              placeholderTextColor="white"
              secureTextEntry={true}
              onChangeText={text => {
                this.setState(() => {
                  return {
                    password: text,
                    error: {password: ''},
                  };
                });
              }}
            />
            {this.state.error.password ? (
              <Text style={{marginLeft: 20, color: 'red'}}>
                {this.state.error.password}
              </Text>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                margin: 20,
              }}>
              <CheckBox
                value={this.state.checked}
                onValueChange={() =>
                  this.setState({
                    checked: !this.state.checked,
                    error: {checkbox: ''},
                  })
                }
              />
              <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}>
                I agree to Term & Conditions
              </Text>
            </View>
            {this.state.error.checkbox ? (
              <Text style={{marginLeft: 20, color: 'red'}}>
                {this.state.error.checkbox}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signUp()}>
              <Text> Sign Up </Text>
            </TouchableOpacity>
          </View>
          <Text style={{color: '#ffa21d', marginTop: 5, textAlign: 'center'}}>
            I already have an account.
          </Text>
          <Text
            onPress={() => this.props.navigation.navigate('Login')}
            style={{color: '#ffa21d', margin: 0, textAlign: 'center'}}>
            Login My Account !
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
    margin: 20,
    borderRadius: 20,
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
