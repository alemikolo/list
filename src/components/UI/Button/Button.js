import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.scss';

const Button = (props) => {
  const { type, styled, label, children, disabled, clicked } = props;
  const styles = [classes.Button];
  if (classes[styled]) {
    styles.push(classes[styled]);
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={clicked}
      className={styles.join(' ')}
      title={label}
      aria-label={label}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
};

Button.propTypes = {
  type: PropTypes.oneOf(['sumbit', 'reset', 'button']),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  styled: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Button;
