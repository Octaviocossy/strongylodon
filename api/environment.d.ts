// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv {
    [key: string]: undefined;
    PORT: number;
    NODE_ENV: string;
    CLIENT_URL: string;
    JWT_SECRET: string;
    DATABASE_URL: string;
    NODEMAILER_EMAIL: string;
    NODEMAILER_PASSWORD: string;
  }
}
