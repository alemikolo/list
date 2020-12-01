import SendGridMail from '@sendgrid/mail';
import { ReactNode } from 'react';

import EmailTemplate from './enums';

export type SendMailResult = ReturnType<typeof SendGridMail.send>;
export interface MailTemplate {
  subject: string;
  html: string;
}

interface User {
  avatar?: string;
  email: string;
  name?: string;
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

export interface MailContent {
  content: ReactNode[];
  title: string;
}

export interface MailData {
  data: MailContent;
  recipient: string;
  subject: string;
}

export interface MessageData {
  html: string;
  recipient: string;
  subject: string;
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

export type MailDataCreator<T> = (data: T) => MailData;

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
