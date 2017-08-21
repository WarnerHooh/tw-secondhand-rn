import * as React from 'react'
import { View, TouchableHighlight, Image, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import colors from '../common/colors'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  inner: {
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  overlay: {
    backgroundColor: 'rgba(255, 250, 250, 0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 10
  },
  thumb: {
    marginRight: 30
  },
  pic: {
    width: 120,
    height: 120
  },
  detail: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 6
  },
  icon: {
    color: colors.yellow1
  },
  user: {
    paddingLeft: 200
  },
  price: {
    color: colors.yellow1
  }
})

export default ({img, name, price, description, owner, buyer, objectId, navigation}) => (
  <TouchableHighlight onPress={ ()=> {
    navigation.navigate('product', {img, name, price, description, productId: objectId, owner})
  }}>
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.thumb}>
          <Image source={{uri: img}} style={styles.pic} />
        </View>

        <View style={styles.detail}>
          <Text>{name}</Text>
          <Text style={styles.price}>¥ {price}</Text>
          {
            buyer
            ? <Text>
                <FontAwesome name="user" style={styles.icon} />
                <Text style={styles.user}> {buyer.username}</Text>
              </Text>
            : null
          }
          <Text>{buyer ? '交易关闭' : '出售中'}</Text>
        </View>
      </View>
      {
        buyer
        ? <View style={styles.overlay} />
        : null
      }
    </View>
  </TouchableHighlight>
)