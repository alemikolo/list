import React, { ComponentPropsWithoutRef, forwardRef } from 'react';

import { classNames } from 'utils';

import './Button.scss';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  loading?: boolean;
  success?: boolean;
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: sourceDisabled,
      error,
      label,
      loading,
      onClick,
      success,
      title,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const disabled = sourceDisabled || loading;

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (loading || !onClick) {
        return;
      }

      onClick(event);
    };

    const buttonClassNames = classNames('button', {
      loading,
      disabled,
      error,
      success
    });

    return (
      <button
        {...rest}
        aria-label={label}
        className={buttonClassNames}
        disabled={disabled}
        onClick={handleClick}
        ref={ref}
        title={title}
        type={type}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
