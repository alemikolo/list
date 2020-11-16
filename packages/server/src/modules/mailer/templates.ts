import { MailData, ResetPasswordMailData, SignUpMailData } from './types';

const createMessage = <T extends MailData>(template: T[0]) => {
  return (data: T[1]) => {
    const mailTemplate = templates[template];

    return mailTemplate(data);
  };
};
