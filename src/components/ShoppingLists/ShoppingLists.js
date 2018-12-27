import React from 'react';
import PropTypes from 'prop-types';
import ShoppinListItem from './ShoppingListItem/ShoppingListItem';

const ShoppingLists = (props) => {
  const { shoppingLists } = props;
  return (
    <ul>
      {shoppingLists.map(list => (
        <li key={list.name}>
          <ShoppinListItem
            name={list.name}
            color={list.color}
            bought={list.bought}
            type={list.type}
            total={list.total}
            shared={list.shared}
          />
        </li>
      ))}
    </ul>
  );
};

ShoppingLists.propTypes = { shoppingLists: PropTypes.arrayOf(PropTypes.object).isRequired };

export default ShoppingLists;
