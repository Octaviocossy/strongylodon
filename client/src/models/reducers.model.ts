import { IUser } from '.';

export interface IAppStore {
  auth: IAuthStore;
}

export interface IAuthStore {
  userdata: IUser;
  isAuthenticated: boolean;
}
