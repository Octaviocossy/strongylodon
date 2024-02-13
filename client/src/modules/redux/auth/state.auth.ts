import type { AuthStore } from '@/redux';
import type { BoomError, User } from '@/models';

import { createSlice } from '@reduxjs/toolkit';

const UserEmptyState: AuthStore = {
  userdata: {} as User,
  ok: null,
  isLoading: false,
  isAuthenticated: false,
  boom_error: null,
  generic_error: null,
};

export const authState = createSlice({
  name: 'auth',
  initialState: UserEmptyState,
  reducers: {
    _handleUserData: (state, action) => {
      return {
        ...state,
        userdata: action.payload as User,
        isAuthenticated: true,
        isLoading: false,
      };
    },
    _handleStartAuth: (state) => {
      return { ...state, isLoading: true, boom_error: null, ok: null, generic_error: null };
    },
    _handleError: (state, action) => {
      return { ...state, isLoading: false, boom_error: action.payload as BoomError | null };
    },
    _handleGenericError: (state, action) => {
      return { ...state, isLoading: false, generic_error: action.payload as string | null };
    },
    _handleOk: (state, action) => {
      return { ...state, ok: action.payload as boolean };
    },
  },
});

export const { _handleUserData, _handleError, _handleStartAuth, _handleOk, _handleGenericError } = authState.actions;
