import { Locale } from '@shared/types';

declare global {
  namespace Express {
    interface Request {
      locale: Locale;
    }
  }
}
