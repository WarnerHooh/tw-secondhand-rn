import * as React from 'react'
import { Image, StyleSheet } from 'react-native'
import { NavigationActions, TabNavigator } from 'react-navigation'
import colors from '../common/colors'

import HomeScreen from '../containers/pages/HomeScreen'
import OthersScreen from '../containers/pages/OthersScreen'
import ProfileScreen from '../containers/pages/ProfileScreen'
import ReleaseScreen from '../containers/pages/release/ReleaseScreen'

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
  circle: {
    padding: 8,
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: 21,
    overflow: 'hidden',
    borderWidth: 13
  },
  circleFocused: {
    borderColor: colors.yellow,
    backgroundColor: colors.yellow
  }
})

const Route = TabNavigator(
  {
    home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Image source={require('../common/assets/home.png')} style={[styles.icon, { tintColor: tintColor }]} />
      }
    },
    release: {
      screen: ReleaseScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) =>
          <Image
            source={require('../common/assets/plus.png')}
            style={[styles.icon, styles.circle, { tintColor: tintColor }, focused ? styles.circleFocused : {}]}
          />
      }
    },
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) =>
          <Image source={require('../common/assets/person.png')} style={[styles.icon, { tintColor: tintColor }]} />
      }
    }
  },
  {
    initialRouteName: 'home',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: colors.yellow,
        borderTopWidth: 0,
        overflow: 'hidden'
      },
      activeBackgroundColor: colors.white,
      inactiveTintColor: colors.black,
      activeTintColor: colors.black,
      showLabel: false
    }
  }
)

const initialRouterAction = NavigationActions.init()

const initialState = Route.router.getStateForAction(initialRouterAction, null)

export const reducer = (state = initialState, action) => {
  let nextState
  // Simply return the original `state` if `nextState` is null or undefined.
  switch (action.type) {
    default:
      nextState = Route.router.getStateForAction(action, state)
  }
  return nextState || state
}

export default Route
