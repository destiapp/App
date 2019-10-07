/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * 
 * 
 * App.sj -> Mapdesign.js -> JoinUI *
 * -> uses {native-base, ./images/logo.png}

 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert, Image, ScrollView, Button, ActivityIndicator, FlatList, SafeAreaView ,TouchableOpacity} from 'react-native';

// import { Container, Content, Header, Left, Body, Right, Button} from 'native-base';
// import Modal from './Modal';
import { ListItem, List } from 'react-native-elements'

import { Icon, Container, Content, Card, Thumbnail, Body, Header, Left, Right } from 'native-base';


export default class JoinUI extends Component {
    state = {
        data: [],
        page: 0,
        loading: false,

    };

    componentWillMount() {
        this.fetchData();
    }
    fetchData = async () => {
        this.setState({ loading: true });
        const response = await fetch(`https://randomuser.me/api?results=20&seed=hi&page=${this.state.page}`);
        const json = await response.json();
        this.setState(state => ({ data: [...state.data, ...json.results], loading: false }));
    }
    handleEnd = () => {
        this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
    }

    SampleFunction1() {

    }
    render() {
        return (
            <View style={{ backgroundColor: "#fff" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                    <Thumbnail
                        style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                        source={require('../images/logo.png')} />
                    <Text style={{fontWeight: 'bold'}}> Desti2019</Text>
                </View>
                <View style={styles.headerWrapper}>
                </View>
                <Card>
                    <View style={{ height: 100 }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: "#fff"
                        }}>
                            <Text>Invited: 63</Text>
                            <Text>Attending: 33</Text>
                            {/* <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
                    <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} /> */}
                        </View>
                        <View style={{ flex: 3 }}>
                            <FlatList
                                horizontal
                                data={this.state.data}
                                keyExtractor={(x, i) => "id" + i}

                                onEndReached={() => this.handleEnd()}
                                onEndReachedThreshold={0}
                                ListFooterComponent={() => this.state.loading ? null : <ActivityIndicator size="large" animating />}
                                renderItem={({ item }) =>
                                    // <ListItem
                                    //     pad={0}
                                    //     roundAvatar
                                    //     keyExtractor={(x, i) => i}
                                    //     leftAvatar={{ source: { uri: item.picture.thumbnail } }}
                                    // />
                                    <Thumbnail
                                        // keyExtractor={(x, i) => i}
                                        style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
                                        source={{ uri: item.picture.thumbnail }} />
                                }
                            />
                        </View>
                    </View>
                </Card>
                {/* <Button title='View Party!' onPress={this.SampleFunction1.bind(this)} /> */}
                
            </View>
            // <Container style={styles.container}>
            //     <Content>
            //         <View style={{ hegiht: 100 }}>
            //             <View
            //                 style={{
            //                     flex: 1,
            //                     flexDirection: 'row', justifyContent: 'space-between',
            //                     alignItems: 'center', paddingHorizontal: 7
            //                 }}>
            //                 <Text style={{ fontWeight: 'bold' }}> Stories</Text>
            //                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            //                     <Icon name='play' style={{ fontSize: 14 }}></Icon>
            //                     <Text> Watch All</Text>
            //                 </View>
            //             </View>
            //             <View style={{ flex: 3 }}>
            //                 <ScrollView
            //                     horizontal={true}
            //                     componentWillMount={this.componentWillMount}
            //                     showsHorizontalScrollIndicator={false}
            //                     contentContainerStyle={{
            //                         alignItems: 'center',
            //                         paddingStart: 5,
            //                         paddingEnd: 5
            //                     }}

            //                 >
            //                     <Thumbnail
            //                         style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
            //                         ssource={{ uri: item.picture.thumbnail }} />
            //                     {/* <Thumbnail
            //                         style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
            //                         source={require('../../assets/Tony.png')} />
            //                     <Thumbnail
            //                         style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
            //                         source={require('../../assets/Tony.png')} />
            //                     <Thumbnail
            //                         style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2 }}
            //                         source={require('../../assets/Tony.png')} /> */}
            //                 </ScrollView>

            //             </View>


            //         </View>

            //     </Content>


            // </Container>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    headerWrapper: {
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        marginBottom: 12,
    },
    header: {
        fontSize: 36,
        alignSelf: 'auto',
        color: 'red',

    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
      },
});
