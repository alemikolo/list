import { AuthMailData, MailDataCreator } from '../types';
import { Paragraph } from './components';

const ResetPasswordConfirmation: MailDataCreator<AuthMailData> = mailData => {
  const { recipient } = mailData;
  const subject = 'title';
  const content = Paragraph()(' some test email content');
  const title = 'mail title';
  const data = { content, title };

  return { data, recipient, subject };
};

export default ResetPasswordConfirmation;
