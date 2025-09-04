import {FormattedMessage, defineMessages} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import './library-item.css';
import classNames from 'classnames';

import bluetoothIconURL from './bluetooth.svg';
import internetConnectionIconURL from './internet-connection.svg';
import favoriteInactiveIcon from './favorite-inactive.svg';
import favoriteActiveIcon from './favorite-active.svg';

const messages = defineMessages({
    favorite: {
        defaultMessage: 'Favorite',
        description: 'Alt text of icon in costume, sound, and extension libraries to mark an item as favorite.',
        id: 'tw.favorite'
    },
    unfavorite: {
        defaultMessage: 'Unfavorite',
        description: 'Alt text of icon in costume, sound, and extension libraries to unmark an item as favorite.',
        id: 'tw.unfavorite'
    }
});

/* eslint-disable react/prefer-stateless-function */
class LibraryItemComponent extends React.PureComponent {
    render () {
        const favoriteMessage = this.props.intl.formatMessage(
            this.props.favorite ? messages.unfavorite : messages.favorite
        );
        const favorite = (
            <button
                className={classNames('favorite-container', {'active': this.props.favorite})}
                onClick={this.props.onFavorite}
            >
                <img
                    src={this.props.favorite ? favoriteActiveIcon : favoriteInactiveIcon}
                    className="favorite-icon"
                    draggable={false}
                    alt={favoriteMessage}
                    title={favoriteMessage}
                />
            </button>
        );

        return this.props.featured ? (
            <div
                className={classNames(
                    'library-item',
                    'featured-item',
                    {
                        'disabled': this.props.disabled
                    },
                    typeof this.props.extensionId === 'string' ? 'library-item-extension' : null,
                    this.props.hidden ? 'hidden' : null
                )}
                onClick={this.props.onClick}
            >
                <div className="featured-image-container">
                    {this.props.disabled ? (
                        <div className="coming-soon-text">
                            <FormattedMessage
                                defaultMessage="Coming Soon"
                                description="Label for extensions that are not yet implemented"
                                id="gui.extensionLibrary.comingSoon"
                            />
                        </div>
                    ) : null}
                    <img
                        className="featured-image"
                        loading="lazy"
                        draggable={false}
                        src={this.props.iconURL}
                    />
                </div>
                {this.props.insetIconURL ? (
                    <div className="library-item-inset-image-container">
                        <img
                            className="library-item-inset-image"
                            src={this.props.insetIconURL}
                            draggable={false}
                        />
                    </div>
                ) : null}
                <div
                    className={typeof this.props.extensionId === 'string' ?
                        classNames('featured-extension-text', 'featured-text') : 'featured-text'
                    }
                >
                    <span className="library-item-name">{this.props.name}</span>
                    <br />
                    <span className="featured-description">{this.props.description}</span>
                </div>

                {(
                  this.props.bluetoothRequired ||
                  this.props.internetConnectionRequired ||
                  this.props.collaborator ||
                  (this.props.credits && this.props.credits.length > 0) ||
                  this.props.docsURI ||
                  this.props.samples
                ) ? (
                    <div className="featured-extension-metadata">
                        {this.props.bluetoothRequired || this.props.internetConnectionRequired ? (
                            <div className="featured-extension-metadata-section">
                                <div>
                                    <div>
                                        <FormattedMessage
                                            defaultMessage="Requires"
                                            description="Label for extension hardware requirements"
                                            id="gui.extensionLibrary.requires"
                                        />
                                    </div>
                                    <div
                                        className="featured-extension-metadata-detail"
                                    >
                                        {this.props.bluetoothRequired ? (
                                            <img
                                                src={bluetoothIconURL}
                                                draggable={false}
                                            />
                                        ) : null}
                                        {this.props.internetConnectionRequired ? (
                                            <img
                                                src={internetConnectionIconURL}
                                                draggable={false}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {this.props.collaborator ? (
                            <div className="featured-extension-metadata-section">
                                <div>
                                    <div>
                                        <FormattedMessage
                                            defaultMessage="Collaboration with"
                                            description="Label for extension collaboration"
                                            id="gui.extensionLibrary.collaboration"
                                        />
                                    </div>
                                    <div
                                        className="featured-extension-metadata-detail"
                                    >
                                        {this.props.collaborator}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {this.props.credits && this.props.credits.length > 0 ? (
                            <div className="featured-extension-metadata-section">
                                <div>
                                    <div>
                                        <FormattedMessage
                                            defaultMessage="Created by"
                                            description="Appears in the extension list. Followed by a list of names."
                                            id="tw.createdBy"
                                        />
                                    </div>
                                    <div
                                        className="featured-extension-metadata-detail"
                                    >
                                        {this.props.credits.map((credit, index) => (
                                            <React.Fragment key={index}>
                                                {credit}
                                                {index !== this.props.credits.length - 1 && (
                                                    ', '
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {this.props.docsURI || this.props.samples ? (
                            <div className="featured-extension-metadata-section">
                                <div>
                                    <div>Resources</div>
                                    <div
                                        className="featured-extension-metadata-detail"
                                    >
                                        {this.props.docsURI && (
                                            <a
                                                href={this.props.docsURI}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <FormattedMessage
                                                    defaultMessage="Documentation"
                                                    // eslint-disable-next-line max-len
                                                    description="Appears in the extension list. Links to additional extension documentation."
                                                    id="tw.documentation"
                                                />
                                            </a>
                                        )}
                                        {this.props.samples && (
                                            <React.Fragment>
                                                {this.props.docsURI && (
                                                    <br />
                                                )}
                                                {this.props.samples.map((sample, index) => (
                                                    <React.Fragment key={index}>
                                                        <a
                                                            href={sample.href}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <FormattedMessage
                                                                defaultMessage="Sample project"
                                                                // eslint-disable-next-line max-len
                                                                description="Appears in the extension list. Links to a sample project for an extension."
                                                                id="tw.sample"
                                                            />
                                                        </a>
                                                        {index !== this.props.samples.length - 1 && (
                                                            <br />
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </React.Fragment>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}

                {favorite}
            </div>
        ) : (
            <Box
                className={classNames(
                    'library-item', {
                        'hidden': this.props.hidden
                    }
                )}
                role="button"
                tabIndex="0"
                onBlur={this.props.onBlur}
                onClick={this.props.onClick}
                onFocus={this.props.onFocus}
                onKeyPress={this.props.onKeyPress}
                onMouseEnter={this.props.showPlayButton ? null : this.props.onMouseEnter}
                onMouseLeave={this.props.showPlayButton ? null : this.props.onMouseLeave}
            >
                {/* Layers of wrapping is to prevent layout thrashing on animation */}
                <Box className="library-item-image-container-wrapper">
                    <Box
                        className="library-item-image-container"
                        onMouseEnter={this.props.showPlayButton ? this.props.onMouseEnter : null}
                        onMouseLeave={this.props.showPlayButton ? this.props.onMouseLeave : null}
                    >
                        <img
                            className="library-item-image"
                            loading="lazy"
                            src={this.props.iconURL}
                            draggable={false}
                        />
                    </Box>
                </Box>
                <span className="library-item-name">{this.props.name}</span>

                {favorite}
            </Box>
        );
    }
}
/* eslint-enable react/prefer-stateless-function */


LibraryItemComponent.propTypes = {
    intl: PropTypes.object,
    bluetoothRequired: PropTypes.bool,
    collaborator: PropTypes.string,
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    disabled: PropTypes.bool,
    extensionId: PropTypes.string,
    featured: PropTypes.bool,
    hidden: PropTypes.bool,
    iconURL: PropTypes.string,
    insetIconURL: PropTypes.string,
    internetConnectionRequired: PropTypes.bool,
    isPlaying: PropTypes.bool,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    credits: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])),
    docsURI: PropTypes.string,
    samples: PropTypes.arrayOf(PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string
    })),
    favorite: PropTypes.bool,
    onFavorite: PropTypes.func,
    onBlur: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    showPlayButton: PropTypes.bool
};

LibraryItemComponent.defaultProps = {
    disabled: false,
    showPlayButton: false
};

export default LibraryItemComponent;
