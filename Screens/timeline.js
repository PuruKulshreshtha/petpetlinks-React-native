import React, {PureComponent} from 'react';
import {callApi, config} from '../Utils';
import {findIndex} from 'lodash';
const {ROUTES} = config;
import * as storage from '../Utils/AsyncStorage';

import {FlatList, View, Text} from 'react-native';
import Post from './post';
import Top from './header';
import InfoModal from './component/infoModal';

export default class Verify extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      ans: '',
      username: '----',
      modalVisible: false,
      selecteItem: {},
      skipCount: 0,
      limitCount: 2,
      hasMore: true,
    };
    this.isLoading = false;
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
    if (this.isLoading) {
      return;
    }
    let postCounts = 0;
    this.isLoading = true;
    let k = await callApi({url: ROUTES.POST_COUNT, method: 'POST'});
    postCounts = k.data.count;
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>.', postCounts);
    let {skipCount, limitCount} = this.state;

    let name = await storage.get('Name');

    if (skipCount > postCounts) {
      this.isLoading = false;
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

          let ans = response.data.status;
          this.setState({
            content: this.state.content.concat([...content]),
            ans,

            skipCount: skipCount + limitCount,
            username: name,
          });
          this.isLoading = false;
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
    });
  };
  async componentDidMount() {
    let Id = await storage.get('Id');
    if (Id === null) {
      this.props.navigation.navigate('Login');
    } else {
      this.loadMore();
    }
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <InfoModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
          selecteItem={this.state.selecteItem}
        />
        <Top navigate={this.props.navigation} />

        {this.state.content && this.state.content.length ? (
          <FlatList
            data={this.state.content}
            keyExtractor={(item, index) => index.toString()}
            // ListHeaderComponent={<Top navigate={this.props.navigation} />}
            // stickyHeaderIndices={[0]}
            onEndReached={
              this.state.hasMore
                ? this.loadMore
                : () => console.log('ON end reached')
            }
            onEndReachedThreshold={1}
            renderItem={({item}) => {
              let date = new Date(item.time);
              const requiredDateString = `${date.getDate()} ${
                this.monthMap[date.getMonth()]
              },${date.getFullYear()} (${date.getHours()}:${date.getMinutes()})`;
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
            // ListHeaderComponent={<Top navigate={this.props.navigation} />}
          />
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
