import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.name + '/' + state.isAdmin
);

export const selectEmail = createSelector(
  selectAuthState,
  (state: AuthState) => state.email
);

export const selectLogged = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoggedIn
);

export const selectAdmin = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAdmin
);

