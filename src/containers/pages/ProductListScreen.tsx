import * as React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { getProducts } from '../../modules/product/action'
import ListItem from '../../components/ProductListItem'
import { withFocused } from '../hoc/WithFocused'
import { Product } from '../../definitions'

import colors from '../../common/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
})

interface Props {
  products: Array<Product>,
  navigation: object,
  getProductsAction: Function,
  isFocused: boolean,
}

class OwnedScreen extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.getProductsAction()
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.isFocused && nextProps.isFocused) {
      nextProps.getProductsAction()
    }
  }

  keyExtractor = (item, index) => item.objectId

  render () {
    const { products, navigation } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={products}
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
      products: state.product.available,
      user: state.user
    }),
    dispatch => ({ getProductsAction: bindActionCreators(getProducts, dispatch) })
  )
)(OwnedScreen)