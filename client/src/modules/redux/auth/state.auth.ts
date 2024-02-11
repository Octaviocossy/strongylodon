import type { AuthStore } from '@/redux';
import type { BoomError, User } from '@/models';

import { createSlice } from '@reduxjs/toolkit';

const UserEmptyState: AuthStore = {
  userdata: {} as User,
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
        userdata: action.payload as User,
        isAuthenticated: true,
        isLoading: false,
      };
    },
    _handleStartAuth: (state) => {
      return { ...state, isLoading: true, error: null, ok: null };
    },
    _handleError: (state, action) => {
      return { ...state, isLoading: false, error: action.payload as BoomError | null };
    },
    _handleOk: (state, action) => {
      return { ...state, ok: action.payload as boolean };
    },
  },
});

export const { _handleUserData, _handleError, _handleStartAuth, _handleOk } = authState.actions;
