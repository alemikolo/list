import React from 'react';
import ReactDOM from 'react-dom';
// import 'ts-polyfill';

import Apollo from 'app/Apollo';
import App from 'app/App';
import { polyfillIntl } from 'translations';

import './scss/index.scss';

polyfillIntl();

ReactDOM.render(
  <Apollo>
    <App />
  </Apollo>,
  document.getElementById('root')
);
