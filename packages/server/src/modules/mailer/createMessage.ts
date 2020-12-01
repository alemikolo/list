import { renderToStaticMarkup } from 'react-dom/server';

import { MailData, MessageData } from './types';
import Template from './templates/Template';

const html = (template: string, title: string): string => `
  <!doctype html>
  <html>
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>${title}</title>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    ${template}
  </html>
  `;

const createMessage = ({ data, recipient, subject }: MailData): MessageData => {
  const newHtml = html(renderToStaticMarkup(Template(data)), subject);

  return { html: newHtml, recipient, subject };
};

export default createMessage;
