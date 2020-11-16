import SendGridMail from '@sendgrid/mail';

import EmailTemplate from './enums';

export type SendMailResult = ReturnType<typeof SendGridMail.send>;
export interface MailTemplate {
  subject: string;
  html: string;
}

interface User {
  name?: string;
  email: string;
  url?: string;
}

interface Task {
  name: string;
  url?: string;
}

interface Project {
  name: string;
  url?: string;
}

interface Organization {
  name: string;
  url?: string;
}

export interface MessageData {
  recipient: string;
  subject: string;
  html: string;
}
export interface Data {
  doer: User;
  organization: Organization;
  project: Project;
  recipient: string;
  redirectUrl: string;
  task: Task;
  user: User;
}

export type AuthMailData = Pick<Data, 'recipient' | 'redirectUrl' | 'user'>;

export type MessageCreator<T> = (data: T) => MessageData;

export type Send = (messageData: MessageData) => SendMailResult;

export type SignUpMail = [
  EmailTemplate.SignUp,
  { recipient: string; redirectUrl: string; user: User }
];

export type ResetPasswordMail = [
  EmailTemplate.ResetPassword,
  { recipient: string; redirectUrl: string; user: User }
];

export type Mail = SignUpMail | ResetPasswordMail;
