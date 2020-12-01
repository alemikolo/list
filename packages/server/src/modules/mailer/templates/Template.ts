import {
  Body,
  Cell,
  Heading,
  Paragraph,
  Row,
  Table,
  Wrapper
} from './components';
import { MailContent } from '../types';
import Footer from './Footer';
import Header from './Header';

const Template = ({ title, content }: MailContent) =>
  Body()(
    Table()(
      Header(),
      Wrapper()(
        Row()(Cell()(Heading()(title))),
        Row()(Cell()(Paragraph()(content)))
      ),
      Footer()
    )
  );

export default Template;
