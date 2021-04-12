import { NextFunction, Request, Response } from 'express';

import { Locale } from '@shared/types';

export const localeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const {
    cookies: { locale }
  } = req;

  const locales = ['en', 'pl'];

  if (locales.includes(locale)) {
    req.locale = locale;

    return next();
  }

  const acceptedLanguage = req.acceptsLanguages('en', 'pl');

  if (acceptedLanguage) {
    req.locale = acceptedLanguage as Locale;
  } else {
    req.locale = 'en';
  }

  next();
};
