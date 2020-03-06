import React, {Component} from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Text,
} from 'react-native';
import {callApi, config} from '../Utils';
const {ROUTES} = config;
// import App from './App';
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.newPasswordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();

    this.state = {
      newPassword: '',
      confirmPassword: '',
      error: {},
    };
  }

  changePassword = () => {
    let {newPassword, confirmPassword} = this.state;

    if (newPassword === '') {
      this.setState({error: {newPassword: 'This field is required'}});
      this.newPasswordRef.current.focus();
    } else {
      if (confirmPassword === '') {
        this.setState({error: {confirmPassword: 'This field is required'}});
        this.confirmPasswordRef.current.focus();
      } else {
        if (newPassword !== confirmPassword) {
          this.setState({error: {confirmPassword: 'Password  Not Match'}});
        } else {
          this.setState({error: ''});
          const {id} = this.props.navigation.state.params;
          let data = {
            userId: id,
            newpassword: this.state.newPassword,
            confirmpassword: this.state.confirmPassword,
          };
          callApi({
            method: 'POST',
            url: ROUTES.CHANGE_PASSWORD,
            data: data,
          }).then(responce => {
            console.log('Hello ', responce.data);
            if (responce.data.status === 'Password Reterived') {
              this.props.navigation.navigate('Login');
            } else {
              alert(responce.data.status);
            }
          });
        }
      }

      //   this.setState({newPassword: '', password: '', userName: ''});
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
            Change Password
          </Text>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255,0.1)',
              marginTop: 200,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 30,
            }}>
            <TextInput
              ref={this.newPasswordRef}
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="white"
              value={this.state.newPassword}
              secureTextEntry={true}
              onChangeText={text => {
                // this.state =
                this.setState(previousState => {
                  return {
                    newPassword: text,
                    error: {newPassword: ''},
                  };
                });
              }}
            />
            {this.state.error.newPassword ? (
              <Text style={{marginLeft: 20, color: 'red'}}>
                {this.state.error.newPassword}
              </Text>
            ) : null}
            <TextInput
              ref={this.confirmPasswordRef}
              style={styles.input}
              value={this.state.confirmPassword}
              keyboardType="default"
              placeholder="Confirm password"
              placeholderTextColor="white"
              secureTextEntry={true}
              onChangeText={text => {
                this.setState(() => {
                  return {
                    confirmPassword: text,
                    error: {confirmPassword: ''},
                  };
                });
              }}
            />
            {this.state.error.confirmPassword ? (
              <Text style={{marginLeft: 20, color: 'red'}}>
                {this.state.error.confirmPassword}
              </Text>
            ) : null}

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.changePassword()}>
              <Text>Change</Text>
            </TouchableOpacity>
          </View>
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
