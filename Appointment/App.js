import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import slotsReducer from './src/reducers/SlotsReducer';
/**
 * Store user details
 */
global.userDetails = {};

const store = createStore(slotsReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    )
  }
}