import { createSlice } from '@reduxjs/toolkit';

import { IUser, IAuthStore } from '../../models';

const UserEmptyState: IAuthStore = {
  userdata: {} as IUser,
  isAuthenticated: false,
};

export const authState = createSlice({
  name: 'auth',
  initialState: UserEmptyState,
  reducers: {
    _handleUserData: (_, action) => {
      return { userdata: action.payload, isAuthenticated: true };
    },
    _handleIsAuthenticated: (state, action) => {
      return { ...state, isAuthenticated: action.payload };
    },
  },
});

export const { _handleUserData, _handleIsAuthenticated } = authState.actions;
