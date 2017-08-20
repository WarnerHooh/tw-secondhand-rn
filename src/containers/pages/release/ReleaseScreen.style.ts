import { StyleSheet } from 'react-native';
import { width } from 'react-native-dimension';
import colors from '../../../common/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.grey,
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
  uploadImageContainer: {
    flex: 1.3,
  },
  uploadContent: {
    backgroundColor: colors.grey4,
    flex: 1,
    width: width(100),
    justifyContent: 'center',
    alignItems: 'center'
  },
  uplaodedImage: {
    marginTop:10,
    width: width(80)
  },
  uploadImage: {
    width: 50,
    height: 50
  },
  productDetail: {
    paddingTop: 20,
    flex: 1.5,
    alignItems: 'center'
  },
  productDesc: {
    borderWidth: 1,
    height: 150
  },
  releaseBtnContainer: {
    flex: 0.5,
  },
  releaseBtn: {
    width: 200
  }
});
