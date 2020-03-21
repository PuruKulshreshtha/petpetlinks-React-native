import React, {Component} from 'react';
import * as storage from '../../Utils/AsyncStorage';
import {get} from 'lodash';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';

class CustomDrawer extends Component {
  constructor(props) {
    super(props);
    this.data = [
      {name: 'Home', component: 'Timeline'},
      {name: 'Upload Post', component: 'UploadPost'},
      {name: 'Upload Category', component: 'UploadCategory'},
      {name: 'Logout', component: 'Logout'},
    ];
  }

  async componentDidMount() {
    let Id = await storage.get('Id');
    let Name = await storage.get('Name');
    let Email = await storage.get('email');
    this.setState({Name, Email});

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
            style={style.drawerImage}></Image>
          <Text
            style={{
              fontSize: 25,
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
              marginBottom: 10,
              color: 'white',
            }}>
            User-name - {get(this.state, 'Name', 'Noname')}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 8,
              marginBottom: 10,
              color: 'white',
            }}>
            Email - {get(this.state, 'Email', 'No Email')}{' '}
          </Text>
          {this.data
            ? this.data.map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={style.drawerTouchable}
                    onPress={() => {
                      // console.log('>', this.data[0].component);
                      {
                        data.name === 'Home'
                          ? this.props.navigation.closeDrawer()
                          : this.props.navigation.navigate(data.component);
                      }
                      this.props.navigation.navigate(data.component);
                    }}>
                    <Text style={style.drawerText}>{data.name}</Text>
                  </TouchableOpacity>
                );
              })
            : void 0}
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  drawerTouchable: {
    marginTop: 5,
    borderWidth: 1,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  drawerText: {
    fontSize: 20,
    color: 'white',
    padding: 10,
    marginRight: 5,
  },
  drawerImage: {
    marginTop: 5,
    height: 130,
    borderRadius: 130,
    width: 130,
  },
});
export default CustomDrawer;
