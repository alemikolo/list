import React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from 'react-easy-chart';
import colors from '../../../utils/colors';
import classes from './Chart.module.scss';

const Chart = (props) => {
  const { color, bought, total } = props;
  const chartColor = colors[color];

  return (
    <div className={classes.Chart}>
      <PieChart
        size={50}
        innerHoleSize={40}
        data={
          [{
            key: 'kupione',
            value: bought,
            color: chartColor,
          },
          {
            key: 'nie-kupione',
            value: (total - bought),
            color: '#dce7c5',
          }]
        }
      />
      <p
        style={{ color: `${chartColor}` }}
      >
        {`${bought}/${total}`}
      </p>
    </div>
  );
};

Chart.defaultProps = { color: 'Black' };

Chart.propTypes = {
  bought: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  color: PropTypes.oneOf([
    'Pink',
    'Purple,',
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

export default Chart;
