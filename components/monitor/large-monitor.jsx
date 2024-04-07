import React from 'react';
import PropTypes from 'prop-types';
import styles from './monitor.css';
import DOMElementRenderer from '../../containers/dom-element-renderer.jsx';

const LargeMonitor = ({categoryColor, value, isHTML}) => (
    <div className={styles.largeMonitor}>
        <div
            className={styles.largeValue}
            style={{background: categoryColor}}
        >
            {isHTML
                ? (<DOMElementRenderer domElement={value} />)
                : String(value)}
        </div>
    </div>
);

LargeMonitor.propTypes = {
    categoryColor: PropTypes.string,
    isHTML: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default LargeMonitor;
