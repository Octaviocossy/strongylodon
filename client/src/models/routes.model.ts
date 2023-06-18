export enum EPublicRoutes {
  SIGNIN = '/signin',
  SIGNUP = '/signup',
}

export enum ESecureRoutes {
  DASHBOARD = '/secure/dashboard',
}

export const secureRoutesArray = Object.values(ESecureRoutes) as string[];
