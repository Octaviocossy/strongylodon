import { createSlice } from '@reduxjs/toolkit';

import { IUser, IAuthStore } from '../../models';

const UserEmptyState: IAuthStore = {
  userdata: {} as IUser,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const authState = createSlice({
  name: 'auth',
  initialState: UserEmptyState,
  reducers: {
    _handleUserData: (_, action) => {
      return {
        userdata: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    },
    _handleStartLogin: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    _handleError: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
  },
});

export const { _handleUserData, _handleError, _handleStartLogin } =
  authState.actions;
