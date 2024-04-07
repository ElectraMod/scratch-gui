import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import Button from '../button/button.jsx';

import styles from './tag-button.css';

const TagButtonComponent = ({
    active,
    iconClassName,
    className,
    tag, // eslint-disable-line no-unused-vars
    intlLabel,
    ...props
}) => (
    <label className={classNames(styles.checkboxLabel)}>
        <input
            onChange={props.onClick}
            type="checkbox"
            className={classNames(styles.checkbox)}
        />
        {typeof intlLabel === 'string' ? intlLabel : (
            <FormattedMessage {...intlLabel} />
        )}
    </label>
    // <Button
    //     className={classNames(
    //         styles.tagButton,
    //         className, {
    //             [styles.active]: active
    //         }
    //     )}
    //     iconClassName={classNames(
    //         styles.tagButtonIcon,
    //         iconClassName
    //     )}
    //     {...props}
    // >
    //     <p>this a checkbox</p>
    // </Button>
);

TagButtonComponent.propTypes = {
    ...Button.propTypes,
    active: PropTypes.bool,
    intlLabel: PropTypes.oneOfType([
        PropTypes.shape({
            defaultMessage: PropTypes.string,
            description: PropTypes.string,
            id: PropTypes.string
        }),
        PropTypes.string
    ]).isRequired,
    tag: PropTypes.string.isRequired
};

TagButtonComponent.defaultProps = {
    active: false
};

export default TagButtonComponent;
