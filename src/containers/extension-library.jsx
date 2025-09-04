// TODO: Make an Extension Gallery for Dash

import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {extensions} from '../lib/extensions.js';
import {defineMessages, injectIntl} from 'react-intl';

import {
    galleryError,
    galleryLoading,
    galleryMore // soon
} from '../lib/libraries/index.jsx';
import extensionTags from '../lib/libraries/tw-extension-tags';

import LibraryComponent from '../components/library/library.jsx';

const messages = defineMessages({
    extensionTitle: {
        defaultMessage: 'Dash Extensions Gallery',
        description: 'Heading for the extension library',
        id: 'gui.extensionLibrary.chooseAnExtension'
    }
});

const toLibraryItem = extension => {
    if (typeof extension === 'object') {
        return ({
            rawURL: extension.iconURL || '',
            ...extension
        });
    }
    return extension;
};

const translateGalleryItem = (extension, locale) => ({
    ...extension,
    name: extension.nameTranslations[locale] || extension.name,
    description: extension.descriptionTranslations[locale] || extension.description
});

let cachedGallery = null;

const fetchLibrary = async () => {
    return extensions.map(extension => ({
        name: extension.name,
        nameTranslations: extension.nameTranslations || {},
        description: extension.description,
        descriptionTranslations: extension.descriptionTranslations || {},
        extensionId: extension.id,
        extensionURL: extension.code.startsWith('http') ? extension.code : `https://dashblocks.github.io/extensions/static/extensions/${extension.code}`,
        iconURL: `https://dashblocks.github.io/extensions/static/images/${extension.banner || 'unknown.svg'}`,
        tags: ['dash'],
        credits: [
            ...(typeof extension.creator == 'object' ? extension.creator : [extension.creator] || []),
            ...(extension.notes ? [extension.notes] : [])
        ].map(credit => {
            if (extension.notes && credit == extension.notes) return credit;
            return (
                <a
                    href={extension.isGitHub ? `https://github.com/${credit}` : `https://scratch.mit.edu/users/${credit}`}
                    target="_blank"
                    rel="noreferrer"
                    key={credit}
                >
                    {credit}
                </a>
            );
        }),
        docsURI: extension.documentation ? `https://dashblocks.github.io/dash-extensions-gallery/src/lib/Documentation/${extension.documentation}.md` : null,
        samples: /*extension.samples ? extension.samples.map(sample => ({
            href: `${process.env.ROOT}editor?project_url=https://extensions.turbowarp.org/samples/${encodeURIComponent(sample)}.sb3`,
            text: sample
        })) :*/ null,
        incompatibleWithScratch: !extension.scratchCompatible || true,
        featured: true
    }));
};

class ExtensionLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
        this.state = {
            gallery: cachedGallery,
            galleryError: null,
            galleryTimedOut: false
        };
    }
    componentDidMount () {
        if (!this.state.gallery) {
            const timeout = setTimeout(() => {
                this.setState({
                    galleryTimedOut: true
                });
            }, 750);

            fetchLibrary()
                .then(gallery => {
                    cachedGallery = gallery;
                    this.setState({
                        gallery
                    });
                    clearTimeout(timeout);
                })
                .catch(error => {
                    console.error(error);
                    this.setState({
                        galleryError: error
                    });
                    clearTimeout(timeout);
                });
        }
    }
    handleItemSelect (item) {
        if (item.href) {
            return;
        }

        const extensionId = item.extensionId;

        if (extensionId === 'custom_extension') {
            this.props.onOpenCustomExtensionModal();
            return;
        }

        if (extensionId === 'procedures_enable_return') {
            this.props.onEnableProcedureReturns();
            this.props.onCategorySelected('myBlocks');
            return;
        }

        if (extensionId === 'data_lists_enable') {
            this.props.onEnableLists();
            this.props.onCategorySelected('data');
            return;
        }

        const url = item.extensionURL ? item.extensionURL : extensionId;
        if (!item.disabled) {
            if (this.props.vm.extensionManager.isExtensionLoaded(extensionId)) {
                this.props.onCategorySelected(extensionId);
            } else {
                this.props.vm.extensionManager.loadExtensionURL(url)
                    .then(() => {
                        this.props.onCategorySelected(extensionId);
                    })
                    .catch(err => {
                        console.error(err);
                        // eslint-disable-next-line no-alert
                        alert(err);
                    });
            }
        }
    }
    render () {
        let library = [];
        const locale = this.props.intl.locale;
        
        const addedIds = new Set();
        if (this.state.gallery) {
            library.push(toLibraryItem(galleryMore));
            const filteredGallery = this.state.gallery
                .filter(item => !addedIds.has(item.extensionId))
                .map(i => {
                    addedIds.add(i.extensionId);
                    return translateGalleryItem(i, locale);
                });
            library.push(...filteredGallery.map(toLibraryItem));
        } else if (this.state.galleryTimedOut && !this.state.gallery) {
            library.push(toLibraryItem(galleryLoading));
        } else if (this.state.galleryError && !this.state.gallery) {
            library.push(toLibraryItem(galleryError));
        }

        return (
            <LibraryComponent
                data={library}
                filterable
                persistableKey="extensionId"
                id="extensionLibrary"
                tags={extensionTags}
                title={this.props.intl.formatMessage(messages.extensionTitle)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

ExtensionLibrary.propTypes = {
    intl: PropTypes.object.isRequired,
    onCategorySelected: PropTypes.func,
    onEnableProcedureReturns: PropTypes.func,
    onEnableLists: PropTypes.func,
    onOpenCustomExtensionModal: PropTypes.func,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool
};

export default injectIntl(ExtensionLibrary);
