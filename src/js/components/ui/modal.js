import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Aux from '../hoc/aux';

const Modal = ({ status, click, children }) => (
  <Aux>
    <div className={classNames('backdrop', status ? 'active' : '')} onClick={click} aria-hidden />
    <div className={classNames('modal', status ? 'active' : '')}>
      <ul className="modal__list">{children}</ul>
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
  click: false,
  children: false,
};

export default Modal;
