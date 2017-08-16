import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class WithAuthorized extends React.Component {

  componentWillReceiveProps(nextProps) {
    const nav = this.props.nav
    const nextNav = nextProps.nav

    const tabRoute = nav.routes[0]
    const nextTabRoute = nextNav.routes[0]

    if (tabRoute.index !== nextTabRoute.index
      && (nextTabRoute.routes[nextTabRoute.index].routeName === this.props.navigation.state.routeName)) {
      this.props.navigation.navigate('signin')
    }
  }

  render() {
    const { children } = this.props
    return (
      <View style={styles.container}>
        {children}
      </View>
    )
  }
}

const ConnectedWithAuthorized = connect(
  state => ({
    user: state.user,
    nav: state.nav
  })
)(WithAuthorized)

export const withAuthorized = (outerProps) => (InnerContent) => (props) => (
  <ConnectedWithAuthorized {...props} {...outerProps}>
    <InnerContent {...props} />
  </ConnectedWithAuthorized>
)

export default ConnectedWithAuthorized