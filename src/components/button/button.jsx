import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './button.css';

const ButtonComponent = ({
    className,
    disabled,
    iconClassName,
    iconSrc,
    iconWidth,
    iconHeight,
    onClick,
    children,
    ...props
}) => {

    if (disabled) {
        onClick = function () {};
    }

    const icon = iconSrc && (
        <img
            className={classNames(iconClassName, 'icon')}
            draggable={false}
            src={iconSrc}
            height={iconHeight}
            width={iconWidth}
        />
    );

    return (
        <span
            className={classNames(
                'outlined-button',
                className
            )}
            role="button"
            onClick={onClick}
            {...props}
        >
            {icon}
            <div className="content">{children}</div>
        </span>
    );
};

ButtonComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    iconClassName: PropTypes.string,
    iconSrc: PropTypes.string,
    iconHeight: PropTypes.number,
    iconWidth: PropTypes.number,
    onClick: PropTypes.func
};

export default ButtonComponent;
