import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { compose } from 'redux'
import { connect, DispatchProp } from 'react-redux'
import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import * as D from '../../definitions'
import { userLogin } from '../../modules/user/action'

import { withAuthorized } from '../hoc/WithAuthorized'
import { width } from 'react-native-dimension';
import { userLogout } from '../../modules/user/action';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    height: 50,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  avart: {
    width: 60,
    height: 60
  },
  info: {
    flex: 1,
    width: width(80),
    padding: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CDCDC3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
    marginTop: 20
  },
  innerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 50
  },
  buttons: {
    marginTop: 30,
    flex: 8,
    justifyContent: 'space-around'
  },
  button: {
    width: 200
  }
})

 type ProfileProps<S> = DispatchProp<S> & {
  user: D.User,
  onBoughtProductClick: ()=>void;
  onSaleProductClick: ()=>void;
  onLogoutClick: ()=>void;
}

class ProfileScreen extends React.Component<ProfileProps<object>, object> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.innerInfo}>
            <Image style={styles.avart} source={require('../../common/assets/login.png')}></Image>
            <Text style={styles.name}>{this.props.user.name}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Button
            backgroundColor="#FAE05E"
            color="black"
            fontWeight="bold"
            fontSize={14}
            buttonStyle={styles.button}
            title="已买宝贝"
            onPress={this.props.onBoughtProductClick}
          />

          <Button
            backgroundColor="#FAE05E"
            color="black"
            fontWeight="bold"
            fontSize={14}
            buttonStyle={styles.button}
            title="出售宝贝"
            onPress={this.props.onSaleProductClick}
          />

          <Button
            backgroundColor="#FAE05E"
            color="black"
            fontWeight="bold"
            fontSize={14}
            buttonStyle={styles.button}
            title="退出登录"
            onPress={this.props.onLogoutClick}
          />
        </View>
      </View>
    )
  }
}

export default compose(
  withAuthorized(),
  connect(
    (state, ownProps) => ({
      user: state.user
    }),
    (dispatch, ownProps) => ({
      onBoughtProductClick: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
      onSaleProductClick: ()=>dispatch(NavigationActions.navigate({ routeName: 'owned' })),
      onLogoutClick: ()=>dispatch(userLogout())
    }))
)(ProfileScreen)