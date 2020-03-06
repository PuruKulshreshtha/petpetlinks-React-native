import React, {Component} from 'react';
import {callApi, config} from '../Utils';
const {ROUTES} = config;
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Dimensions,
  Text,
  Modal,
} from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default class UploadCategory extends Component {
  constructor(props) {
    super(props);

    this.categoryNameRef = React.createRef();

    this.state = {
      categoryName: '',
      modalVisible: false,
      c_status: '----',
      error: {},
    };
  }
  toggleModal = () => {
    //console.log('HELLL LLJEJHD HXHSHFHVH HSHH');

    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };
  addCategory = () => {
    let {categoryName} = this.state;

    if (categoryName === '') {
      this.setState({error: {categoryName: 'This field is required'}});
      this.categoryNameRef.current.focus();
    } else {
      //alert('forget Sucess');
      const data = {
        cname: categoryName,
      };

      callApi({method: 'POST', url: ROUTES.CATEGORY_UPLOAD, data: data}).then(
        response => {
          console.log('Data in catergory', response.data);

          let c_status = response.data.status;
          this.setState({c_status: c_status});
          this.toggleModal();
          // let categoryArr = response.data.dataFromDatabase;
          // this.setState({c_status, categoryArr});
          // // console.log("categories----", this.state.categoryArr);
          // this.setState({c_status, categoryArr});
          // this.handleCategory();
          // this.setState({newCategory: ''});
          // alert(c_status);
        },
      );
    }
  };
  render() {
    console.log('Upload Category');
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
                height: screenHeight * 0.25,
                width: screenWidth * 0.8,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  marginTop: 10,
                  color: 'white',
                }}>
                {this.state.c_status}
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
            Add New Category
          </Text>

          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255,0.1)',
              marginTop: 250,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 30,
            }}>
            <TextInput
              ref={this.categoryNameRef}
              style={styles.input}
              placeholder="Enter your category"
              placeholderTextColor="white"
              value={this.state.categoryName}
              onChangeText={text => {
                // this.state =
                this.setState(previousState => {
                  return {
                    categoryName: text,
                    error: '',
                  };
                });
              }}
            />
            {this.state.error.categoryName ? (
              <Text style={{marginLeft: 20, color: 'red'}}>
                {this.state.error.categoryName}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.addCategory()}>
              <Text>Add </Text>
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
    borderRadius: 20,
    margin: 20,
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
  input: {
    marginTop: 8,
    marginHorizontal: 20,

    fontSize: 18,

    borderBottomWidth: 2,
    borderBottomColor: '#ffa21d',
    color: 'white',
  },
});
