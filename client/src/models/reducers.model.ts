import { IBoomError, IUser } from '.';

export interface IAppStore {
  auth: IAuthStore;
}

export interface IAuthStore {
  userdata: IUser;
  isLoading: boolean;
  ok: boolean | null;
  isAuthenticated: boolean;
  error: IBoomError | null;
}
