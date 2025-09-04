import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './divider.css';

const Divider = ({className}) => (
    <div className={classNames('divider', className)} />
);

Divider.propTypes = {
    className: PropTypes.string
};

export default Divider;
