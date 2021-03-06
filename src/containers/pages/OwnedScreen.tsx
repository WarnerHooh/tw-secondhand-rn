import * as React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { getOwnedProducts } from '../../modules/product/action'
import ListItem from '../../components/OwnedListItem'
import { withFocused } from '../hoc/WithFocused'

import colors from '../../common/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
})

class OwnedScreen extends React.Component {

  componentDidMount() {
    const { user, getOwnedProductsAction } = this.props

    if (user.sessionToken) {
      getOwnedProductsAction()
    }
  }

  keyExtractor = (item, index) => item.objectId

  render () {
    const { owned, navigation } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={owned}
          keyExtractor={this.keyExtractor}
          renderItem={({item}) => <ListItem {...item} key={item.objectId} navigation={navigation} />}
        />
      </View>
    )
  }
}

export default compose(
  withFocused(),
  connect(
    state => ({
      owned: state.product.owned,
      user: state.user
    }),
    dispatch => ({ getOwnedProductsAction: bindActionCreators(getOwnedProducts, dispatch) })
  )
)(OwnedScreen)