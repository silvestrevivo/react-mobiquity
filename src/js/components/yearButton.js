import React from 'react';
import PropTypes from 'prop-types';

const YearButton = ({ year, click }) => (
  <button type="button" onClick={click} className="year">
    {year}
  </button>
);

YearButton.propTypes = {
  year: PropTypes.string,
  click: PropTypes.func,
};

YearButton.defaultProps = {
  year: false,
  click: false,
};

export default YearButton;
