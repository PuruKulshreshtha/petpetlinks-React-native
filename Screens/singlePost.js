import React, {Component} from 'react';
import {callApi, config} from '../Utils';
import {get} from 'lodash';
const {ROUTES, SERVER_URL} = config;

import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  View,
  Text,
  ScrollView,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import * as storage from '../Utils/AsyncStorage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default class Verify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: [1, 2, 3, 4, 5],
      content: [],
      commentArr: [],
      ans: '',
      imageHeight: 250,
      imageWeidth: screenWidth * 0.9,
      modalVisible: false,
      selecteItem: {},
      comment: '',
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
  // DisplayTimeInFormat = time => {
  //   let date = new Date(time);
  //   let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  //   let am_pm = date.getHours() >= 12 ? 'PM' : 'AM';
  //   hours = hours < 10 ? '0' + hours : hours;

  //   let minutes =
  //     date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  //   //let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  //   let outputTime = `${date.getDate()} ${
  //     this.monthMap[date.getMonth()]
  //   },${date.getFullYear()} (${hours}:${minutes} ${am_pm})`;
  //   return outputTime;
  // };
  Render_FlatList_header = (
    content,
    imageHeight,
    imageWidth,
    requiredDateString,
  ) => {
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
            {content[0].title}
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
          <Image
            source={{
              uri: `${SERVER_URL}/${content[0].selectedFiles}`,
            }}
            style={{
              height: imageHeight,
              borderRadius: 20,
              marginHorizontal: 10,
              width: imageWidth,
              resizeMode: 'contain',
            }}></Image>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              alert('OK Shares');
            }}>
            <Text>Share</Text>
          </TouchableOpacity>

          <Text style={styles.button}>{content[0].commentNo} Comment </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => alert('OK Like')}>
            <Text>{content[0].like.length} Like</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.toggleModal(content[0])}>
            <Text style={{width: 40, textAlign: 'center'}}>Info</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.commentText}>Comments :-</Text>
      </View>
    );
  };
  post = () => {
    const id = this.props.navigation.state.params;
    if (id) {
      // console.log('POST', id);
      callApi({method: 'POST', data: {id: id}, url: ROUTES.SINGLE_POST}).then(
        response => {
          // console.log('response=>>>>>>>>>>>', response.data);
          const content = response.data.dataFromDatabase;
          this.setState({content: content});
        },
      );
    } else {
      alert('Some thing went wrong');
    }
  };

  saveComment = async () => {
    //console.log('Hello Save comment');
    let {comment} = this.state;
    if (comment !== '') {
      const postId = this.props.navigation.state.params;
      const userId = await storage.get('Id');
      const data = {
        comment: comment,
        userId: userId,
        postId: postId,
      };
      console.log('dATQ', data);
      callApi({method: 'POST', url: ROUTES.COMMENT_SAVE, data: data}).then(
        response => {
          //console.log('Res.......................', response);

          if (response) {
            this.post();
            this.defaultComment();
          }

          this.setState({comment: ''});
        },
      );
    } else {
      return;
    }
  };
  defaultComment = () => {
    // console.log('Hello Default comment');
    const id = this.props.navigation.state.params;
    callApi({
      method: 'POST',
      data: {id: id},
      url: ROUTES.DEFAULT_COMMENTS,
    }).then(response => {
      //console.log("default comments--",response);
      let commentArr = response.data.dataFromDatabase;
      // console.log('Comment', commentArr);
      this.setState({commentArr: commentArr});
    });
  };
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
  async componentDidMount() {
    let id = await storage.get('Id');
    //console.log('Id', id);
    if (id) {
      this.post();
      this.defaultComment();
    } else {
      this.props.navigation.navigate('Login');
    }
  }
  render() {
    const {content} = this.state;
    if (content.length === 0) {
      return <View></View>;
    }
    const imageHeight =
      content[0].dimensions.height / 6 < this.state.imageHeight
        ? this.state.imageHeight
        : content[0].dimensions.height / 6;

    const imageWidth =
      content[0].dimensions.width / 8 < this.state.imageWeidth
        ? this.state.imageWeidth
        : content[0].dimensions.width / 8;

    // let requiredDateString = this.DisplayTimeInFormat(content[0].time);
    let date = new Date(content[0].time);
    let requiredDateString = `${date.getDate()} ${
      this.monthMap[date.getMonth()]
    },${date.getFullYear()} (${date.getHours()}:${date.getMinutes()})`;

    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: 'black', flex: 1}}>
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

          <View
            style={{
              backgroundColor: 'rgba(151, 155, 161,0.2)',
              flex: 1,
            }}>
            <FlatList
              data={this.state.commentArr}
              ListHeaderComponent={this.Render_FlatList_header(
                content,
                imageHeight,
                imageWidth,
                requiredDateString,
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                let date = new Date(item.time);
                let requiredDateString = `${date.getDate()} ${
                  this.monthMap[date.getMonth()]
                },${date.getFullYear()} `;
                return (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'white',
                      borderRadius: 20,
                      marginTop: 5,

                      marginHorizontal: screenWidth * 0.03,
                    }}>
                    <View
                      style={{
                        marginLeft: 20,

                        height: screenHeight * 0.05,

                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <View style={{width: screenWidth * 0.45}}>
                        <Text>{item.comment}</Text>
                      </View>
                      <Text style={{color: 'rgb(52, 175, 224)'}}>
                        ~ {item.userId.username} ({requiredDateString})
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'rgba(0,0,0,0.8)',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Comment"
            placeholderTextColor="white"
            value={this.state.comment}
            style={{color: 'white', width: screenWidth * 0.9}}
            onChangeText={text => {
              // this.state =
              this.setState(previousState => {
                return {
                  comment: text,
                };
              });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.saveComment();
            }}>
            <Text style={{color: 'white'}}>OK</Text>
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
  commentText: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    padding: 5,
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
    fontSize: 18,

    borderBottomWidth: 2,
    borderBottomColor: '#ffa21d',
    color: 'white',
  },
});
