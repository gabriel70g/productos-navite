import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { Alert } from 'react-native'
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'
import { loginStyles } from '../theme/LoginTheme'
import { AuthContext } from '../context/AuthContext';
import { RegisterData } from '../interfaces/appInterfaces';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = (  {navigation}   : Props) => {

  const {singUp , errorMessage, removeError} = useContext(AuthContext)

  const {email, password, name, onChange} = useForm({
    name: '',
    email: '',
    password: ''
  })

  const onRegister = () => {
    console.log({name, email, password});
    Keyboard.dismiss();
    singUp({correo:email, nombre: name, password})
    
  }

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Registro incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError
      }
    ])

  }, [errorMessage])


  return (
    <>
      {/* background */}

      <KeyboardAvoidingView style={{flex:1, backgroundColor:'#5856d6'}} 
        behavior= {(Platform.OS === 'ios') ? 'padding': 'height'}
      >

      
      <View style={loginStyles.formContainer} >
        {/* keyboard avoid view */}

        <WhiteLogo />

        <Text style={loginStyles.title} >Registro</Text>

        <Text style={loginStyles.label} >Email</Text>

        <TextInput
          placeholder='Ingrese su nombre'
          placeholderTextColor="rgba(255,255,255,0.4)"
          underlineColorAndroid="white"
          style={[
            loginStyles.inputField,
            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
          ]}

          selectionColor="white"

          onChangeText={(value) => onChange(value, 'name')}
          value={name}

          onSubmitEditing={onRegister}

          autoCapitalize='words'
          autoCorrect={false}
        />

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

          onSubmitEditing={onRegister}

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
          onSubmitEditing={onRegister}
 
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
            onPress={onRegister}
          >
            <Text style={loginStyles.buttonText} >Crear cuenta</Text>
          </TouchableOpacity>

        </View>
        {/* crear una nueva cuentas */}
        

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log('press')}
            style={
              loginStyles.buttonReturn
            }

          >
            <Text style={loginStyles.buttonText} 
              onPress={() => navigation.replace('LoginScreen')}
            >Login</Text>

          </TouchableOpacity>
        

      </View>
      </KeyboardAvoidingView>
    </>
  )
}
