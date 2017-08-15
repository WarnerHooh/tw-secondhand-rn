import { handleActions } from 'redux-actions';
import merge from 'merge/merge';
import actionCreators from './action';
import * as D from '../../definitions';

const initialState = {
  product: {
    name: '',
    price: '',
    img: '',
    description: '',
    owner: null,
    objectId: ''
  }
};

export default handleActions(
  {
    [actionCreators.release.product.sale.start]: (state, action) => {
      return merge.recursive(true, state, { product: action.payload });
    },
    [actionCreators.release.product.name.change]: (state, action) => {
      return merge.recursive(true, state, { product: { name: action.payload } });
    },
    [actionCreators.release.product.price.change]: (state, action) => {
      return merge.recursive(true, state, { product: { price: action.payload } });
    },
    [actionCreators.release.product.description.change]: (state, action) => {
      return merge.recursive(true, state, { product: { description: action.payload } });
    },
    [actionCreators.release.product.image.uploading]: (state, action) => {
      return merge.recursive(true, state, { product: action.product });
    }
  },
  initialState
);
