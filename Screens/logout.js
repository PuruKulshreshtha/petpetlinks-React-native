import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import * as storage from '../Utils/AsyncStorage';
const Logout = props => {
  console.log('Hello ');
  const remove_all = async () => {
    //console.log('HOOOOO');
    let Id = await storage.remove('Id');
    let Name = await storage.remove('Name');
    let email = await storage.remove('email');
    // console.log('AAAAA', a, b, c);
    //let a = await storage.get('Id');
    // console.log('ID in logout', Id, Name, email);
    if (Id === null && Name === null && email === null) {
      props.navigation.navigate('InitialStack');
    } else {
      props.navigation.navigate('InitialStack');
      console.log('Someting Went Wrong', email);
    }
  };

  useEffect(() => {
    remove_all();
    //console.log('HEy');
  }, []);

  return <View></View>;
};

export default Logout;
