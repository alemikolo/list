import { Body, Cell, Heading, Row, Table, Wrapper } from './components';
import { MailContent } from '../types';
import Footer from './Footer';
import Header from './Header';

const Template = ({ content, locale, title }: MailContent) =>
  Body()(
    Table()(
      Header({ key: 'Header' }),
      Wrapper({ key: 'Content' })(
        Row({ key: 'Title' })(Cell()(Heading()(title))),
        Row({ key: 'Content' })(Cell()(content))
      ),
      Footer({ key: 'footer', locale })
    )
  );

export default Template;
