import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import VM from 'scratch-vm';

import AssetPanel from '../components/asset-panel/asset-panel.jsx';
import placeholderIcon from '../components/asset-panel/icon--files-placeholder.svg';

// import soundIconRtl from '../components/asset-panel/icon--sound-rtl.svg';
// import addSoundFromLibraryIcon from '../components/asset-panel/icon--add-sound-lib.svg';
// import addSoundFromRecordingIcon from '../components/asset-panel/icon--add-sound-record.svg';
// import fileUploadIcon from '../components/action-menu/icon--file-upload.svg';
// import surpriseIcon from '../components/action-menu/icon--surprise.svg';
// import searchIcon from '../components/action-menu/icon--search.svg';

import nordTheMan from '../components/asset-panel/nord.png';

// import RecordModal from './record-modal.jsx';
// import SoundEditor from './sound-editor.jsx';
// import SoundLibrary from './sound-library.jsx';

// import { getSoundLibrary } from '../lib/libraries/tw-async-libraries';
import { handleFileUpload, externalFileUpload } from '../lib/file-uploader.js';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
// import DragConstants from '../lib/drag-constants';
import downloadBlob from '../lib/download-blob';

import { connect } from 'react-redux';

// import {
//     closeSoundLibrary,
//     openSoundLibrary,
//     openSoundRecorder
// } from '../reducers/modals';

// import {
//     activateTab,
//     COSTUMES_TAB_INDEX
// } from '../reducers/editor-tab';

import { setRestore } from '../reducers/restore-deletion';
import { showStandardAlert, closeAlertWithId } from '../reducers/alerts';

class FilesTab extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleSelectFile',
            'handleDeleteFile',
            'handleDuplicateFile',
            'handleDownloadFile',
            'handleNewFile',
            // 'handleSurpriseSound',
            'handleFileUploadClick',
            'handleExternalFileUpload',
            // 'handleDrop',
            'setFileInput'
        ]);
        this.state = { selectedFileIndex: 0 };
    }

    componentWillReceiveProps(nextProps) {
        // TODO: handle this
        // const {
        //     editingTarget,
        //     sprites,
        //     stage
        // } = nextProps;

        // const target = editingTarget && sprites[editingTarget] ? sprites[editingTarget] : stage;
        // if (!target || !target.sounds) {
        //     return;
        // }

        // // If switching editing targets, reset the sound index
        // if (this.props.editingTarget !== editingTarget) {
        //     this.setState({ selectedSoundIndex: 0 });
        // } else if (this.state.selectedSoundIndex > target.sounds.length - 1) {
        //     this.setState({ selectedSoundIndex: Math.max(target.sounds.length - 1, 0) });
        // }
    }

    handleSelectFile(fileIndex) {
        this.setState({ selectedFileIndex: fileIndex });
    }

    handleDeleteFile(fileIndex) {
        // TODO: deleteFile isnt a function
        const restoreFun = this.props.vm.deleteFile(fileIndex);
        if (fileIndex >= this.state.selectedFileIndex) {
            this.setState({ selectedFileIndex: Math.max(0, fileIndex - 1) });
        }
        this.props.dispatchUpdateRestore({ restoreFun, deletedItem: 'File' });
    }

    handleDownloadFile(fileIndex) {
        // TODO: vm.files doesnt exist
        const item = this.props.vm.files[fileIndex];
        const blob = new Blob([item.asset.data], { type: item.asset.assetType.contentType });
        downloadBlob(`${item.name}.${item.asset.dataFormat}`, blob);
    }

    handleDuplicateFile(fileIndex) {
        // TODO: duplicateFile isnt a function
        this.props.vm.duplicateFile(fileIndex).then(() => {
            this.setState({ selectedFileIndex: fileIndex + 1 });
        });
    }

    handleNewFile() {
        if (!this.props.vm.editingTarget) {
            return null;
        }
        // TODO: vm.files doesnt exist
        const files = this.props.vm.files ? this.props.vm.files : [];
        this.setState({ selectedFileIndex: Math.max(files.length - 1, 0) });
    }

    handleFileUploadClick() {
        this.fileInput.click();
    }

    handleExternalFileUpload(e) {
        const storage = this.props.vm.runtime.storage;
        const targetId = this.props.vm.editingTarget.id;
        this.props.onShowImporting();
        handleFileUpload(e.target, (buffer, fileType, fileName, fileIndex, fileCount) => {
            externalFileUpload(buffer, fileType, storage, newFile => {
                newFile.name = fileName;
                // TODO: addFile isnt a function
                this.props.vm.addFile(newFile, targetId).then(() => {
                    this.handleNewFile();
                    if (fileIndex === fileCount - 1) {
                        this.props.onCloseImporting();
                    }
                });
            }, this.props.onCloseImporting);
        }, this.props.onCloseImporting);
    }

    // handleDrop(dropInfo) {
    //     if (dropInfo.dragType === DragConstants.SOUND) {
    //         const sprite = this.props.vm.editingTarget.sprite;
    //         const activeSound = sprite.sounds[this.state.selectedSoundIndex];

    //         this.props.vm.reorderSound(this.props.vm.editingTarget.id,
    //             dropInfo.index, dropInfo.newIndex);

    //         this.setState({ selectedSoundIndex: sprite.sounds.indexOf(activeSound) });
    //     } else if (dropInfo.dragType === DragConstants.BACKPACK_COSTUME) {
    //         this.props.onActivateCostumesTab();
    //         this.props.vm.addCostume(dropInfo.payload.body, {
    //             name: dropInfo.payload.name
    //         });
    //     } else if (dropInfo.dragType === DragConstants.BACKPACK_SOUND) {
    //         this.props.vm.addSound({
    //             md5: dropInfo.payload.body,
    //             name: dropInfo.payload.name
    //         }).then(this.handleNewSound);
    //     }
    // }

    setFileInput(input) {
        this.fileInput = input;
    }

    render() {
        const {
            dispatchUpdateRestore, // eslint-disable-line no-unused-vars
            intl,
            isRtl,
            vm,
            // onNewSoundFromLibraryClick,
            // onNewSoundFromRecordingClick
        } = this.props;

        if (!vm.editingTarget) {
            return null;
        }

        const files = vm.files ? vm.files.map(file => (
            {
                url: isRtl ? fileIconRtl : fileIcon,
                name: file.name,
                details: file.size,
                dragPayload: file
            }
        )) : [];

        const messages = defineMessages({
            fileUploadExternal: {
                defaultMessage: 'Upload File',
                description: 'Button to upload file in the editor tab',
                id: 'pm.gui.filesTab.fileUploadExternal'
            },
            fileNew: {
                defaultMessage: 'New File',
                description: 'Button to create a new file in the editor tab',
                id: 'pm.gui.filesTab.fileNew'
            }
        });

        return (
            <AssetPanel
                buttons={[{
                    title: intl.formatMessage(messages.fileNew),
                    img: placeholderIcon,
                    onClick: this.handleFileUploadClick // TODO: should make a new TXT file instead
                }, {
                    title: intl.formatMessage(messages.fileUploadExternal),
                    img: placeholderIcon,
                    onClick: this.handleFileUploadClick,
                    fileAccept: '.txt, .json',
                    fileChange: this.handleExternalFileUpload,
                    fileInput: this.setFileInput,
                    fileMultiple: true
                }, {
                    title: intl.formatMessage(messages.fileNew),
                    img: placeholderIcon,
                    onClick: this.handleFileUploadClick // TODO: should make a new TXT file instead
                }]}
                // dragType={DragConstants.SOUND}
                isRtl={isRtl}
                items={files}
                selectedItemIndex={this.state.selectedFileIndex}
                onDeleteClick={this.handleDeleteFile}
                // onDrop={this.handleDrop}
                onDuplicateClick={this.handleDuplicateFile}
                onExportClick={this.handleDownloadFile}
                onItemClick={this.handleSelectFile}
            >
                <p>erm, you dont see anything here</p>
                <img
                    width="40"
                    height="40"
                    src={nordTheMan}
                    alt="Nord"
                ></img>
            </AssetPanel>
        );
    }
}

FilesTab.propTypes = {
    dispatchUpdateRestore: PropTypes.func,
    editingTarget: PropTypes.string,
    intl: intlShape,
    isRtl: PropTypes.bool,
    // onActivateCostumesTab: PropTypes.func.isRequired,
    onCloseImporting: PropTypes.func.isRequired,
    // onNewSoundFromLibraryClick: PropTypes.func.isRequired,
    // onNewSoundFromRecordingClick: PropTypes.func.isRequired,
    // onRequestCloseSoundLibrary: PropTypes.func.isRequired,
    onShowImporting: PropTypes.func.isRequired,
    // soundLibraryVisible: PropTypes.bool,
    // soundRecorderVisible: PropTypes.bool,
    // sprites: PropTypes.shape({
    //     id: PropTypes.shape({
    //         sounds: PropTypes.arrayOf(PropTypes.shape({
    //             name: PropTypes.string.isRequired
    //         }))
    //     })
    // }),
    // stage: PropTypes.shape({
    //     sounds: PropTypes.arrayOf(PropTypes.shape({
    //         name: PropTypes.string.isRequired
    //     }))
    // }),
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    editingTarget: state.scratchGui.targets.editingTarget,
    isRtl: state.locales.isRtl,
    // sprites: state.scratchGui.targets.sprites,
    // stage: state.scratchGui.targets.stage,
    // soundLibraryVisible: state.scratchGui.modals.soundLibrary,
    // soundRecorderVisible: state.scratchGui.modals.soundRecorder
});

const mapDispatchToProps = dispatch => ({
    // onActivateCostumesTab: () => dispatch(activateTab(COSTUMES_TAB_INDEX)),
    // onNewSoundFromLibraryClick: e => {
    //     e.preventDefault();
    //     dispatch(openSoundLibrary());
    // },
    // onNewSoundFromRecordingClick: () => {
    //     dispatch(openSoundRecorder());
    // },
    // onRequestCloseSoundLibrary: () => {
    //     dispatch(closeSoundLibrary());
    // },
    dispatchUpdateRestore: restoreState => {
        dispatch(setRestore(restoreState));
    },
    onCloseImporting: () => dispatch(closeAlertWithId('importingAsset')),
    onShowImporting: () => dispatch(showStandardAlert('importingAsset'))
});

export default errorBoundaryHOC('Files Tab')(
    injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(FilesTab))
);
