import * as D from '../definitions'
import asyncStorageEngine from 'redux-storage-engine-reactnativeasyncstorage'

const USER_STORAGE_KEY = 'user'

const asyncStorage = asyncStorageEngine(USER_STORAGE_KEY)

async function setUser(user: D.UserProfile) {
  await asyncStorage.save(user)
  return user
}

async function removeUser() {
  await asyncStorage.save(null)
  return null
}

async function getUser() {
  const user = await asyncStorage.load()
  return user
}

async function getToken() {
  const { sessionToken } = await getUser()
  return sessionToken
}

export default {
    setUser,
    removeUser,
    getUser,
    getToken,
}
