import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.model";
import * as AuthActions from './auth.actions'


export const authReducer = createReducer(
initialAuthState,

on(AuthActions.login,(state, {email, name, admin})=>({
    ...state, 
    email:email,
    name:name,
    isAdmin: admin,
    isLoggedIn:true
})),

on(AuthActions.logout,(state)=>({
    ...state, 
    email:null,
    name:null,
    isAdmin: null,
    isLoggedIn:false
})),

on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),

);