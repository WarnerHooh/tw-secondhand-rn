import { createStore, combineReducers, applyMiddleware } from 'redux'

import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage'
import filter from 'redux-storage-decorator-filter'

import initialState from './initialState'
import reducers from './reducers'
import middlewares from './middlewares'
import { USER_LOGIN_SUC, USER_LOGOUT_SUC } from '../modules/user/actions'

const storeConfigure = () => {
    const reducer = storage.reducer(combineReducers(reducers))

    // bump up storage version if state structure change
    const engine = filter(createEngine('myApp-0.0.1'), [
        'user'
    ])

    const storeMiddleware = storage.createMiddleware(engine, [], [
        // White list actions, will save everything if leave blank here
        USER_LOGIN_SUC,
        USER_LOGOUT_SUC
    ])

    const createStoreWithMiddleware = applyMiddleware(storeMiddleware, ...middlewares)(createStore)
    
    const store = createStoreWithMiddleware(reducer, initialState)
    
    const load = storage.createLoader(engine)
    // will trigger storage load action
    load(store)

    return store
}

export default storeConfigure
