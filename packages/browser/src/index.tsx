import React from 'react';
import ReactDOM from 'react-dom';
// import 'ts-polyfill';

import Apollo from 'app/components/Apollo';
import App from 'app/App';

import './app/scss/index.scss';

ReactDOM.render(
  <Apollo>
    <App />
  </Apollo>,
  document.getElementById('root')
);
