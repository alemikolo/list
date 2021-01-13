import React, { forwardRef, useState } from 'react';

import Button, { ButtonProps } from './Button';

const AsyncButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading: loadingProp, onClick, ...rest }, ref) => {
    const [loadingState, setLoading] = useState(false);
    const loading = loadingState || loadingProp;

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
      <Button loading={loading} onClick={handleClick} ref={ref} {...rest}>
        {loading ? '...' : children}
      </Button>
    );
  }
);

AsyncButton.displayName = 'AsyncButton';

export default AsyncButton;
