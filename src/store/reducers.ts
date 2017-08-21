import { reducer as nav } from './Router'
import app from '../modules/app/reducer'
import user from '../modules/user/reducer'
import loader from '../modules/loader/reducer'
import release from '../modules/release/reducer'
import items from '../modules/items/reducer'
import product from '../modules/product/reducer'

export default {
  nav,
  app,
  user,
  loading: loader,
  release,
  items,
  product,
}
