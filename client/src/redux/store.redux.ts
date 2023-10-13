import { configureStore } from '@reduxjs/toolkit';
import { authState } from '@redux';
import { IAppStore } from '@models';

const Store = configureStore<IAppStore>({
  reducer: {
    auth: authState.reducer,
  },
});

export default Store;
