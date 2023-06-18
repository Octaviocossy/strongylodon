import { useSelector } from 'react-redux';

import { IAppStore, IAuthStore } from '../../models';

const useAuthSelector = () => {
  return useSelector<IAppStore, IAuthStore>((state) => state.auth);
};

export default useAuthSelector;
