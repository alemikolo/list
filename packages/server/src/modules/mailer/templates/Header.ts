import { Cell, Link, Paragraph, Row } from './components';
import environment from '@env/env';

const { APP_NAME, APP_URL } = environment;

const Header = () =>
  Row()(Cell()(Paragraph()(Link({ href: APP_URL })(APP_NAME))));

export default Header;
