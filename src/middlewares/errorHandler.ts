import { Alert } from 'react-native'

const defaultErrorHandler = (e) => {
  if (e && e.message) {
    Alert.alert('Error', `${e.message}`)
  }
}

export default store => next => action => {
  const isFailed = action.meta && action.meta.asyncPhase && action.meta.asyncPhase === 'FAILED'
  const isOmit = action.meta && action.meta.omit

  if (isFailed && !isOmit) {
    defaultErrorHandler(action.payload)
  }

  return next(action)
}