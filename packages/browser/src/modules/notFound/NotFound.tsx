import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

const NotFound: FC = () => (
  <>
    <h2>
      <FormattedMessage id="not-found" />
    </h2>
    <div>
      <p>
        <FormattedMessage id="not-found.message" />
      </p>
    </div>
  </>
);

export default NotFound;
