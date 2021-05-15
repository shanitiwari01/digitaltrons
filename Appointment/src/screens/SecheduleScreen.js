import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, Dimensions, Platform, Image, ScrollView } from 'react-native';
import AppStatusBar from "../components/AppStatusBar";
import { BASE_URL } from "../core/constant";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { connect, Provider, useDispatch, useSelector } from 'react-redux';
import { fetchSlots, updateSlot } from '../actions/SlotsActions';
import { bindActionCreators } from 'redux';

const screen = Dimensions.get('window');
class SecheduleScreen extends React.Component {

    constructor(props) {
        super(props);
        let item = props.route.params.item;
        this.state = {
            visible: false,
            errorMessage: '',
            slot: item,
            firstName: item.first_name,
            lastName: item.last_name,
            phoneNumber: item.mobile,
        }
    }

    bookSlot = () => {
        const { slot, firstName, lastName, phoneNumber } = this.state;
        let validate = true;
        if (!firstName) {
            validate = false;
            this.setState({ errorMessage: "Please provide first name", visible: true });
        }

        if (!lastName && validate) {
            validate = false;
            this.setState({ errorMessage: "Please provide last name", visible: true });
        }

        if (!phoneNumber && validate) {
            validate = false;
            this.setState({ errorMessage: "Please provide phone number", visible: true });
        }

        if (validate) {
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({ "slotId": slot.id, "firstName": firstName, "lastName": lastName, "mobile": phoneNumber });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${BASE_URL}/update-slot`, requestOptions)
                .then(response => response.json())
                .then(result => {

                    console.log("result", result)
                    if(result.status == 200){
                        slot.first_name = firstName;
                        slot.last_name = lastName;
                        slot.mobile = phoneNumber;
                        slot.is_booked = 1;
                        this.props.updateSlot(slot);
                        this.props.navigation.goBack();
                    }else if(result.status == 201){
                        this.setState({ errorMessage: "Validation Error Found", visible: true });
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    render() {
        return (
            <View style={styles.secheduleScreen}>
                <AppStatusBar barStyle={'dark-content'} backgroundColor={'#A0344D'} />
                <TouchableOpacity style={styles.headerContainer} onPress={() => this.props.navigation.goBack()}>
                    <Icon name={"arrow-back-outline"} size={30} />
                </TouchableOpacity>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.textContainer}>
                        <Text style={styles.headingText}>{"Booking Slot 👍"}</Text>
                        <Text style={styles.normalText}>{"Book your slot"}</Text>
                    </View>
                    <View style={styles.slotsContainer}>
                        <View style={styles.inputLayout}>
                            <TextInput
                                label="First Name"
                                value={this.state.firstName}
                                onChangeText={firstName => this.setState({firstName})}
                            />
                        </View>
                        <View style={styles.inputLayout}>
                            <TextInput
                                label="Last Name"
                                value={this.state.lastName}
                                onChangeText={lastName => this.setState({lastName})}
                            />
                        </View>
                        <View style={styles.inputLayout}>
                            <TextInput
                                label="Phone number"
                                value={this.state.phoneNumber}
                                onChangeText={phoneNumber => this.setState({phoneNumber})}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonLayout}>
                                <Button mode="contained" onPress={() => this.props.navigation.goBack()}>
                                    Cancel
                                </Button>
                            </View>
                            <View style={styles.buttonLayout}>
                                <Button mode="contained" onPress={() => this.bookSlot()}>
                                    Save
                                </Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Snackbar
                    visible={this.state.visible}
                    onDismiss={() => this.setState({ visible: false })}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            this.setState({ visible: false })
                        },
                    }}>
                    {this.state.errorMessage}
                </Snackbar>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    secheduleScreen: {
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
    slotsContainer: {
        marginBottom: 20,
    },
    inputLayout: {
        marginBottom: 20,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    buttonLayout: {
        flex: 1,
        padding: 10
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
        updateSlot,
    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(SecheduleScreen);