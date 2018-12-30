import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';
import Chart from '../../UI/Chart/Chart';
import Button from '../../UI/Button/Button';
import colors from '../../../utils/colors';
import classes from './ShoppingListItem.module.scss';

const ShoppingListItem = (props) => {
  const { name, color, bought, type, total, shared } = props;
  const listClasses = [classes.ListItem];
  let listType = 'lista prosta';
  if (type === 'complex') {
    listClasses.push(classes.ComplexList);
    listType = 'lista złożona';
  }

  return (
    <div
      className={listClasses.join(' ')}
      style={{ borderColor: `${colors[color]}` }}
    >
      <h2
        style={{ color: `${colors[color]}` }}
      >
        {capitalize(name)}
      </h2>
      <Chart
        bought={bought}
        total={total}
        color={color}
      />
      <Button
        styled='list-options'
        label='opcje'
        clicked={() => { console.log('list options'); }}
      >
        ...
      </Button>
      <hr style={{ borderTopColor: `${colors[color]}` }} />
      <div className={classes.Notes}>
        <span>{listType}</span>
        {shared && <span>udostępniona</span>}
      </div>
    </div>
  );
};

ShoppingListItem.defaultProps = {
  type: 'simple',
  color: 'Black',
};

ShoppingListItem.propTypes = {
  name: PropTypes.string.isRequired,
  bought: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  shared: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['simple', 'complex']),
  color: PropTypes.oneOf([
    'Pink',
    'Purple',
    'Navy',
    'Blue',
    'Green',
    'Lime',
    'Yellow',
    'Gold',
    'Orange',
    'Red',
    'Brown',
    'Grey',
    'Black',
  ]),
};

export default ShoppingListItem;
