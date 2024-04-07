import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import classNames from 'classnames';

import styles from './extension-modals.css';

const ExtensionModal = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onCancel}
        contentLabel={props.title}
        id="extensionCreatedModal"
    >
        <Box className={styles.body}>
            {props._debugText && (
                <p>{props._debugText}</p>
            )}
        </Box>
    </Modal>
);

ExtensionModal.propTypes = {
    vm: PropTypes.any,
    title: PropTypes.string,
    _debugText: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired
};

export default ExtensionModal;
