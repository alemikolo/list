import React from 'react';
import PropTypes from 'prop-types';

const ShoppingListItem = (props) => {
  const { name, color, bought, type, total, shared } = props;
  return (
    <div>
      <h2>{name}</h2>
      <p>{`${color}, ${type}`}</p>
      <p>{`${bought}/${total}`}</p>
      <hr />
      {shared
        && <span> udostępniona</span>
      }
    </div>
  );
};

ShoppingListItem.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  bought: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  shared: PropTypes.bool.isRequired,
};

export default ShoppingListItem;
