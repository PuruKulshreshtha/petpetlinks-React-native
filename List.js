import React, {Component} from 'react';
import L from './Screens/login';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <L />
        <TextInput
          style={{height: 40}}
          placeholder="Email"
          placeholderTextColor="black"
          keyboardType="email-address"
          autoFocus={true}
          onChangeText={text => this.setState({email: text})}
          value={this.state.email}
        />
        <TextInput
          style={{height: 40}}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="black"
          onChangeText={text => this.setState({password: text})}
          value={this.state.password}
        />

        <TouchableOpacity style={styles.button} onPress={() => this.login()}>
          <Text> LoGIN </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  countText: {
    color: '#FF00FF',
  },
});
