import { combineEpics } from 'redux-most'

import { epics as userEpic } from '../modules/user/action'
import { epics as productEpic } from '../modules/product/action'

export default combineEpics([
  ...userEpic,
  ...productEpic,
])