import * as React from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import * as D from '../../,,/../../definitions';
import styles from './ReleaseScreen.style';
import { compose } from 'redux';
import { withModal } from '../WithModal';
import { withLoader } from '../WithLoader';
import actionCreators from '../../../modules/release/action';

interface ReleaseScreenProps {
  product: D.Product;
  user: D.User;
  onStartSaleClick(user: D.User, product: D.Product): void;
  onNameChange(name: string): void;
  onPriceChange(price: string): void;
  onDescriptionChange(desc: string): void;
  onUploadImageClick(): void;
}

class ReleaseScreen extends React.Component<ReleaseScreenProps> {
  render() {
    const { img } = this.props.product;
    const hasValidUploadedImageUrl = img !== undefined && img !== '';
    return (
      <View style={styles.container}>
        {hasValidUploadedImageUrl
          ? <Image source={require(img)} />
          : <View style={styles.uploadContainer}>
              <View style={styles.uploadContent}>
                <Text>点击上传图片</Text>
                <Image style={styles.uploadImage} source={require('../../../common/assets/arrow_up_upload.png')} />
              </View>
            </View>}

        <View style={styles.productDetail}>
          <TextInput style={styles.input} placeholder="商品名称" onChangeText={this.props.onNameChange} />
          <TextInput style={styles.input} placeholder="售价￥" onChangeText={this.props.onPriceChange} />
          <TextInput
            style={[styles.input, styles.productDesc]}
            placeholder="添加描述..."
            multiline={true}
            onChangeText={this.props.onDescriptionChange}
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
              this.props.onStartSaleClick(this.props.user, this.props.product);
            }}
          />
        </View>
      </View>
    );
  }
}

const enhance = compose(
  withLoader(),
  withModal({ title: '发布宝贝' }),
  connect(
    (state, ownProps) => ({
      product: state.release.product,
      user: state.user
    }),
    (dispatch, ownProps) => ({
      onStartSaleClick: (user: D.User, product: D.Product) =>
        dispatch(actionCreators.release.product.sale.start(user, product)),
      onNameChange: name => dispatch(actionCreators.release.product.name.change(name)),
      onPriceChange: price => dispatch(actionCreators.release.product.price.change(price)),
      onDescriptionChange: desc => dispatch(actionCreators.release.product.description.change(desc)),
      onUploadImageClick: () => dispatch(actionCreators.release.product.image.uploading())
    })
  )
);

export default enhance(ReleaseScreen);
