import type { BoomError, User } from '@/models';

export interface AuthStore {
  userdata: User;
  isLoading: boolean;
  ok: boolean | null;
  isAuthenticated: boolean;
  boom_error: BoomError | null;
  generic_error: string | null;
}
