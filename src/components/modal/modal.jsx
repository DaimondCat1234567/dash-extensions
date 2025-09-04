import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';

import Box from '../box/box.jsx';

import './modal.css';

const ModalComponent = props => (
    <ReactModal
        isOpen
        className={classNames('modal-content', props.className, {
            'full-screen': props.fullScreen
        })}
        contentLabel={props.contentLabel}
        overlayClassName="modal-overlay"
        onRequestClose={props.onRequestClose}
    >
        <Box
            dir={props.isRtl ? 'rtl' : 'ltr'}
            direction="column"
            grow={1}
        >
            <div className={classNames('header', props.headerClassName)}>
                <div
                    className={classNames(
                        'header-item',
                        'header-item-title'
                    )}
                >
                    {props.headerImage ? (
                        <img
                            className="header-image"
                            src={props.headerImage}
                            draggable={false}
                        />
                    ) : null}
                    {props.contentLabel}
                </div>
            </div>
            {props.children}
        </Box>
    </ReactModal>
);

ModalComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    contentLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    fullScreen: PropTypes.bool,
    headerClassName: PropTypes.string,
    headerImage: PropTypes.string,
    isRtl: PropTypes.bool,
    onHelp: PropTypes.func,
    onRequestClose: PropTypes.func
};

export default ModalComponent;
