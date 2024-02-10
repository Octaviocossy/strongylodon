export enum EPublicRoutes {
  SIGNIN = '/auth/signin',
  SIGNUP = '/auth/signup',
  SECURE = '/secure',
}

export enum ESecureRoutes {
  DASHBOARD = '/dashboard',
  SUPERBUY = '/super_buy',
}

export const secureRoutesArray = Object.values(ESecureRoutes) as string[];
