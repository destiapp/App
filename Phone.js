import React, {Component} from 'react';
import {StyleSheet, Text,Alert, AsyncStorage, TouchableOpacity, TextInput, View} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'AsyncStorage';


type Props = {};
export default class App extends Component<Props> {

  //this are the data variables
  state ={
    phone: '',
    name: ''
  }

  getData = async () => {
  try {
    const value = await AsyncStorage.getItem('userPhone')
    if(value !== null) {
      console.log(value);

    }
  } catch(e) {
    // error reading value
  }
}
  // console.log(value);


  //holds variable as references
  handleChange = key => val =>{
    this.setState({[key]: val})
  }
  submitForm = async() =>{
    if(this.state.phone.length <10 ){
      Alert.alert('Error','Wrong phone number')
    }else if(this.state.name.length < 3){
      Alert.alert('Error','Wrong name')
    }else{
      //save user data
      await AsyncStorage.setItem('userPhone',this.state.phone);

      // try {
      //   await AsyncStorage.setItem('userPhone',this.state.phone);
      // } catch (error) {
      //   console.log(error.message);
      // }

    }
  }

  componentWillMount(){
    AsyncStorage.getItem('userPhone').then(val=>{
        if(val){
          this.setState({phone:val})
          const str = ' '+ this.state.phone;
          Alert.alert('Error', str)

        }
      })
  }




  render() {
    return (
      <View style={styles.container}>

        <TextInput
          placeholder="Phone Number"
          keyboardType="number-pad"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />

        <TextInput
          placeholder="Name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />

        <TouchableOpacity onPress={this.submitForm}>
          <Text style={styles.btnText}> Enter </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.getData}>
          <Text style={styles.btnText}> Enter </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input:{
    padding: 10,
    borderWidth:1,
    borderColor: '#ccc',
    width: '90%',
    marginBottom: 3,
    borderRadius: 9
  },
  btnText: {
    color: 'darkblue',
    fontSize: 30
  }

});
