import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ExtensionModal from '../components/pm-extension-modals/extension-modals.jsx';

class ExtensionModals extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOk',
            'handleCancel'
        ]);
        this.state = {
            updateId: 0
        };
    }
    shouldComponentUpdate () {
        const vm = this.props.vm;
        if (!vm) return false;
        if (!vm.runtime) return false;
        if (!vm.runtime.modalManager) return false;
        return vm.runtime.modalManager._updateId !== this.state.updateId;
    }
    componentDidUpdate () {
        const vm = this.props.vm;
        if (!vm) return;
        if (!vm.runtime) return;
        if (!vm.runtime.modalManager) return;
        this.setState({
            updateId: vm.runtime.modalManager._updateId
        });
    }
    handleOk () {
        
    }
    handleCancel () {
        
    }
    render () {
        const vm = this.props.vm;
        if (!vm) return;
        if (!vm.runtime) return;
        if (!vm.runtime.modalManager) return;
        const modals = vm.runtime.modalManager.modals;
        return (<>
            {Object.keys(modals).map((modalId) => {
                const modal = modals[modalId];
                return (
                    <ExtensionModal
                        {...modal}
                        vm={this.props.vm}
                    />
                );
            })}
        </>);
    }
}

ExtensionModals.propTypes = {
    vm: PropTypes.any
};

export default ExtensionModals;
