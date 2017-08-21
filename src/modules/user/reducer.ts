import * as D from '../../definitions'
import * as Redux from 'redux'

import { USER_LOGIN_SUC, USER_LOGOUT_SUC } from './action'

const initialState: D.UserState = {
    name: '',
    sessionToken: ''
}

const userReducer: Redux.Reducer<D.UserState> = (state: D.UserState, action: D.UserSucAction): D.UserState => {
    state = state || initialState
    switch (action.type) {
        case USER_LOGIN_SUC:
            return {
                ...state,
                sessionToken: action.payload.sessionToken,
                name: action.payload.username
            }
        case USER_LOGOUT_SUC:
            return {
                ...state,
                sessionToken: '',
                name: ''
            }
        default:
    }
    return state
}

export default userReducer
