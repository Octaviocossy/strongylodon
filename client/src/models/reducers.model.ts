import { ICustomError, IUser } from '.';

export interface IAppStore {
  auth: IAuthStore;
}

export interface IAuthStore {
  userdata: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: ICustomError | null;
}
