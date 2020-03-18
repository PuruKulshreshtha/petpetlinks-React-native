import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import * as Storage from '../Utils/AsyncStorage';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Modal,
  Linking,
  Dimensions,
  Text,
} from 'react-native';
import {emailCheck, callApi, config} from '../Utils';
// import App from './App';
const {ROUTES} = config;
//import AsyncStorage from '@react-native-community/async-storage';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();

    this.state = {
      email: '',
      password: '',
      modalVisible: false,
      error: {},
    };
  }

  async componentDidMount() {
    let a = await Storage.get('Id');
    if (a) {
      this.props.navigation.navigate('Timeline');
    }

    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if (url) {
          this.navigate(url);
        }
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
    SplashScreen.hide();
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  //--- for IOS
  handleOpenURL = event => {
    this.navigate(event.url);
  };
  navigate = url => {
    const {navigate} = this.props.navigation;
    // console.log('URL', url);
    const route = url.replace(/.*?:\/\//g, '');
    //console.log('ROUTES', route);
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    // console.log('ID', id);
    const routeName = route.split('/')[0];
    //console.log('ROUTENAME', routeName);

    if (routeName === 'changePassword') {
      navigate('ChangePassword', {id});
    }
    if (routeName === 'verify') {
      navigate('Verify', {id});
    }
  };

  toggleModal = () => {
    //console.log('HELLL LLJEJHD HXHSHFHVH HSHH');
    this.setState({modalVisible: !this.state.modalVisible});
  };

  login = () => {
    let {email, password} = this.state;
    // console.log('this state ', this.state);
    if (!emailCheck.email(email)) {
      this.setState({error: {email: 'Invalid email'}});
      this.emailRef.current.focus();
    } else {
      if (password === '') {
        this.setState({error: {password: 'This filed is required'}});
        this.passwordRef.current.focus();
      } else {
        //alert('signup sucess');
        //this.setState({modalVisible: true});
        // console.log('Data ', this.state);
        //console.log('LLL', ROUTES.LOGIN);
        callApi({method: 'POST', url: ROUTES.LOGIN, data: this.state}).then(
          async response => {
            //this.setState({modalVisible: true});
            //console.log('reponse in lonin ', response.data);
            const status = response.data.status;
            this.setState({status});
            if (status === 'Login Success') {
              const data = response.data.dataFromDatabase[0];
              // console.log('Hello ', data._id);

              Storage.set('Id', data._id);
              Storage.set('Name', data.username);
              Storage.set('email', data.email);
              //  this.storeData('Name', data.username);
              //  this.storeData('email', data.email);
              this.setState({email: '', password: ''});
              //let a = await Storage.get('Id');
              //console.log('Hello Login ', a);
              // let b = await this.getData('Name');
              // let c = await this.getData('email');
              // console.log(`ABC ${JSON.stringify(a)}   and ${b}  and ${c}`);
              this.props.navigation.navigate('Timeline');
            } else {
              this.setState({modalVisible: true});
            }
          },
        );
      }

      //   this.setState({email: '', password: '', userName: ''});
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
            Login Account
          </Text>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255,0.1)',
              marginTop: 200,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 30,
            }}>
            <Modal
              visible={this.state.modalVisible}
              transparent
              onRequestClose={this.toggleModal}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)',

                  padding: 10,
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    borderRadius: 10,
                    height: screenHeight * 0.2,
                    width: screenWidth * 0.8,
                  }}>
                  <Text
                    style={{
                      marginTop: 20,
                      textAlign: 'center',
                      fontSize: 20,
                      color: 'white',
                    }}>
                    {this.state.status ? <>{this.state.status}</> : '-----'}
                  </Text>
                  <TouchableOpacity onPress={() => this.toggleModal()}>
                    <Text style={styles.modalbutton}> OK </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

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
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.login()}>
              <Text> Login </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{color: '#ffa21d', marginTop: 5, textAlign: 'center'}}
            onPress={() => this.props.navigation.navigate('Forgot')}>
            Forgot Password
          </Text>
          <Text
            onPress={() => this.props.navigation.navigate('SignUp')}
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
    margin: 20,
    borderRadius: 20,
  },
  modalbutton: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#ffa21d',
    padding: 10,

    width: screenWidth * 0.5,
    marginLeft: 60,
    marginTop: screenHeight * 0.08,
    borderRadius: 10,
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
