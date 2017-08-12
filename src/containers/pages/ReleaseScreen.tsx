import * as React from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { Button } from 'react-native-elements'
import * as D from '../../definitions'
import { height, width } from 'react-native-dimension'

type ReleaseScreenProps<S> = DispatchProp<S> & {
  user: D.UserState
  imageUrl: string
}

interface State {
  name: string
  price: string
  description: string
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#D1D1D1',
    fontSize: 16,
    width: width(80),
    marginBottom: 20
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10
  },
  uploadContainer: {
    flex: 1
  },
  uploadContent: {
    backgroundColor: '#FAF7F7',
    flex: 1,
    width: width(100),
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadImage: {
    width: 50,
    height: 50
  },
  productDetail: {
    flex: 2,
    alignItems: 'center'
  },
  productDesc: {
    borderWidth: 1,
    height: 150
  },
  releaseBtnContainer: {
    flex: 1
  },
  releaseBtn: {
    width: 200
  }
})

class ReleaseScreen extends React.Component<ReleaseScreenProps<object>, State> {
  constructor(props: ReleaseScreenProps<object>) {
    super(props)
    this.state = {
      name: '',
      price: '',
      description: ''
    }
  }

  handleImageChange = e => {
    e.preventDefault()
    const { dispatch } = this.props
    // dispatch(uploadProductImage(e.target.files[0]))
  }

  handleSubmit = imageUrl => e => {
    e.preventDefault()
    const { dispatch } = this.props
    // dispatch(
    //   createProduct({
    //     name: this.state.name,
    //     price: this.state.price,
    //     img: imageUrl,
    //     description: this.state.description
    //   })
    // )
  }

  onChangeState = name => e => {
    this.setState({ [name]: e.target.value })
  }

  render() {
    const { imageUrl } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.header}>发布宝贝</Text>
        {imageUrl.toString() !== ''
          ? <Image source={require(imageUrl.toString())} />
          : <View style={styles.uploadContainer}>
              <View style={styles.uploadContent}>
                <Text>点击上传图片</Text>
                <Image style={styles.uploadImage} source={require('../../common/assets/arrow_up_upload.png')} />
              </View>
              <TextInput onChange={this.handleImageChange} />
            </View>}
        <View style={styles.productDetail}>
          <TextInput style={styles.input} placeholder="商品名称" onChange={this.onChangeState('name')} />
          <TextInput style={styles.input} placeholder="售价￥" onChange={this.onChangeState('price')} />
          <TextInput
            style={[styles.input, styles.productDesc]}
            placeholder="添加描述..."
            multiline={true}
            onChange={this.onChangeState('description')}
          />
        </View>
        <View style={styles.releaseBtnContainer}>
          <Button
            backgroundColor="#FAE05E"
            color="black"
            fontWeight="bold"
            fontSize={14}
            buttonStyle={styles.releaseBtn}
            title="开始出售"
            onPress={() => {
              this.handleSubmit(imageUrl)
            }}
          />
        </View>
      </View>
    )
  }
}

export default connect((state: D.RootState) => ({
  user: state.user,
  imageUrl: ''
}))(ReleaseScreen)
