import React, { forwardRef, ComponentPropsWithoutRef } from 'react';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  className?: string;
  disabled?: boolean;
  label?: string;
  loading?: boolean;
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: sourceDisabled,
      label,
      loading,
      onClick,
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

    return (
      <button
        {...rest}
        aria-label={label}
        className={`button ${className ? className : ''}`}
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
