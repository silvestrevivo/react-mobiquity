import React from 'react';
import PropTypes from 'prop-types';

const YearButton = ({ year, click }) => (
  <button type="button" onClick={click} className="btn-year">
    {year}
  </button>
);

YearButton.propTypes = {
  year: PropTypes.string,
  click: PropTypes.func,
};

YearButton.defaultProps = {
  year: '',
  click: PropTypes.func,
};

export default YearButton;
