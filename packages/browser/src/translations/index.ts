import en from './locales/en.json';
import pl from './locales/pl.json';

export const polyfillIntl = async (): Promise<void> => {
  if (!Intl.PluralRules) {
    await import('@formatjs/intl-pluralrules/polyfill');
    await import('@formatjs/intl-pluralrules/locale-data/en');
    await import('@formatjs/intl-pluralrules/locale-data/pl');
  }
  if (!Intl.RelativeTimeFormat) {
    await import('@formatjs/intl-relativetimeformat/polyfill');
    await import('@formatjs/intl-relativetimeformat/locale-data/en');
    await import('@formatjs/intl-relativetimeformat/locale-data/pl');
  }
};

export default { en, pl };
