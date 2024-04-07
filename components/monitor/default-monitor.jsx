import React from 'react';
import PropTypes from 'prop-types';
import styles from './monitor.css';
import DOMElementRenderer from '../../containers/dom-element-renderer.jsx';

const DefaultMonitor = ({categoryColor, label, value, isHTML}) => (
    <div className={styles.defaultMonitor}>
        <div className={styles.row}>
            <div className={styles.label}>
                {label}
            </div>
            <div
                className={styles.value}
                style={{background: categoryColor}}
            >
                {isHTML
                    ? (<DOMElementRenderer domElement={value} />)
                    : String(value)}
            </div>
        </div>
    </div>
);

DefaultMonitor.propTypes = {
    categoryColor: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isHTML: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default DefaultMonitor;
