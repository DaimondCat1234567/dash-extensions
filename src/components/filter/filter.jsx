import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import filterIcon from './icon--filter.svg';
import xIcon from './icon--x.svg';
import './filter.css';

const FilterComponent = props => {
    const {
        className,
        onChange,
        onClear,
        placeholderText,
        filterQuery,
        inputClassName
    } = props;
    return (
        <div
            className={classNames(className, 'filter', {
                'is-active': filterQuery.length > 0
            })}
        >
            <img
                className="filter-icon"
                src={filterIcon}
            />
            <input
                className={classNames('filter-input', inputClassName)}
                placeholder={placeholderText}
                type="text"
                value={filterQuery}
                onChange={onChange}
            />
            <div
                className="x-icon-wrapper"
                onClick={onClear}
            >
                <img
                    className="x-icon"
                    src={xIcon}
                />
            </div>
        </div>
    );
};

FilterComponent.propTypes = {
    className: PropTypes.string,
    filterQuery: PropTypes.string,
    inputClassName: PropTypes.string,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    placeholderText: PropTypes.string
};
FilterComponent.defaultProps = {
    placeholderText: 'Search'
};
export default FilterComponent;
