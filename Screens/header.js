import React, {PureComponent} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
class Top extends PureComponent {
  render() {
    let {navigate} = this.props;
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderTopEndRadius: 25,
          // borderBottomStartRadius: 25,
          borderBottomEndRadius: 25,
          height: 55,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigate.navigate('UploadPost');
          }}>
          <Image
            resizeMode="contain"
            source={require('../Images/camera2.png')}
            style={{
              height: 45,
              marginHorizontal: 5,
              width: 40,
            }}></Image>
        </TouchableOpacity>
        <Image
          source={require('../Images/logo.png')}
          resizeMode="contain"
          style={{
            height: 35,
            width: 90,
          }}></Image>
        {/* <Text
          style={{
            fontSize: 38,
            fontFamily: 'vincHand',
          }}>

          Timeline
        </Text> */}
        <TouchableOpacity
          style={{position: 'absolute', right: 0}}
          onPress={() => {
            navigate.openDrawer();
          }}>
          <Image
            source={require('../Images/pause.png')}
            style={{
              height: 50,
              borderRadius: 20,
              marginRight: 3,
              width: 50,
            }}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Top;
