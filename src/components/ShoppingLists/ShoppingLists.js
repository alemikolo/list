import React from 'react';
import PropTypes from 'prop-types';
import ShoppinListItem from './ShoppingListItem/ShoppingListItem';
import classes from './ShoppingLists.module.scss';

const ShoppingLists = (props) => {
  const { shoppingLists } = props;
  return (
    <ul className={classes.ShoppingLists}>
      {shoppingLists.map(list => (
        <li
          key={list.name}
          className={classes.ShoppingListsItem}
        >
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

ShoppingLists.propTypes = {
  shoppingLists: PropTypes
    .arrayOf(PropTypes.object)
    .isRequired,
};

export default ShoppingLists;
