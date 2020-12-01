import { Cell, Link, Paragraph, Row } from './components';
import environment from '@env/env';

const { APP_NAME, BASE_URL } = environment;

const Header = () =>
  Row()(Cell()(Paragraph()(Link({ href: BASE_URL })(APP_NAME))));

export default Header;
