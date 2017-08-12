import { StyleSheet } from 'react-native'
import { width } from 'react-native-dimension'
import colors from '../../../common/colors'

export default StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
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
  uploadContent: {
    backgroundColor: colors.grey4,
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
