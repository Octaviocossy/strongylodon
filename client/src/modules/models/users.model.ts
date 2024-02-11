export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string | null;
  last_login_at: string | null;
  password?: string;
}

export type TUserSignin = Pick<User, 'email' | 'password'>;
