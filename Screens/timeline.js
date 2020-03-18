import React, {PureComponent} from 'react';
import {callApi, config} from '../Utils';
import {get, findIndex} from 'lodash';
const {ROUTES} = config;
import * as storage from '../Utils/AsyncStorage';

import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  Text,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import Post from './post';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default class Verify extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      contentCopy: [],
      ans: '',
      username: '----',
      modalVisible: false,
      selecteItem: {},
      skipCount: 0,
      limitCount: 2,
      hasMore: true,
    };
    this.monthMap = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'July',
      7: 'Aug',
      8: 'Sept',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec',
    };
    this.count = 0;
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

  loadMore = async () => {
    let postCounts = 0;
    let k = await callApi({url: ROUTES.POST_COUNT, method: 'POST'});
    postCounts = k.data.count;
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>.', postCounts);
    let {skipCount, limitCount} = this.state;

    let name = await storage.get('Name');

    if (skipCount > postCounts) {
      this.setState({hasMore: false});
      return;
    } else {
      let data = {
        skipCount: skipCount,
        limitCount: this.state.limitCount,
      };

      callApi({url: ROUTES.ALL_POST, method: 'POST', data: data}).then(
        response => {
          const content = response.data.dataFromDatabase;

          // console.log('>>>>>>>..count', this.count++);
          // console.log('cpontent', content);
          let contentCopy = [...content];
          let ans = response.data.status;
          this.setState({
            content: this.state.content.concat([...content]),
            ans,
            contentCopy,
            skipCount: skipCount + limitCount,
            username: name,
          });
        },
      );
    }
  };

  Like = async id => {
    // console.log('>>>>>>>>>>>>>>>>', id);
    let dataUpadteToArray = await storage.get('Id');
    callApi({
      url: ROUTES.LIKE,
      method: 'POST',
      data: {id: id, dataUpadteToArray: dataUpadteToArray},
    }).then(response => {
      let updateContent = [...this.state.content],
        activeIndex = findIndex(this.state.content, function(o) {
          return o._id === response.data[0]._id;
        });

      if (activeIndex !== -1) {
        updateContent[activeIndex] = response.data[0];
      }
      this.setState({content: updateContent});
      // console.log('resoonse', response.data);
    });
  };
  async componentDidMount() {
    let Id = await storage.get('Id');

    if (Id === null) {
      this.props.navigation.navigate('Login');
    } else {
      //this.postCount();
      this.loadMore();
    }
  }
  render() {
    // console.log('HEllo');
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        {/* <NavigationEvents
          onWillFocus={payload => {
            this.setState(previousState => {
              return {skipCount: 0};
            });
            this.postCount();
            this.loadMore();
          }}
          // onWillFocus={payload => console.log('will focus', payload)}
          // onDidFocus={payload => console.log('did focus', payload)}
          // onWillBlur={payload => console.log('will blur', payload)}
          // onDidBlur={payload => console.log('did blur', payload)}
        /> */}
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            height: 70,
            margin: 16,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../Images/image.jpeg')}
            style={{
              height: 50,
              borderRadius: 20,
              margin: 10,
              width: 50,
            }}></Image>
          <Text
            style={{
              marginTop: 10,
              fontSize: 38,
              fontFamily: 'vincHand',
            }}>
            {this.state.username}
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 0}}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            <Image
              source={require('../Images/pause.png')}
              style={{
                height: 50,
                borderRadius: 20,
                margin: 10,
                width: 50,
              }}></Image>
          </TouchableOpacity>
        </View>

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
                height: screenHeight * 0.3,
                width: screenWidth * 0.8,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  color: 'white',
                }}>
                Info
              </Text>
              <View>
                <Text style={styles.modelText}>
                  Category :{' '}
                  {get(this.state.selecteItem.categoryId, 'category', '----')}
                </Text>
                <Text style={styles.modelText}>
                  Posted By :{' '}
                  {get(
                    this.state.selecteItem.author,
                    'username',
                    '----',
                  ).toUpperCase()}
                </Text>
                <Text style={styles.modelText}>
                  Email: {get(this.state.selecteItem.author, 'email', '----')}
                </Text>
              </View>
              <TouchableOpacity onPress={() => this.toggleModal()}>
                <Text style={styles.modalbutton}> OK </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {this.state.content && this.state.content.length ? (
          <View style={{flex: 1}}>
            <FlatList
              data={this.state.content}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={
                this.state.hasMore
                  ? this.loadMore
                  : () => console.log('ON end reached')
              }
              onEndReachedThreshold={100}
              renderItem={({item}) => {
                let date = new Date(item.time);
                // console.log('>>>>>>>>>>>>> DATE TIME >>>>>>>>>>>>', item.time);
                const requiredDateString = `${date.getDate()} ${
                  this.monthMap[date.getMonth()]
                },${date.getFullYear()} (${date.getHours()}:${date.getMinutes()})`;
                // let requiredDateString = date.toString();
                // const imageHeight =
                //   item.dimensions.height / 6 < this.state.imageHeight
                //     ? this.state.imageHeight
                //     : item.dimensions.height / 6;

                // const imageWidth =
                //   item.dimensions.width / 8 < this.state.imageWeidth
                //     ? this.state.imageWeidth
                //     : item.dimensions.width / 8;
                // console.log('>>>>>>>>>>>>>||||||', imageWidth);
                // let myUri = `http://192.168.100.175:8088/2020-1-20Colour8.jpg`;

                // Image.getSizeWithHeaders(
                //   'http://192.168.100.175:8088/2020-1-20Colour8.jpg',
                //   {},
                //   (width, height) => {
                //     console.log('HHHH', width, height);
                //     //this.setState({width, height});
                //   },
                //   () => {
                //     console.log('ERRRRR');
                //   },
                // );
                //console.log('Hello rajat ');

                return (
                  <Post
                    requiredDateString={requiredDateString}
                    item={item}
                    navigate={this.props.navigation}
                    Like={this.Like}
                    toggleModal={this.toggleModal}
                  />
                );
              }}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Loading......</Text>
          </View>
        )}
      </View>
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
  modelText: {
    fontSize: 15,
    padding: 5,
    color: 'white',
    marginLeft: screenWidth * 0.04,
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
