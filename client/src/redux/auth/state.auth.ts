import { createSlice } from '@reduxjs/toolkit';

import { IUser, IAuthStore } from '../../models';

const UserEmptyState: IAuthStore = {
  userdata: {} as IUser,
  ok: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const authState = createSlice({
  name: 'auth',
  initialState: UserEmptyState,
  reducers: {
    _handleUserData: (state, action) => {
      return {
        ...state,
        userdata: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    },
    _handleStartAuth: (state) => {
      return { ...state, isLoading: true, error: null, ok: null };
    },
    _handleError: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
    _handleOk: (state, action) => {
      return { ...state, ok: action.payload };
    },
  },
});

export const { _handleUserData, _handleError, _handleStartAuth, _handleOk } =
  authState.actions;
