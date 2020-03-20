import React, {Component} from 'react';
import * as storage from '../../Utils/AsyncStorage';
import {get} from 'lodash';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Modal,
  Image,
  Linking,
  Dimensions,
  Text,
} from 'react-native';
// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

class CustomDrawer extends Component {
  async componentDidMount() {
    let Id = await storage.get('Id');
    let Name = await storage.get('Name');
    this.setState({Name});

    if (Id === null) {
      this.props.navigation.navigate('Login');
    }
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.9)',
          flex: 1,
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../Images/profile.png')}
            style={{
              marginTop: 5,
              height: 130,
              borderRadius: 130,
              width: 130,
            }}></Image>
          <Text
            style={{
              fontSize: 30,
              // marginTop: 10,
              fontFamily: 'vincHand',
              color: '#ffa21d',
            }}>
            Profile pic
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 18,
              marginTop: 10,
              color: 'white',
              borderBottomWidth: 1,
            }}>
            User-name :- {get(this.state, 'Name', 'Noname')}
          </Text>
        </View>
      </View>
    );
  }
}

export default CustomDrawer;
