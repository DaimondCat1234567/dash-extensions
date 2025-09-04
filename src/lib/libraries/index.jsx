import React from 'react';
import {FormattedMessage} from 'react-intl';

import galleryIcon from './gallery/gallery.svg';
import {APP_NAME} from '../brand';
import { extensions } from '../extensions';

export default extensions;

export const galleryLoading = {
    name: (
        <FormattedMessage
            defaultMessage="{APP_NAME} Extension Gallery"
            description="Name of Mod's extension gallery in extension library"
            id="tw.extensionGallery.name"
            values={{
                APP_NAME
            }}
        />
    ),
    href: 'https://dashblocks.github.io/extensions',
    extensionId: 'gallery',
    iconURL: galleryIcon,
    description: (
        <FormattedMessage
            // eslint-disable-next-line max-len
            defaultMessage="Loading extension gallery..."
            description="Appears while loading extension list from the custom extension gallery"
            id="tw.extensionGallery.loading"
        />
    ),
    tags: ['dash'],
    featured: true,
    disabled: false
};

export const galleryMore = {
    name: (
        <FormattedMessage
            defaultMessage="{APP_NAME} Extension Gallery"
            description="Name of Mod's extension gallery in extension library"
            id="tw.extensionGallery.name"
            values={{
                APP_NAME
            }}
        />
    ),
    href: 'https://dashblocks.github.io/extensions',
    extensionId: 'gallery',
    iconURL: galleryIcon,
    description: (
        <FormattedMessage
            // eslint-disable-next-line max-len
            defaultMessage="Welcome to Dash Extensions Gallery!"
            description="Appears after the extension list from the gallery was loaded successfully"
            id="dash.extensionGallery.more"
        />
    ),
    tags: ['dash'],
    featured: true,
    disabled: false
};

export const galleryError = {
    name: (
        <FormattedMessage
            defaultMessage="{APP_NAME} Extension Gallery"
            description="Name of Mod's extension gallery in extension library"
            id="tw.extensionGallery.name"
            values={{
                APP_NAME
            }}
        />
    ),
    href: 'https://dashblocks.github.io/extensions',
    extensionId: 'gallery',
    iconURL: galleryIcon,
    description: (
        <FormattedMessage
            // eslint-disable-next-line max-len
            defaultMessage="Error loading extension gallery. Visit dashblocks.github.io/extensions to find more extensions."
            description="Appears when an error occurred loading extension list from the custom extension gallery"
            id="dash.extensionGallery.error"
        />
    ),
    tags: ['dash'],
    featured: true,
    disabled: false
};
