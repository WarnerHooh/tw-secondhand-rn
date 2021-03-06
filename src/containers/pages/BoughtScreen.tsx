import * as React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { getBoughtProducts } from '../../modules/product/action'
import ListItem from '../../components/BoughtListItem'
import { withFocused } from '../hoc/WithFocused'
import { User } from '../../definitions'

import colors from '../../common/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
})

interface Props {
  user: User,
  navigation: object,
  bought: Array<object>,
  getBoughtProductsAction: Function,
}

class BoughtScreen extends React.Component<Props, {}> {

  componentDidMount() {
    const { user, getBoughtProductsAction } = this.props

    if (user.sessionToken) {
      getBoughtProductsAction()
    }
  }

  keyExtractor = (item, index) => item.objectId

  render () {
    console.log(this.props)
    const { bought, navigation } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={bought}
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
      bought: state.product.bought,
      user: state.user
    }),
    dispatch => ({ getBoughtProductsAction: bindActionCreators(getBoughtProducts, dispatch) })
  )
)(BoughtScreen)