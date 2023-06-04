export const parseCookiesToObject = (cookies: string) => {
  return Object.fromEntries(
    cookies
      ?.split(';')
      .map((item) => item.replace('=', ':'))
      ?.map((item) => item.trim().split(':')) || []
  );
};
