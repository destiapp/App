/*
This has a marker that when clicked displays a pop-up hence will 
display a modal when clicked.

App.js -> Mapdesign.js -> JoinUI at line 159

*/

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Container,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import MapView, { Callout, Marker, Permissions } from 'react-native-maps';
import { Card, ListItems, Button } from 'react-native-elements';
import { Thumbnail, Icon } from 'native-base';
import Modal from 'react-native-modal';

import Main from './ListModal';

import JoinUI from './JoinUI';
const apikey = 'https://maps.googleapis.com/maps/api/staticmap?key=YOUR_API_KEY&center=47.65,-122.35000000000002&zoom=12&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x1d2c4d&style=element:labels.text.fill%7Ccolor:0x8ec3b9&style=element:labels.text.stroke%7Ccolor:0x1a3646&style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64779e&style=feature:administrative.province%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:landscape.man_made%7Celement:geometry.stroke%7Ccolor:0x334e87&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0x023e58&style=feature:poi%7Celement:geometry%7Ccolor:0x283d6a&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x6f9ba5&style=feature:poi%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x023e58&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x3C7680&style=feature:road%7Celement:geometry%7Ccolor:0x304a7d&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:road.highway%7Celement:geometry%7Ccolor:0x2c6675&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x255763&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xb0d5ce&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0x023e58&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:transit%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x283d6a&style=feature:transit.station%7Celement:geometry%7Ccolor:0x3a4762&style=feature:water%7Celement:geometry%7Ccolor:0x0e1626&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70&size=480x360';
const CARD_HEIGHT = 800 / 4;
const CARD_WIDTH = 400 - 50;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    }
]

export default class maps extends Component {
    // state = {
    //     latitude: 45.5209087,
    //     longitude: -122.6705107,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    //     visibleModalId: null,

    // }

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            error: null
        };
    }

    renderModalContent = () => (
        <View style={styles.content}>
            <ScrollView>
                <Main />
                {/* <Text style={styles.contentTitle}>Hi 👋!</Text>
            <Button
                onPress={() => this.setState({ visibleModal: null })}
                title="Close"
            /> */}
            </ScrollView>

        </View>
    );

    handleOnScroll = event => {
        this.setState({
            scrollOffset: event.nativeEvent.contentOffset.y,
        });
    };

    handleScrollTo = p => {
        if (this.scrollViewRef) {
            this.scrollViewRef.scrollTo(p);
        }
    };

    SampleFunction1() {
        this.setState({ visibleModal: 'swipeable' })
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            });
        },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
        );
    }
    render() {
        return (
            <View 
                
                style={styles.container}>

                <Modal
                    style={{ justifyContent: 'center' }}

                    isVisible={this.state.visibleModal === 'swipeable'}
                    onSwipeComplete={() => this.setState({ visibleModal: null })}
                    swipeDirection={['down']}
                >
                    {this.renderModalContent()}
                </Modal>


                <MapView
                    
                    style={styles.map}
                    //     initialRegion={{
                    //         latitude: 45.5209087,
                    //         longitude: -122.6705107,
                    //         latitudeDelta: 0.0922,
                    //         longitudeDelta: 0.0421,
                    //     }}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121
                    }}
                >
                    {/* <Marker
                    coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                    }}
                    description={"This is a marker in React Natve"}
                >
                </Marker> */}
                    <Marker
                        coordinate={this.state}
                    >
                        <Callout style={styles.card}
                            tooltip={true}
                            onPress={this.SampleFunction1.bind(this)}
                        >
                            <JoinUI />
                            <Button title='View Party!' onPress={this.SampleFunction1.bind(this)} />
                        </Callout>
                    </Marker>
                </MapView>
                 <View 
                        removeClippedSubviews
                        style={styles.buttonContainer}>
                        
                        <TouchableOpacity
                            // onPress={() => this.animate()}
                            style={[styles.bubble, styles.button]}
                        >
                            <Icon name='play' />
                            <Text> Next</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => this.animate()}
                            style={[styles.bubble, styles.button, { alignItems: 'center', alignContent: 'center' }]}
                        >
                            {/* <Icon name='add'/> */}
                            <Text> Invite</Text>
                        </TouchableOpacity>
                    </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        // justifyContent: 'center',
        // alignItems: 'center',
        // flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,

    },
    marker: {
        backgroundColor: "#550bbc",
        padding: 5,
        borderRadius: 5,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT + 40,
        width: CARD_WIDTH,
        overflow: "hidden",
        borderRadius: 9,
    },
    text: {
        color: "#FFF",
        fontWeight: "bold"
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: 800,
        width: "100%",
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    scrollableModal: {
        height: 300,
    },
    scrollableModalContent1: {
        height: 200,
        backgroundColor: '#87BBE0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollableModalText1: {
        fontSize: 20,
        color: 'white',
    },
    scrollableModalContent2: {
        height: 200,
        backgroundColor: '#A9DCD3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollableModalText2: {
        fontSize: 20,
        color: 'white',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
        alignItems:'center',
        alignContent:'center'

    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
        

    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
        
    },
});

AppRegistry.registerComponent('maps', () => maps);
