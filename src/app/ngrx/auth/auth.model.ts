// actions, login
export interface AuthState {

    email: string | null;
    name: string | null;
    isLoggedIn: Boolean;
    isAdmin: string | null;
    
}

export const initialAuthState: AuthState = {

    email: null,
    name: null,
    isLoggedIn: false,
    isAdmin: null

}