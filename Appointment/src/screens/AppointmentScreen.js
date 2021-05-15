import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Dimensions, Platform, Image, TextInput, RefreshControl, Linking, ScrollView } from 'react-native';
import AppStatusBar from "../components/AppStatusBar";
import { BASE_URL } from "../core/constant";
import Icon from "react-native-vector-icons/Ionicons";
import { connect, Provider, useDispatch, useSelector } from 'react-redux';
import { fetchSlots, updateSlot } from '../actions/SlotsActions';
import { bindActionCreators } from 'redux';

const screen = Dimensions.get('window');
class AppointmentScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        // fetch slots
        this.setupAppointmentScreen();
    }

    setupAppointmentScreen() {
        this.setState({ loading: true });

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${BASE_URL}/slots`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("result", result.data.slots);
                if(result.status == 200){
                    this.props.fetchSlots(result.data.slots);
                }
                
                this.setState({ loading: false });
            })
            .catch(error => console.log('error', error));
    }

    renderEmptyContainer = () => {
        const { loading } = this.state;
        return (
            <View style={styles.emptyContainer}>
                {loading && <Text style={styles.normalText}>{"Loading Slots"}</Text>}
            </View>
        )
    }

    secheduleScreen = (item) => {
        this.props.navigation.navigate('Sechedule', {
            item: item
        })
    }

    renderSlots = (slot) => {
        let slotNum = slot.index;
        return (
            <View style={[styles.slots, { marginLeft: slotNum % 2 ? 10 : 0, backgroundColor: !slot.item.is_booked ? '#FFFFFF' : '#dc3545' }]}>
                <TouchableOpacity onPress={() => this.secheduleScreen(slot.item)}>
                    <Text style={styles.slotText}>{slot.item.slot_name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        console.log("this.props.slots", this.props.slots);
        const { slots } = this.props.slots;
        return (
            <View style={styles.appointmentScreen}>
                <AppStatusBar barStyle={'dark-content'} backgroundColor={'#A0344D'} />
                <TouchableOpacity style={styles.headerContainer} onPress={() => this.props.navigation.navigate('Images')}>
                    <Icon name={"apps-outline"} size={30} /><Text style={styles.headingText}>{' Gallery'}</Text>
                </TouchableOpacity>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled>
                    <View style={styles.textContainer}>
                        <Text style={styles.headingText}>{"Appointments 🤔"}</Text>
                        <Text style={styles.normalText}>{"Book your slots with digital trons..."}</Text>
                    </View>
                    <View style={styles.slotsContainer}>
                        <Text>
                            <Text style={[styles.normalText, { fontSize: 25 }]}>Your</Text>
                            <Text style={[styles.headingText, { fontSize: 25 }]}> Slots</Text>
                        </Text>
                    </View>
                    <View>
                        <FlatList
                            data={slots}
                            renderItem={this.renderSlots}
                            ListEmptyComponent={this.renderEmptyContainer()}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            extraData={slots}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    appointmentScreen: {
        flex: 1,
        backgroundColor: "#A0344D",
        paddingLeft: 20,
        paddingRight: 20,
    },
    headerContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textContainer: {
        marginBottom: 20,
    },
    slotsContainer: {
        marginBottom: 20,
    },
    slots: {
        width: (screen.width - 50) / 2,
        marginBottom: 10,
        padding: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        elevation: 4
    },
    slotText: {
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


const mapStateToProps = (state) => {
    const { slots } = state
    return { slots }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        fetchSlots,
    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentScreen);