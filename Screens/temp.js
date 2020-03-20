// datatattata[
//   ({
//     __v: 0,
//     _id: '5e26978a25b0e91956869ae8',
//     author: {
//       Date: '2020-01-13T06:18:33.950Z',
//       __v: 0,
//       _id: '5e1c0bb9c32be1296d8bb98d',
//       createdOn: '2020-01-29T07:16:21.617Z',
//       email: 'purukuls@gmail.com',
//       first_name: 'puru',
//       last_name: 'kulshreshtha',
//       password: '12',
//       terms_condition: false,
//       username: 'puru',
//       verified: true,
//     },
//     categoryId: {__v: 0, _id: '5e1c4783f947e5492b4997a3', category: 'NATURE'},
//     commentNo: 0,
//     dimensions: {height: 1600, width: 2560},
//     featured: true,
//     imageHeight: 250,
//     imageWidth: 200,
//     like: [],
//     selectedFiles: '2020-1-21Mountains11.jpg',
//     time: '2020-01-21T06:17:46.660Z',
//     title: 'hello',
//   },
//   {
//     __v: 0,
//     _id: '5e2692aa25b0e91956869ae6',
//     author: {
//       Date: '2020-01-13T06:18:33.950Z',
//       __v: 0,
//       _id: '5e1c0bb9c32be1296d8bb98d',
//       createdOn: '2020-01-29T07:16:21.617Z',
//       email: 'purukuls@gmail.com',
//       first_name: 'puru',
//       last_name: 'kulshreshtha',
//       password: '12',
//       terms_condition: false,
//       username: 'puru',
//       verified: true,
//     },
//     categoryId: {__v: 0, _id: '5e268ca8e650f0144b0fca20', category: 'SAND'},
//     commentNo: 1,
//     dimensions: {height: 1200, width: 1920},
//     featured: true,
//     imageHeight: 250,
//     imageWidth: 200,
//     like: ['5e1c0bb9c32be1296d8bb98d'],
//     selectedFiles: '2020-1-21Mountains4.jpg',
//     time: '2020-01-21T05:56:58.473Z',
//     title: 'Nice',
//   },
//   {
//     __v: 0,
//     _id: '5e268d06e650f0144b0fca21',
//     author: {
//       __v: 0,
//       _id: '5e1c184e832348359679cd87',
//       createdOn: '2020-01-13T07:12:14.446Z',
//       email: 'rraghav127@gmail.com',
//       firstName: '',
//       lastName: '',
//       password: 'r',
//       terms_condition: false,
//       username: 'Rajat',
//       verified: true,
//     },
//     categoryId: {__v: 0, _id: '5e268c367f6af01419c91582', category: 'WILD'},
//     commentNo: 1,
//     dimensions: {height: 1200, width: 1920},
//     featured: true,
//     imageHeight: 250,
//     imageWidth: 200,
//     like: [],
//     selectedFiles: '2020-1-21Water10.jpg',
//     time: '2020-01-21T05:32:54.545Z',
//     title: 'Water ',
//   },
//   {
//     __v: 0,
//     _id: '5e259bdaa7d5c53a4d0afeeb',
//     author: {
//       __v: 0,
//       _id: '5e1c184e832348359679cd87',
//       createdOn: '2020-01-13T07:12:14.446Z',
//       email: 'rraghav127@gmail.com',
//       firstName: '',
//       lastName: '',
//       password: 'r',
//       terms_condition: false,
//       username: 'Rajat',
//       verified: true,
//     },
//     categoryId: {__v: 0, _id: '5e1c4783f947e5492b4997a3', category: 'NATURE'},
//     commentNo: 1,
//     dimensions: {height: 1080, width: 1920},
//     featured: true,
//     imageHeight: 250,
//     imageWidth: 200,
//     like: [],
//     selectedFiles: '2020-1-20LandWater2.png',
//     time: '2020-01-20T12:23:54.259Z',
//     title: 'hello',
//   },
//   {
//     __v: 0,
//     _id: '5e259bcea7d5c53a4d0afeea',
//     author: {
//       __v: 0,
//       _id: '5e1c184e832348359679cd87',
//       createdOn: '2020-01-13T07:12:14.446Z',
//       email: 'rraghav127@gmail.com',
//       firstName: '',
//       lastName: '',
//       password: 'r',
//       terms_condition: false,
//       username: 'Rajat',
//       verified: true,
//     },
//     categoryId: {__v: 0, _id: '5e1c122cfbdb1529c89f2137', category: 'TIGER'},
//     commentNo: 0,
//     dimensions: {height: 960, width: 1200},
//     featured: false,
//     imageHeight: 250,
//     imageWidth: 200,
//     like: [],
//     selectedFiles: '2020-1-20Colour8.jpg',
//     time: '2020-01-20T12:23:42.408Z',
//     title: 'hello qwertyuiop',
//   })
// ];
//

// class MyHomeScreen extends React.Component {
//   static navigationOptions = {
//     drawerLabel: 'Home',
//     drawerIcon: ({tintColor}) => (
//       <Image
//         source={require('./chats-icon.png')}
//         style={[styles.icon, {tintColor: tintColor}]}
//       />
//     ),
//   };

//   render() {
//     return (
//       <Button
//         onPress={() => this.props.navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     );
//   }
// }

// class MyNotificationsScreen extends React.Component {
//   static navigationOptions = {
//     drawerLabel: 'Notifications',
//     drawerIcon: ({tintColor}) => (
//       <Image
//         source={require('./notif-icon.png')}
//         style={[styles.icon, {tintColor: tintColor}]}
//       />
//     ),
//   };

//   render() {
//     return (
//       <Button
//         onPress={() => this.props.navigation.goBack()}
//         title="Go back home"
//       />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   icon: {
//     width: 24,
//     height: 24,
//   },
// });

// const MyDrawerNavigator = createDrawerNavigator({
//   Home: {
//     screen: MyHomeScreen,
//   },
//   Notifications: {
//     screen: MyNotificationsScreen,
//   },
// });

//const MyApp = createAppContainer(MyDrawerNavigator);

// import React, {Component} from 'react';
// import {Slider} from 'react-native-elements';
// import {View, Text, StyleSheet} from 'react-native';
// class Temp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: 10000,
//       distance: 100,
//     };
//   }
//   render() {
//     return (
//       <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
//         <Slider
//           value={this.state.distance}
//           onValueChange={val => this.setState({distance: val})}
//           trackStyle={customStyles5.track}
//           //thumbStyle={customStyles5.thumb}
//           minimumTrackTintColor="#ec4c46"
//         />
//         <Slider
//           trackStyle={customStyles6.track}
//           thumbStyle={customStyles6.thumb}
//           minimumTrackTintColor="#e6a954"
//         />
//         <Slider
//           trackStyle={customStyles7.track}
//           thumbStyle={customStyles7.thumb}
//           minimumTrackTintColor="#2f2f2f"
//         />
//         <Slider
//           style={customStyles8.container}
//           trackStyle={customStyles8.track}
//           thumbStyle={customStyles8.thumb}
//           minimumTrackTintColor="#31a4db"
//           thumbTouchSize={{width: 50, height: 40}}
//         />
//         <Slider
//           maximumValue={1000}
//           minimumValue={0}
//           minimumTrackTintColor="#307ecc"
//           maximumTrackTintColor="#000000"
//           step={1}
//           value={this.state.value}
//           onValueChange={value => this.setState({value})}
//         />
//         <Slider
//           trackStyle={customStyles2.track}
//           thumbStyle={customStyles2.thumb}
//           minimumTrackTintColor="#30a935"
//         />
//         <Slider
//           trackStyle={customStyles3.track}
//           thumbStyle={customStyles3.thumb}
//           minimumTrackTintColor="#eecba8"
//         />
//         <Slider
//           trackStyle={customStyles4.track}
//           thumbStyle={customStyles4.thumb}
//           minimumTrackTintColor="#d14ba6"
//         />
//         <Slider
//           minimumValue={-10}
//           maximumValue={42}
//           minimumTrackTintColor="#1fb28a"
//           maximumTrackTintColor="#d3d3d3"
//           thumbTintColor="#1a9274"
//         />

//         <Text>Value: {this.state.value ? this.state.value : '--'}</Text>
//       </View>
//     );
//   }
// }
// var styles = StyleSheet.create({
//   container: {
//     margin: 20,
//     paddingBottom: 20,
//     paddingTop: 20,
//     justifyContent: 'flex-start',
//     alignItems: 'stretch',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   caption: {
//     //flex: 1,
//   },
//   value: {
//     flex: 1,
//     textAlign: 'right',
//     marginLeft: 10,
//   },
// });

// var iosStyles = StyleSheet.create({
//   track: {
//     height: 2,
//     borderRadius: 1,
//   },
//   thumb: {
//     width: 30,
//     height: 30,
//     borderRadius: 30 / 2,
//     backgroundColor: 'white',
//     shadowColor: 'black',
//     shadowOffset: {width: 0, height: 2},
//     shadowRadius: 2,
//     shadowOpacity: 0.35,
//   },
// });

// var customStyles2 = StyleSheet.create({
//   track: {
//     height: 4,
//     borderRadius: 2,
//   },
//   thumb: {
//     width: 30,
//     height: 30,
//     borderRadius: 30 / 2,
//     backgroundColor: 'white',
//     borderColor: '#30a935',
//     borderWidth: 2,
//   },
// });

// var customStyles3 = StyleSheet.create({
//   track: {
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#d0d0d0',
//   },
//   thumb: {
//     width: 10,
//     height: 30,
//     borderRadius: 5,
//     backgroundColor: '#eb6e1b',
//   },
// });

// var customStyles4 = StyleSheet.create({
//   track: {
//     height: 10,
//     borderRadius: 4,
//     backgroundColor: 'white',
//     shadowColor: 'black',
//     shadowOffset: {width: 0, height: 1},
//     shadowRadius: 1,
//     shadowOpacity: 0.15,
//   },
//   thumb: {
//     width: 20,
//     height: 20,
//     backgroundColor: '#f8a1d6',
//     borderColor: '#a4126e',
//     borderWidth: 5,
//     borderRadius: 10,
//     shadowColor: 'black',
//     shadowOffset: {width: 0, height: 2},
//     shadowRadius: 2,
//     shadowOpacity: 0.35,
//   },
// });

// var customStyles5 = StyleSheet.create({
//   track: {
//     height: 18,
//     borderRadius: 1,
//     backgroundColor: '#d5d8e8',
//   },
//   thumb: {
//     width: 20,
//     height: 30,
//     borderRadius: 1,
//     backgroundColor: '#838486',
//   },
// });

// var customStyles6 = StyleSheet.create({
//   track: {
//     height: 14,
//     borderRadius: 2,
//     backgroundColor: 'white',
//     borderColor: '#9a9a9a',
//     borderWidth: 1,
//   },
//   thumb: {
//     width: 20,
//     height: 20,
//     borderRadius: 2,
//     backgroundColor: '#eaeaea',
//     borderColor: '#9a9a9a',
//     borderWidth: 1,
//   },
// });

// var customStyles7 = StyleSheet.create({
//   track: {
//     height: 1,
//     backgroundColor: '#303030',
//   },
//   thumb: {
//     width: 30,
//     height: 30,
//     backgroundColor: 'rgba(150, 150, 150, 0.3)',
//     borderColor: 'rgba(150, 150, 150, 0.6)',
//     borderWidth: 14,
//     borderRadius: 15,
//   },
// });

// var customStyles8 = StyleSheet.create({
//   container: {
//     height: 30,
//   },
//   track: {
//     height: 2,
//     backgroundColor: '#303030',
//   },
//   thumb: {
//     width: 10,
//     height: 10,
//     backgroundColor: '#31a4db',
//     borderRadius: 10 / 2,
//     shadowColor: '#31a4db',
//     shadowOffset: {width: 0, height: 0},
//     shadowRadius: 2,
//     shadowOpacity: 1,
//   },
// });

// export default Temp;

//----------------------------------------------- timeline js
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

//-----------------------------ghghghhg
{
  /* <NavigationEvents
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
        /> */
}

//----------------------------

Comment[
  {
    __v: 0,
    _id: '5e25a1cba7d5c53a4d0afeec',
    comment: 'pppp',
    postId: '5e259bdaa7d5c53a4d0afeeb',
    time: '2020-01-20T12:49:15.644Z',
    userId: {
      __v: 0,
      _id: '5e1c184e832348359679cd87',
      createdOn: '2020-01-13T07:12:14.446Z',
      email: 'rraghav127@gmail.com',
      firstName: '',
      lastName: '',
      password: 'r',
      terms_condition: false,
      username: 'Rajat',
      verified: true,
    },
  }
];
// /dsfgkmhkglnj>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
//import { Constants } from 'expo';
import Slider from '@react-native-community/slider';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 30,
      minDistance: 5,
      maxDistance: 100,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Slider
          style={{width: 300}}
          step={1}
          minimumValue={this.state.minDistance}
          maximumValue={this.state.maxDistance}
          value={this.state.distance}
          onValueChange={val => {
            //console.log('VALUE', val);
            this.setState({distance: val});
          }}
          // thumbTintColor="rgb(252, 228, 149)"
          maximumTrackTintColor="#d3d3d3"
          minimumTrackTintColor="rgb(252, 228, 149)"
        />
        <View style={styles.textCon}>
          <Text style={styles.colorGrey}>{this.state.distance} km</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  textCon: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorGrey: {
    color: '#d3d3d3',
  },
  colorYellow: {
    color: 'rgb(252, 228, 149)',
  },
});
