import React, {Component} from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
  Text,
} from 'react-native';

// import App from './App';
export default class LOGIN extends Component {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.state = {
      email: '',
      password: '',
    };
  }
  login = () => {
    let {email, password} = this.state;
    if (email === '') {
      this.emailRef.current.focus();
    } else {
      if (password === '') {
        this.passwordRef.current.focus();
      } else {
        alert('login Sucess email and password is ' + email + ' ' + password);
        this.setState({email: '', password: ''});
      }
    }
  };
  render() {
    return (
      <View>
        <ImageBackground
          source={require('./Images/image2.jpeg')}
          style={{width: '100%', height: '100%'}}>
          <Text
            style={{
              fontSize: 60,
              textAlign: 'center',
              marginTop: 20,
              fontFamily: 'vincHand',

              color: '#ffa21d',
            }}>
            WELCOME TO PPL
          </Text>
          <TextInput
            ref={this.emailRef}
            style={{
              height: 40,
              marginTop: 250,
              marginLeft: 20,
              marginRight: 20,
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
              backgroundColor: 'rgb(240, 237, 230)',
            }}
            keyboardType="email-address"
            placeholder="Enter your email"
            placeholderTextColor="red"
            value={this.state.email}
            onChangeText={text => {
              // this.state =
              this.setState(previousState => {
                return {
                  email: text,
                };
              });
            }}
          />
          <TextInput
            ref={this.passwordRef}
            style={{
              height: 40,
              margin: 20,
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
              backgroundColor: 'rgb(240, 237, 230)',
            }}
            value={this.state.password}
            keyboardType="default"
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={text => {
              this.setState(() => {
                return {
                  password: text,
                };
              });
            }}
          />

          <TouchableOpacity style={styles.button} onPress={() => this.login()}>
            <Text> LOGIN </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#ffa21d',
    padding: 10,
    margin: 20,
  },
});
