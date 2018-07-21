import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Aux from '../hoc/aux';
import Heading from './heading';

const Modal = ({ status, click, children }) => (
  <Aux>
    <div className={classNames('backdrop', status ? 'active' : '')} onClick={click} aria-hidden />
    <div className={classNames('modal', status ? 'active' : '')}>
      <ul className="modal__list">
        <Heading />
        {children}
      </ul>
    </div>
  </Aux>
);

Modal.propTypes = {
  status: PropTypes.bool,
  click: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  status: false,
  click: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
