import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import colors from '../../common/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  close: {
    marginRight: -12,
    zIndex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  }
})

class WithModal extends React.Component {

  onDismiss = () => {
    const { navigation, nav } = this.props
    navigation.goBack(null)

    // Go to homepage if dismiss singin
    if (nav.routes[1] && nav.routes[1].index === 0) {
      navigation.navigate('home')
    }
  }

  render() {
    const { children, title } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="md-close" size={24} style={styles.close} onPress={this.onDismiss} />
          <Text style={styles.title}>{title}</Text>
        </View>
        {children}
      </View>
    )
  }
}

const ConnectedWithModal = connect(state => ({
  nav: state.nav
}))(WithModal)

export const withModal = (outerProps) => (InnerContent) => (
  (props) => (
      <ConnectedWithModal {...outerProps} {...props} >
        <InnerContent {...props} />
      </ConnectedWithModal>
  )
)

export default ConnectedWithModal