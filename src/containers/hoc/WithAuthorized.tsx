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
    const { user, isFocused } = nextProps

    if (!user.sessionToken) {
      if (!this.props.isFocused && isFocused) {
        this.props.navigation.navigate('signin')
      }
    }
  }

  render() {
    const { children, user } = this.props
    return (
      <View style={styles.container}>
        {
          user.sessionToken
          ? children
          : null
        }
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