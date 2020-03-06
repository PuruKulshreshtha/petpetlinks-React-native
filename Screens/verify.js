import React, {Component} from 'react';
import {emailCheck, callApi, config} from '../Utils';

const {ROUTES} = config;

import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  View,
  Modal,
  Text,
} from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default class Verify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      error: {},
    };
  }
  toggleModal = item => {
    //console.log('HELLL LLJEJHD HXHSHFHVH HSHH');
    if (!this.state.modalVisible) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        selecteItem: item,
      });
    } else {
      this.setState({
        modalVisible: !this.state.modalVisible,
      });
    }
  };

  verify = () => {
    if (this.props.navigation.state.params) {
      const {id} = this.props.navigation.state.params;
      let data = {
        userId: id,
      };
      callApi({method: 'POST', url: ROUTES.VERIFY, data: data}).then(
        response => {
          console.log('REsponce ', response.data);
          const status = response.data.status;
          if (status === 'verified') {
            this.props.navigation.navigate('Login');
          } else {
            this.setState({modalVisible: true});
          }
        },
      );
    } else {
      this.setState({modalVisible: true});
      //alert('Invalid Link');
    }
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}>
        <Modal
          visible={this.state.modalVisible}
          transparent
          onRequestClose={this.toggleModal}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.3)',
              padding: 10,
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.85)',
                borderRadius: 15,
                height: screenHeight * 0.2,
                width: screenWidth * 0.8,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  marginTop: 10,
                  color: 'white',
                }}>
                Invalid Link
              </Text>
              <View></View>
              <TouchableOpacity onPress={() => this.toggleModal()}>
                <Text style={styles.modalbutton}> OK </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
            Verify Account
          </Text>

          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255,0.1)',
              marginTop: screenHeight * 0.45,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 30,
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.verify()}>
              <Text>Click Here To Verify </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{color: '#ffa21d', marginTop: 18, textAlign: 'center'}}
            onPress={() => this.props.navigation.navigate('Login')}>
            Login Account
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
  modalbutton: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#ffa21d',
    padding: 10,
    marginTop: screenHeight * 0.05,
    width: screenWidth * 0.5,
    marginLeft: 60,
    borderRadius: 10,
  },
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
