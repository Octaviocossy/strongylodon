export enum EPublicRoutes {
  SIGNIN = '/signin',
  SIGNUP = '/signup',
  SECURE = '/secure',
}

export enum ESecureRoutes {
  DASHBOARD = '/dashboard',
}

export const secureRoutesArray = Object.values(ESecureRoutes) as string[];
