import * as React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { buyProduct } from '../../modules/product/action'

import colors from '../../common/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: colors.white
  },

  pic: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },

  details: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 10
  },
  piece: {
    flex: 1,
  },
  title: {
    fontSize: 18
  },
  price: {
    color: colors.orange,
    fontSize: 16,
    fontWeight: 'bold'
  },
  owner: {
    color: colors.grey2,
    marginTop: 10
  },
  icon: {
    color: colors.yellow1,
  },

  description: {
    paddingVertical: 10
  },

  button: {
    marginTop: 30
  }

})

class ProductScreen extends React.Component {

  render () {

    const { navigation, buyProductAction } = this.props

    const { params: { img, name, price, description, productId, owner } } = navigation.state

    return (
      <View style={styles.container}>
        <Image source={{uri: img}} style={styles.pic} />

        <View style={styles.details}>
          <Text style={[styles.title, styles.piece]}>{name}</Text>
          <View style={styles.piece}>
            <Text style={styles.price}>¥ {price}</Text>
            <Text style={styles.owner}>
              <FontAwesome name="user" style={styles.icon} />
              <Text> {owner.username}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.description}>
          <Text>{description}</Text>
        </View>

        <Button
          title="立即购买"
          color={colors.black}
          backgroundColor={colors.yellow}
          style={styles.button}
          onPress={() => {
            buyProductAction({productId})
          }}
        />
      </View>
    )
  }
}

export default connect(
  state => ({
  }),
  dispatch => ({ buyProductAction: bindActionCreators(buyProduct, dispatch) })
)(ProductScreen)