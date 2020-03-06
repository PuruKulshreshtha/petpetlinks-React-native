import React, {Component} from 'react';
import {callApi, config} from '../Utils';
import {get, findIndex} from 'lodash';
const {ROUTES, SERVER_URL} = config;
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
import {NavigationEvents} from 'react-navigation';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default class Verify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: [1, 2, 3, 4, 5],
      content: [],
      contentCopy: [],
      ans: '',
      username: '----',
      postCounts: 9,
      imageHeight: 250,
      imageWeidth: screenWidth * 0.9,
      modalVisible: false,
      selecteItem: {},
      skipCount: 0,
      limitCount: 2,
      hasMore: true,
      initialLoaded: false,
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
  postCount = () => {
    //console.log('Hello');
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> pOst count ');
    callApi({url: ROUTES.POST_COUNT, method: 'POST'}).then(response => {
      //console.log('resp', response.data.count);
      const count = response.data.count;
      this.setState({postCounts: count});
    });
  };
  loadMore = async () => {
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>Load more ');
    let postCounts = 0;
    let k = await callApi({url: ROUTES.POST_COUNT, method: 'POST'});
    // .then(response => {
    //   console.log('resp', response.data.count);
    //   postCounts = response.data.count;
    //   console.log('Hwy >>>>>>>@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>>.', postCounts);
    // });
    postCounts = k.data.count;
    //console.log('Hwy >>>>>>>>>>>>>>>>>>>>>>>>>>.', postCounts);
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
              onEndReachedThreshold={1}
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
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 20,
                      margin: 10,
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
                          this.props.navigation.navigate(
                            'SinglePost',
                            item._id,
                          );
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
                          this.props.navigation.navigate(
                            'SinglePost',
                            item._id,
                          );
                        }}>
                        <Text>{item.commentNo} Comment </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.Like(item._id)}>
                        <Text>{item.like.length} Like</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.toggleModal(item)}>
                        <Text style={{width: 40, textAlign: 'center'}}>
                          Info
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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

        {/* <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              margin: 20,
              marginTop: 10,
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{margin: 10, fontSize: 18, fontWeight: 'bold'}}>
                TITLE
              </Text>
              <Text
                style={{
                  margin: 10,
                  marginLeft: 200,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Date
              </Text>
            </View>
            <Image
              source={require('../Images/City6.jpg')}
              style={{
                height: 350,
                borderRadius: 20,
                margin: 10,
                width: 300,
              }}></Image>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.verify()}>
                <Text>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.verify()}>
                <Text>4 Comment </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.verify()}>
                <Text>0 Like</Text>
              </TouchableOpacity>
            </View>
          </View> */}
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
