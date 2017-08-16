import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { compose } from 'redux'
import { connect, DispatchProp } from 'react-redux'
import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

import * as D from '../../definitions'
import { userLogin } from '../../modules/user/actions'

import { withAuthorized } from '../hoc/WithAuthorized'

export type ProfileProps<S> = DispatchProp<S> & {
  user: D.User
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

class ProfileScreen extends React.Component<ProfileProps<object>, object> {

  static navigationOptions = {
    tabBarVisible: false
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Login"
          onPress={() => this.props.dispatch(userLogin({
              username: 'admin',
              password: 'admin',
            }))
          }
        />
        <Text>Profile .... {this.props.user.name ? `This is ${this.props.user.name}` : null} !</Text>
        <Button
          title="Go to Home"
          onPress={() => {
            this.props.dispatch(NavigationActions.navigate({ routeName: 'home' }))
            // this.props.navigation.navigate('signin')
          }}
        />
        <Button
          title="Go Back"
          onPress={() => {
            this.props.dispatch(NavigationActions.back())
          }}
        />

      </View>
    )
  }
}

export default compose(
  withAuthorized(),
  connect(
    state => ({
      user: state.user,
      nav: state.nav
    })
  ),
)(ProfileScreen)