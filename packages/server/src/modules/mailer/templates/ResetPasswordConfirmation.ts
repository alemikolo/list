import getIntl from '@translations/intl';
import { AuthMailData, MailDataCreator } from '../types';
import { Link, Paragraph } from './components';

const ResetPasswordConfirmation: MailDataCreator<AuthMailData> = mailData => {
  const {
    locale,
    recipient,
    redirectUrl,
    user: { email }
  } = mailData;
  const { formatMessage: f } = getIntl(locale);

  const title = f({ id: 'mail.reset-password.title' });
  const content = Paragraph()(
    f({ id: 'mail.reset-password.message' }, { email }),
    Link({ href: redirectUrl })(f({ id: 'mail.reset-password.message' }))
  );

  const data = { content, locale, title };

  return { data, recipient, subject: title };
};

export default ResetPasswordConfirmation;
