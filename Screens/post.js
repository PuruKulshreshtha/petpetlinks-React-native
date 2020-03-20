import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import {config} from '../Utils';
const {SERVER_URL} = config;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
class Post extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    let {requiredDateString, item, navigate, Like, toggleModal} = this.props;
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          margin: 5,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text
            style={{
              margin: 10,
              marginLeft: 15,
              fontSize: 14,
              fontWeight: 'bold',
              width: screenWidth * 0.4,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              margin: 10,
              marginLeft: screenWidth * 0.15,
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            {requiredDateString}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigate.navigate('SinglePost', item._id);
            }}>
            <Image
              source={{
                uri: `${SERVER_URL}/${item.selectedFiles}`,
              }}
              style={{
                height: screenHeight * 0.3,
                borderRadius: 20,
                marginHorizontal: 10,
                width: screenWidth * 0.9,
                resizeMode: 'contain',
              }}></Image>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert('Comming Soon')}>
            <Text>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate.navigate('SinglePost', item._id);
            }}>
            <Text>{item.commentNo} Comment </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Like(item._id)}>
            <Text>{item.like.length} Like</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => toggleModal(item)}>
            <Text style={{width: 40, textAlign: 'center'}}>Info</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#ffa21d',
    marginVertical: 10,
    marginLeft: 10,
    padding: 8,
    borderRadius: 20,
  },
});
export default Post;
