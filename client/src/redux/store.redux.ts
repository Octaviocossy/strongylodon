import { configureStore } from '@reduxjs/toolkit';

import { IAppStore } from '../models';

import { authState } from '.';

const Store = configureStore<IAppStore>({
  reducer: {
    auth: authState.reducer,
  },
});

export default Store;
