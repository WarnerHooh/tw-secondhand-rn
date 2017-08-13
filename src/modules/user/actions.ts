import { Epic } from 'redux-most'
import epicCreator from '../../utils/epicsCreator'

import * as D from '../../definitions'
import { login, logout,  register } from '../../apis/user'
import userStorage from '../../utils/storage'

export const USER_REGISTER = 'USER_REGISTER'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_SUC = 'USER_LOGIN_SUC'

export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOGOUT_SUC = 'USER_LOGOUT_SUC'

export const userRegister = (user: D.UserForRegister): D.UserAction => ({ type: USER_REGISTER, payload: user })

export const userLogin = (user: D.UserForLogin, meta: D.MetaForLogin): D.UserAction => ({
    type: USER_LOGIN, payload: user, meta
})

export const userLogout = (): D.UserAction => ({ type: USER_LOGOUT })

const registerEpic: Epic<D.GeneralAction> = epicCreator(USER_REGISTER, register)

const loginEpic: Epic<D.GeneralAction> = epicCreator(USER_LOGIN, login, (store, response, action) => {
    userStorage.setUser(response).then(() => {
        console.log('setUser')
    })
})

const logoutCallback = (store) => {
    userStorage.removeUser().then(() => {
        console.log('removeUser')
    })
}

const logoutEpic: Epic<D.GeneralAction> = epicCreator(USER_LOGOUT, logout, logoutCallback, logoutCallback)

export const epics: Array<Epic<D.GeneralAction>> = [
    registerEpic,
    loginEpic,
    logoutEpic,
]
