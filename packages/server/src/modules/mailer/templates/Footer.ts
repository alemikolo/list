import { Cell, Link, Paragraph, Row } from './components';
import environment from '@env/env';

const {
  APP_NAME,
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_NAME,
  COMPANY_PHONE
} = environment;
const address = COMPANY_ADDRESS.replace(/_/g, ' ');
const phone = COMPANY_PHONE.replace(/_/g, ' ');

const Footer = () =>
  Row()(
    Cell()(
      Paragraph()(`${APP_NAME} is a service provided by ${COMPANY_NAME}`),
      Paragraph()(`Address: ${address}.`),
      Paragraph()(
        'Contact: ',
        Link({ href: `tel:${phone}` })(phone),
        ' | ',
        Link({ href: `mailto:${COMPANY_EMAIL}` })(COMPANY_EMAIL)
      )
    )
  );

export default Footer;
