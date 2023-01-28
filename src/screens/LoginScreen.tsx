import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import { WhiteLogo } from '../components/WhiteLogo'
import { BackGround } from './BackGround'
import { loginStyles } from '../theme/LoginTheme';
import { TextInput } from 'react-native-gesture-handler';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = (navigation: Props) => {

  const { singIn, errorMessage, removeError } = useContext(AuthContext)

  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  })

  const onLogin = () => {
    console.log({ email, password });
    Keyboard.dismiss();

    singIn({ correo: email, password })
  }

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Login incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError
      }
    ])

  }, [errorMessage])


  return (
    <>
      {/* background */}
      <BackGround />

      <KeyboardAvoidingView style={{ flex: 1 }}
        behavior={(Platform.OS === 'ios') ? 'height' : 'height'}
      >


        <View style={loginStyles.formContainer} >
          {/* keyboard avoid view */}

          <WhiteLogo />

          <Text style={loginStyles.title} >Login</Text>

          <Text style={loginStyles.label} >Email</Text>

          <TextInput
            placeholder='Ingrese su email'
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType='email-address'
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ]}

            selectionColor="white"

            onChangeText={(value) => onChange(value, 'email')}
            value={email}

            onSubmitEditing={onLogin}

            autoCapitalize='none'
            autoCorrect={false}
          />
          <TextInput
            placeholder='******'

            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ]}

            selectionColor="white"
            secureTextEntry

            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}

            autoCapitalize='none'
            autoCorrect={false}
          />

          {/* boton login */}
          <View
            style={loginStyles.buttonContainer}
          >

            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogin}
            >
              <Text style={loginStyles.buttonText} >Login</Text>
            </TouchableOpacity>

          </View>
          {/* crear una nueva cuentas */}
          <View style={loginStyles.newUserContainer} >

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => console.log('press')}

            >
              <Text style={loginStyles.buttonText}
                onPress={() => navigation.navigation.replace('RegisterScreen')}
              >Nueva cuenta </Text>

            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </>
  )
}



function removeError(): void {
  throw new Error('Function not implemented.');
}

