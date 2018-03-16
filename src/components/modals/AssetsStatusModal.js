import React from 'react';
import ReactModal from 'react-modal';
import ModalHeader from './assets/ModalHeader';
import ModalFooter from './assets/ModalFooter';
import ModalBody from './assets/ModalBody';

ReactModal.setAppElement('body');

export default class AssetsStatusModal extends React.Component {
    render () {
        return (
            <ReactModal
                isOpen={this.props.showModal}
                className="Modal"
                overlayClassName="Overlay"
            >
                <ModalHeader
                    title="Asset is locked!"
                />
                <ModalBody>
                    <div className="description">
                        Current asset is locked by {this.props.lockedBy.name}
                    </div>
                </ModalBody>
                <ModalFooter
                    onConfirm={this.props.onConfirm}
                    onCancel={this.props.onCancel}
                    confirmLabel="UNLOCK"
                    cancelLabel="CANCEL"
                />
            </ReactModal>
        );
    }
}
