import SendGridMail, { MailDataRequired } from '@sendgrid/mail';

import environment from '@env/env';
import {
  Mail,
  MessageData,
  ResetPasswordMail,
  Send,
  // SendMailResult,
  SignUpMail
} from './types';
import EmailTemplate from './enums';
import SignUpConfirmation from './templates/SignUpConfirmation';
import ResetPasswordConfirmation from './templates/ResetPasswordConfirmation';
import createMessage from './createMessage';

const { SENDER_EMAIL, SENDGRID_API_KEY } = environment;

SendGridMail.setApiKey(SENDGRID_API_KEY);

const templates = {
  [EmailTemplate.SignUp]: SignUpConfirmation,
  [EmailTemplate.ResetPassword]: ResetPasswordConfirmation
};

const sendMessage = (send: Send) => <T extends Mail>(template: T[0]) => (
  data: T[1]
) => {
  const mailTemplate = templates[template];

  return send(createMessage(mailTemplate(data)));
};

const send = async (messageData: MessageData): Promise<any> => {
  const { recipient, subject, html } = messageData;
  const message: MailDataRequired = {
    from: SENDER_EMAIL,
    html,
    subject,
    to: recipient
  };
  // eslint-disable-next-line no-console
  console.log(message);
  //return SendGridMail.send(message);
};

const sendMail = sendMessage(send);

export const sendSignUpConfirmation = sendMail<SignUpMail>(
  EmailTemplate.SignUp
);

export const sendResetPasswordConfirmation = sendMail<ResetPasswordMail>(
  EmailTemplate.ResetPassword
);
