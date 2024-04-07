import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './user-avatar.css';

const UserAvatar = ({
    className,
    imageUrl,
    username
}) => (
    <a target="_blank" href={"https://penguinmod.com/profile?user=" + username}>
        <img
            className={classNames(
                className,
                styles.userThumbnail
            )}
            src={imageUrl}
        />
    </a>
);

UserAvatar.propTypes = {
    className: PropTypes.string,
    imageUrl: PropTypes.string
};

export default UserAvatar;
