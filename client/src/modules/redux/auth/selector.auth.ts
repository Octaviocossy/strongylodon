import type { AppStore, AuthStore } from '@/redux';

import { useSelector } from 'react-redux';

export const useAuthSelector = () => {
  return useSelector<AppStore, AuthStore>((state) => state.auth);
};
