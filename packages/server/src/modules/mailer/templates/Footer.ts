import environment from '@env/env';
import { ComponentProps } from '@modules/mailer/types';
import {
  Cell,
  Link,
  Paragraph,
  Row
} from '@modules/mailer/templates/components';

const {
  APP_NAME,
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_NAME,
  COMPANY_PHONE
} = environment;
const address = COMPANY_ADDRESS.replace(/_/g, ' ');
const phone = COMPANY_PHONE.replace(/_/g, ' ');

const Footer = (props: ComponentProps) =>
  Row(props)(
    Cell()(
      Paragraph({ key: 'App Info' })(
        `${APP_NAME} is a service provided by ${COMPANY_NAME}`
      ),
      Paragraph({ key: 'Address' })(`Address: ${address}.`),
      Paragraph({ key: 'Contact' })(
        `Contact: ${Link({ href: `tel:${phone}` })(phone)} | ${Link({
          href: `mailto:${COMPANY_EMAIL}`
        })(COMPANY_EMAIL)}`
      )
    )
  );

export default Footer;
