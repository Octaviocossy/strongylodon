import type { BoomError, User } from '@/models';

export interface AuthStore {
  userdata: User;
  isLoading: boolean;
  ok: boolean | null;
  isAuthenticated: boolean;
  error: BoomError | null;
}
