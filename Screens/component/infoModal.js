import React, {Component} from 'react';
import {get} from 'lodash';
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  Dimensions,
  StyleSheet,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
class InfoModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {modalVisible, toggleModal, selecteItem} = this.props;
    return (
      <Modal visible={modalVisible} transparent onRequestClose={toggleModal}>
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
                Category : {get(selecteItem.categoryId, 'category', '----')}
              </Text>
              <Text style={styles.modelText}>
                Posted By :{' '}
                {get(selecteItem.author, 'username', '----').toUpperCase()}
              </Text>
              <Text style={styles.modelText}>
                Email: {get(selecteItem.author, 'email', '----')}
              </Text>
            </View>
            <TouchableOpacity onPress={() => toggleModal()}>
              <Text style={styles.modalbutton}> OK </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
});
export default InfoModal;
