import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Dimensions, Platform, Image, TextInput, RefreshControl, Linking, ScrollView } from 'react-native';
import AppStatusBar from "../components/AppStatusBar";
import { AsyncKey } from "../core/constant";
import { wait } from "../core/functions";
import Icon from "react-native-vector-icons/Ionicons";

const screen = Dimensions.get('window');
export default class ImagesScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            images: []
        }
    }

    componentDidMount() {

        fetch('https://picsum.photos/v2/list?limit=100')
            .then(response => response.json())
            .then(data => this.setState({ images: data }));
    }


    renderEmptyContainer = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.normalText}>{"Loading Images"}</Text>
            </View>
        )
    }

    secheduleScreen = (item) => {
        this.props.navigation.navigate('Sechedule', {
            item: item
        })
    }

    renderImages = (image) => {
        let imageNum = image.index;
        let random = Math.floor(Math.random() * 10); 
        return (
            <View style={[styles.images, { marginLeft: imageNum % 2 ? 10 : 0 }]}>
               <Image source={{uri: `https://picsum.photos/200/300?random=${imageNum}`}}  style={styles.imageStyle} />
            </View>
        )
    }

    render() {
        const { images } = this.state;
        return (
            <View style={styles.ImagesScreen}>
                <AppStatusBar barStyle={'dark-content'} backgroundColor={'#A0344D'} />
                <TouchableOpacity style={styles.headerContainer} onPress={() => this.props.navigation.goBack()}>
                    <Icon name={"arrow-back-outline"} size={30} />
                </TouchableOpacity>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.textContainer}>
                        <Text style={styles.headingText}>{"Gallery 🌄"}</Text>
                        <Text style={styles.normalText}>{"Browse Gallery"}</Text>
                    </View>
                    <View style={styles.imagesContainer}>
                        <Text>
                            <Text style={[styles.normalText, { fontSize: 25 }]}>Your</Text>
                            <Text style={[styles.headingText, { fontSize: 25 }]}> Gallery</Text>
                        </Text>
                    </View>
                    <View style={{flexWrap: 'wrap'}}>
                        <FlatList
                            data={images}
                            style={{flexWrap: 'wrap'}}
                            renderItem={this.renderImages}
                            ListEmptyComponent={this.renderEmptyContainer()}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    ImagesScreen: {
        flex: 1,
        backgroundColor: "#A0344D",
        paddingLeft: 20,
        paddingRight: 20,
    },
    headerContainer: {
        marginVertical: 20,
    },
    textContainer: {
        marginBottom: 20,
    },
    imagesContainer: {
        marginBottom: 20,
    },
    images: {
        width: (screen.width - 50) / 2,
        height: screen.width / 3,
        marginBottom: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        elevation: 4
    },
    imageStyle: {
        width: (screen.width - 50) / 2,
        height: screen.width / 3,
        borderRadius: 10,
    },
    imageText: {
        color: '#2F2C25',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10
    },
    emptyContainer: {
        alignItems: 'center'
    },
    headingText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2F2C25',
    },
    normalText: {
        color: '#2F2C25',
        fontSize: 20,
        fontWeight: '400',
    }
});