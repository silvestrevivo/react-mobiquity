import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Standing = ({ item, winnerPerYear }) => (
  <li
    className={classNames('standing', item.round === winnerPerYear.round ? 'standing__winner' : '')}
  >
    <p>{item.round}</p>
    <p>
      {`${item.Results[0].Driver.givenName} ${item.Results[0].Driver.familyName}`} /{' '}
      <span>{item.Results[0].Constructor.constructorId}</span>
    </p>
    <p>{item.raceName}</p>
    <p>{item.date}</p>
  </li>
);

Standing.propTypes = {
  item: PropTypes.object,
  winnerPerYear: PropTypes.object,
};

Standing.defaultProps = {
  item: {},
  winnerPerYear: {},
};

export default Standing;
