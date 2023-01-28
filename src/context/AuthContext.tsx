import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Usuario, LoginResponse, LoginData, RegisterData, ResponseError } from '../interfaces/appInterfaces';
import { AuthReducer, AuthState } from './AuthReducer';
import cafeApi from '../api/cafeAPi';
import { AxiosError } from "axios";

type AuthContextProp = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticate' | 'not-authenticate';
    singUp: ( registerData : RegisterData ) => void;
    singIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState : AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProp)

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(AuthReducer, authInicialState);

    useEffect(() => {
        checkToken();
    }, [])
    
    const checkToken = async () => {
        
        const token  = await AsyncStorage.getItem('token')

        // no token -> noautenticado
        if( !token) return dispatch({type:'notAuthenticated'})

        // validar token

        const resp = await cafeApi.get<LoginResponse>('/auth')

        if (resp.status !== 200){
            return dispatch({type: 'notAuthenticated'})
        }

        await AsyncStorage.setItem('token', resp.data.token);

        dispatch({
            type :'singUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        })

        await AsyncStorage.setItem('token', resp.data.token);

    }

    const singIn =  async ({correo, password}: LoginData) => {

        try{

            const { data } =  await cafeApi.post<LoginResponse>('/auth/login', {correo, password })

            dispatch({
                type :'singUp',
                payload: {
                    token: data.token,
                    user: data.usuario,
                }
            })

            await AsyncStorage.setItem('token', data.token);

        } catch(err: any) {
            console.log(err.response.data.msg )
            dispatch({
                type: 'addError', 
                payload: err.response.data.msg || 'Información incorrecta'
            })
        }

    };

    const singUp = async ({nombre, correo, password} : RegisterData) => {

        try{
            const {data} = await cafeApi.post<LoginResponse>('usuarios' , {nombre, correo, password})

            dispatch({
                type: 'singUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            })

            await AsyncStorage.setItem('token', data.token);

        }catch(err: ResponseError){
            console.log(err )
            dispatch({
                type: 'addError', 
                payload: err.response.data.errors[0].msg || 'Revise la información'
            })
        }
        
    };
    const logOut =  async () => {

        await AsyncStorage.removeItem('token');
        dispatch({type: 'logout'})

    };
    const removeError =  () => {
        dispatch({ type: 'removeError'})
    };


    return (
        <AuthContext.Provider value={{
            ...state,
            singIn,
            singUp,
            logOut,
            removeError
        }}>
            {children}
        </AuthContext.Provider>
    )
}
