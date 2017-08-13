import * as React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native'
import { connect, DispatchProp } from 'react-redux'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loaderContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
    zIndex: 100
  }
})

const Loader = ({children, loading}) => (
  <View style={styles.container}>
    {children}

    {
      loading
      ? <View style={styles.loaderContainer} >
          <ActivityIndicator size="large" />
        </View>
      : null
    }
  </View>
)

const ConnectedWithLoader = connect(state => ({
  loading: state.loading
}))(Loader)

export const withLoader = (outerProps?) => (InnerContent) => (
  (props) => (
    <ConnectedWithLoader {...outerProps} {...props} >
      <InnerContent {...props} />
    </ConnectedWithLoader>
  )
)

export default ConnectedWithLoader