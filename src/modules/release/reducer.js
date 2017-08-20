import { handleActions } from 'redux-actions';
import merge from 'merge/merge';
import actionCreators from './action';
import * as D from '../../definitions';

const initialState = {
  product: {
    name: '',
    price: '',
    img: '',
    description: ''
  }
};

export default handleActions(
  {
    [actionCreators.release.product.sale.start]: (state, action) => {
      // return merge.recursive(true, state, { product: action.payload });
    },
    [actionCreators.release.product.sale.success]: (state, action) => {
      // return merge.recursive(true, state, { product: action.payload });
    },
    [actionCreators.release.product.sale.failed]: (state, action) => {
      // return merge.recursive(true, state, { product: action.payload });
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
    [actionCreators.release.product.image.picking]: (state, action) => {
      return state;
    },
    [actionCreators.release.product.image.failed]: (state, action) => {
      return state;
    },
    [actionCreators.release.product.image.picked]: (state, action) => {
      return merge.recursive(true, state, { product: { img: action.payload } });
    }
  },
  initialState
);
