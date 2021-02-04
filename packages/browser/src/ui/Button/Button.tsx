import React, { ComponentPropsWithoutRef, FC, forwardRef } from 'react';

import { classNames } from 'utils';

import './Button.scss';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  className?: string;
  danger?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  loading?: boolean;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const AnimatedGradient: FC = ({ children }) => (
  <div className="animated-gradient">
    <div className="animated-gradient__active"></div>
    <div className="animated-gradient__hover"></div>
    <div className="animated-gradient__content">{children}</div>
  </div>
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      danger,
      disabled: sourceDisabled,
      error,
      label,
      loading,
      onClick,
      primary: sourcePrimary,
      secondary: sourceSecondary,
      success,
      title,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const disabled = sourceDisabled || loading;
    const secondary = sourceSecondary && !sourcePrimary;
    const primary = sourcePrimary || !secondary;

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (loading || !onClick) {
        return;
      }

      onClick(event);
    };

    const buttonClassNames = classNames('button', className, {
      primary,
      secondary,
      loading,
      danger,
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
        <div className="button__content">{children}</div>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
