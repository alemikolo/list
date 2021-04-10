import { AuthMailData, MailDataCreator } from '../types';
import { Link, Paragraph } from './components';

const ResetPasswordConfirmation: MailDataCreator<AuthMailData> = mailData => {
  const {
    recipient,
    redirectUrl,
    user: { email }
  } = mailData;
  const subject = 'Reset your password in Handle It';
  const title = 'Reset your password in Handle It';
  const content = Paragraph()(
    `Hello ${email}. You told us that you forgot your password. If that sounds right use the following link to set the new one: `,
    Link({ href: redirectUrl })('Reset password.')
  );

  const data = { content, title };

  return { data, recipient, subject };
};

export default ResetPasswordConfirmation;
