import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  ActivityIndicator
} from 'react-native';

import { ListItem,List } from 'react-native-elements'


import Swiper from 'react-native-swiper';
import bg from '../images/bgSpaceH.jpg';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import MySearch from '../Components/Search';
import MyMapDesign from '../Components/MapDesign';


const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class SwipeScreen extends Component {
  state ={
    data:[],
    page: 0,
    loading: false,

  };
  componentWillMount(){
    this.fetchData();
  }
  fetchData = async () => {
    this.setState({loading: true});
    const response = await fetch(`https://randomuser.me/api?results=30&seed=hi&page=${this.state.page}`);
    const json = await response.json();
    this.setState(state => ({ data: [...state.data, ... json.results],loading: false}));
  }
  handleEnd = () =>{
    this.setState(state => ({ page: state.page +1}), () => this.fetchData());
  }
  render(){
    return (
      // <ImageBackground source={bg} style={styles.container}>

      <Swiper source={bg} style={styles.wrapper}  showsButtons={false} index={1}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Chat</Text>
        </View>
        
        <View style={{width: screenWidth, height: '95%'}}>

        <MyMapDesign />

        </View>
        <View style={{width: screenWidth, height: '100%'}}>
        <View>

        <MySearch />

       </View>
        </View>
      </Swiper>
      //  </ImageBackground>

    );
  }
}
