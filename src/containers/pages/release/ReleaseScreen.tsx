import * as React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import * as D from '../../../definitions';
import styles from './ReleaseScreen.style';
import { compose } from 'redux';
import { withModal } from '../../hoc/WithModal';
import { withLoader } from '../../hoc/WithLoader';
import { withAuthorized } from '../../hoc/WithAuthorized';
import actionCreators from '../../../modules/release/action';
import { create as createProduct } from '../../../apis/products';
import { ImagePicker } from 'expo';

interface ReleaseScreenProps {
  product: D.ProductForCreate;
  user: D.User;
  onStartSaleClick(user: D.User, product: D.ProductForCreate): Promise<void>;
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
        <View style={styles.uploadImageContainer}>
          <TouchableOpacity onPress={this.props.onUploadImageClick} style={styles.uploadContainer}>
            {hasValidUploadedImageUrl
              ? <Image source={{ uri: img }} style={styles.uploadContent} /> :
              <View style={styles.uploadContent}>
                <Text>点击上传图片</Text>
                <Image style={styles.uploadImage} source={require('../../../common/assets/arrow_up_upload.png')} />
              </View>
            }
          </TouchableOpacity>
        </View>

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

const createProductForSale = (user: D.User, product: D.ProductForCreate): ((dispatch, getState) => Promise<void>) => {
  return (dispatch, getState) => {
    dispatch(actionCreators.release.product.sale.start());
    return createProduct(product)
      .then((createdProduct: D.Product) => {
        dispatch(actionCreators.release.product.sale.success(createdProduct));
      })
      .catch(e => {
        dispatch(actionCreators.release.product.sale.failed(e));
      });
  };
};

const pickProductImage = (): ((dispatch, getState) => void) => {
  return (dispatch, getState) => {
    dispatch(actionCreators.release.product.image.picking());
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    }).then(response => {
      if (!response.cancelled) {
        dispatch(actionCreators.release.product.image.picked(response.uri));
      } else if (response.uri) {
        dispatch(actionCreators.release.product.image.failed());
      }
    });
  };
};

const enhance = compose(
  withAuthorized(),
  withLoader(),
  withModal({ title: '发布宝贝' }),
  connect(
    (state, ownProps) => ({
      product: state.release.product,
      user: state.user
    }),
    (dispatch, ownProps) => ({
      onStartSaleClick: (user: D.User, product: D.ProductForCreate) => dispatch(createProductForSale(user, product)),
      onNameChange: (name: string) => dispatch(actionCreators.release.product.name.change(name)),
      onPriceChange: (price: string) => dispatch(actionCreators.release.product.price.change(price)),
      onDescriptionChange: (desc: string) => dispatch(actionCreators.release.product.description.change(desc)),
      onUploadImageClick: () => dispatch(pickProductImage())
    })
  )
);

export default enhance(ReleaseScreen);
