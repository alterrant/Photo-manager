import { SERVICES } from './constants';

export type EmailPass = {
  email: string;
  password: string;
};

export type OAuthService = typeof SERVICES[keyof typeof SERVICES];
