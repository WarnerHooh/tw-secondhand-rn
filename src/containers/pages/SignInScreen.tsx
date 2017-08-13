import * as React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import colors from '../../common/colors'
import { withModal } from './WithModal'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30
  },
  avatar: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginTop: 100,
    marginBottom: 30
  },
  formRow: {
    marginTop: 30
  },
  button: {
    marginTop: 50
  },
  signInButton: {
    backgroundColor: colors.blue
  },
  signUpButton: {
    backgroundColor: colors.yellow,
    color: colors.black
  }
})

class SignInScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: {
        username: {
          value: '',
          errorMessage: ''
        },
        password: {
          value: '',
          errorMessage: ''
        },
      }
    }
  }

  onChangeText = (field) => (text) => {
    const fieldsState = this.state.fields

    this.setState({
      fields: {
        ...fieldsState,
        [field]: {
          ...fieldsState[field],
          value: text
        }
      }
    })
  }

  formSubmit = () => {
    let { fields } = this.state
    let valid = true

    Object.entries(fields)
      .forEach(([field, detail]) => {
        let errorMessage = ''

        if (detail.value.length === 0) {
          errorMessage = '不能为空'
        }

        fields = {
          ...fields,
          [field]: {
            ...fields[field],
            errorMessage
          }
        }

        valid = valid && errorMessage.length === 0
      })

    this.setState({fields}, () => {
      if (valid) {
        // TODO ACTION
      }
    })
  }

  render() {
    const { fields: { username, password } } = this.state

    return (
      <View style={styles.container}>

        <Image
          source={require('../../common/assets/avatar.png')}
          style={styles.avatar}
        />

        <FormInput
          value={username.value}
          placeholder="用户名"
          onChangeText={this.onChangeText('username')}
          style={[styles.formRow]}
        />
        <FormValidationMessage>{username.errorMessage}</FormValidationMessage>

        <FormInput
          value={password.value}
          placeholder="密码"
          secureTextEntry={true}
          onChangeText={this.onChangeText('password')}
          style={[styles.formRow]}
        />
        <FormValidationMessage>{password.errorMessage}</FormValidationMessage>

        <Button
          title="登录"
          backgroundColor={colors.blue}
          style={[styles.formRow, styles.button]}
          onPress={this.formSubmit}
        />

        <Button
          title="免费注册"
          color={colors.black}
          backgroundColor={colors.yellow}
          style={[styles.formRow, styles.button]}
          onPress={() => {
            this.props.navigation.navigate('signup')
          }}
        />
      </View>
    )
  }
}

export default withModal({title: '登录'})(SignInScreen)