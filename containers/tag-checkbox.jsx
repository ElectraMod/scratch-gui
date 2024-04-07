import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import TagCheckboxComponent from '../components/tag-checkbox/tag-button.jsx';

class TagCheckbox extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }
    handleClick (event) {
        this.props.onClick(this.props.tag, event.target.checked);
    }
    render () {
        return (
            <TagCheckboxComponent
                {...this.props}
                onClick={this.handleClick}
            />
        );
    }
}

TagCheckbox.propTypes = {
    ...TagCheckboxComponent.propTypes,
    onClick: PropTypes.func
};

export default TagCheckbox;
