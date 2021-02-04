import React, { forwardRef, useState } from 'react';

import Loader, { LoaderTheme } from 'ui/Loader';
import { classNames } from 'utils';
import Button, { ButtonProps } from './Button';

import './AsyncButton.scss';

const AsyncButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, danger, loading: loadingProp, onClick, secondary, ...rest },
    ref
  ) => {
    const [loadingState, setLoading] = useState(false);
    const loading = loadingState || loadingProp;
    const theme = secondary ? LoaderTheme.Dark : LoaderTheme.Light;
    const finalTheme = danger && secondary ? LoaderTheme.Danger : theme;

    const handleClick = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (loading || !onClick) {
        return;
      }

      setLoading(true);

      try {
        await onClick(event);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Button
        danger
        loading={loading}
        onClick={handleClick}
        ref={ref}
        secondary={secondary}
        {...rest}
      >
        {loading && <Loader theme={finalTheme} />}
        <span className={classNames('button__box', { loading })}>
          {children}
        </span>
      </Button>
    );
  }
);

AsyncButton.displayName = 'AsyncButton';

export default AsyncButton;
