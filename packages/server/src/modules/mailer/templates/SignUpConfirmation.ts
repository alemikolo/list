import { AuthMailData, MailDataCreator } from '../types';
import { Link, Paragraph } from './components';

const SignUpConfirmation: MailDataCreator<AuthMailData> = mailData => {
  const {
    recipient,
    redirectUrl,
    user: { email }
  } = mailData;
  const subject = 'Confirm registration in Handle It';
  const title = 'Confirm registration in Handle It';
  const content = Paragraph()(
    `Hello ${email}. Welcome on board. Use the following link to confirm your registration: `,
    Link({ href: redirectUrl })('Confirm registration.')
  );
  const data = { content, title };

  return { data, recipient, subject };
};

export default SignUpConfirmation;
