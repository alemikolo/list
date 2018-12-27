import React from 'react';
import Button from '../UI/Button/Button';
import classes from './Toolbar.module.scss';

const Toolbar = () => (
  <header>
    <div className={classes.Header}>
      <h1>Lista zakupów</h1>
      <div>
        <Button
          type='button'
          styled='Confirm'
          clicked={() => { console.log('login'); }}
          label='login'
        >
          log in
        </Button>
        <Button
          type='button'
          styled='Confirm'
          clicked={() => { console.log('menu'); }}
          label='menu'
        >
          menu
        </Button>
      </div>
    </div>
  </header>
);

export default Toolbar;
