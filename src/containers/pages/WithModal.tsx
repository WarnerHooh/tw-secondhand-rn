import * as React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1
  }
})

class WithModal extends React.Component {

  onDismiss = () => {
    const { navigation } = this.props
    navigation.goBack(null)
  }

  render() {
    const { children, title } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="md-close" size={24} onPress={this.onDismiss} />
          <Text style={styles.title}>{title}</Text>
        </View>
        {children}
      </View>
    )
  }
}

const ConnectedWithModal = connect()(WithModal)

export const withModal = (outerProps) => (InnerContent) => (
  function ModalLayout(props) {
    return (
      <ConnectedWithModal {...outerProps} {...props} >
        <InnerContent {...props} />
      </ConnectedWithModal>
    )
  }
)

export default ConnectedWithModal