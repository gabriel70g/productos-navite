import { Usuario } from '../interfaces/appInterfaces';

 export interface AuthState {
    status: 'checking' | 'authenticate' | 'not-authenticate';
    token: string|null;
    errorMessage: string| null;
    user: Usuario | null;
 }

 type AuthAction = 
 | {type: 'singUp', payload: {token: string, user: Usuario}}
 | {type: 'addError', payload : string}
 | {type: 'removeError'}
 | {type: 'notAuthenticated'}
 | {type: 'logout'}


 export const AuthReducer = (state: AuthState, action: AuthAction) : AuthState => {
 
    switch (action.type){
        case 'addError':
             return {
                ...state,
                user: null,
                status: 'not-authenticate',
                token: null,
                errorMessage: action.payload
             }
             case 'removeError':
                return {
                    ...state,
                    errorMessage: ''
                }
                case 'singUp':
                    return {
                        ...state,
                        errorMessage: '',
                        status: 'authenticate',
                        token: action.payload.token,
                        user: action.payload.user,
                    }

                    case 'logout':
                    case 'notAuthenticated':
                        return {
                            ...state,
                            status: 'not-authenticate',
                            token: null,
                            user: null,
                        }

             default:
                return state
    }
 }
 