import React, { FC, useState } from 'react';

import './RightBar.scss';

const RightBar: FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleBar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`right-bar ${expanded ? 'right-bar--expanded' : ''}`}>
      Right bar<button onClick={toggleBar}>{'<<'}</button>
    </div>
  );
};

export default RightBar;
