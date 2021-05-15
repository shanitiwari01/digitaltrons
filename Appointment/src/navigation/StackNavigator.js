import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { TransitionSpecs, HeaderStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import AppointmentScreen from '../screens/AppointmentScreen';
import SecheduleScreen from '../screens/SecheduleScreen';
import ImagesScreen from '../screens/ImagesScreen';

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
}

const Stack = createStackNavigator()

/**
 * Intialize here all screen
 * 
 * @returns StackNavigator
 */
function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen
          name='Home'
          component={AppointmentScreen}
          options={{
            cardOverlayEnabled: true,
            gestureEnabled: true,
            title: 'Screen Transition',
            ...MyTransition,
          }} />
          <Stack.Screen
          name='Sechedule'
          component={SecheduleScreen}
          options={{
            cardOverlayEnabled: true,
            gestureEnabled: true,
            title: 'Screen Transition',
            ...MyTransition,
          }} />
          <Stack.Screen
          name='Images'
          component={ImagesScreen}
          options={{
            cardOverlayEnabled: true,
            gestureEnabled: true,
            title: 'Screen Transition',
            ...MyTransition,
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator