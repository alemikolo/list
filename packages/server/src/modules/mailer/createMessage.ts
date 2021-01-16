import { renderToStaticMarkup } from 'react-dom/server';

import { MailData, MessageData } from './types';
import Template from './templates/Template';

const html = (template: string): string => `
  <!doctype html>
  <html>
    ${template}
  </html>
  `;

const createMessage = ({ data, recipient, subject }: MailData): MessageData => {
  const newHtml = html(renderToStaticMarkup(Template(data)));

  return { html: newHtml, recipient, subject };
};

export default createMessage;
