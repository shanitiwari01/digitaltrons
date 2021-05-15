import * as React from 'react';
import { StatusBar, View, Text } from 'react-native';

/**
 * Manage app status bar
 * 
 * @param {*} props 
 * @returns AppStatusBar
 */
const AppStatusBar = (props) => {

    return (
        <View>
            <StatusBar barStyle={props.barStyle} backgroundColor={props.backgroundColor}  />
        </View>
    );
};

export default AppStatusBar;