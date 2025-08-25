import { createAction, props } from "@ngrx/store";

export const  login = createAction (

    '[Auth] Login',
     props<{email:string; name:string, admin: string}>()

)  

export const  loginSuccess = createAction (

    '[Auth] Login Success',
    props<{user :{email:string; name:string, admin: string}}>()

);


export const  loginFailure = createAction (

    '[Auth] Login Failure',
     props<{error:string}>()

);

export const  logout = createAction (

    '[Auth] Logout',
     props<{email:string; name:string, admin: string, logged:boolean}>()

)  

