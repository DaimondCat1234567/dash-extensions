import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './spinner.css';

const SpinnerComponent = function (props) {
    const {
        className,
        level,
        small,
        large
    } = props;
    return (
        <div
            className={classNames(
                className,
                'spinner',
                level,
                {
                    'small': small,
                    'large': large
                }
            )}
        />
    );
};
SpinnerComponent.propTypes = {
    className: PropTypes.string,
    large: PropTypes.bool,
    level: PropTypes.string,
    small: PropTypes.bool
};
SpinnerComponent.defaultProps = {
    className: '',
    large: false,
    level: 'info',
    small: false
};
export default SpinnerComponent;
