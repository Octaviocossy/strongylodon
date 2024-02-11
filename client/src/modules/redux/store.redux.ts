import type { AppStore } from '@/redux';

import { configureStore } from '@reduxjs/toolkit';

import { authState } from '@/redux';

export const Store = configureStore<AppStore>({
  reducer: {
    auth: authState.reducer,
  },
});
