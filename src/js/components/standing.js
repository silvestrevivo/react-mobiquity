import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Standing = ({ item, winnerPerYear }) => (
  <li className={classNames('list', item.round === winnerPerYear.round ? 'winner' : '')}>
    <p>Round: {item.round}</p>
    <p>
      Winner: {`${item.Results[0].Driver.givenName} ${item.Results[0].Driver.familyName}`} /{' '}
      <span>{item.Results[0].Constructor.constructorId}</span>
    </p>
    <p>Circuit: {item.raceName}</p>
    <p>Date: {item.date}</p>
  </li>
);

Standing.propTypes = {
  item: PropTypes.object,
  winnerPerYear: PropTypes.string,
};

Standing.defaultProps = {
  item: false,
  winnerPerYear: false,
};

export default Standing;
