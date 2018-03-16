import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
// import ModalHeader from './assets/ModalHeader';
import ModalFooter from './assets/ModalFooter';
import ModalBody from './assets/ModalBody';

ReactModal.setAppElement('body');

class ConfirmDialogModal extends React.Component {
  constructor(props){
      super(props);
      this.state={
      }
  }
    render () {
        return (
          <ReactModal
            isOpen={this.props.showModal}
            className="Modal ModalRevert"
            overlayClassName="Overlay"
            >
            <ModalBody>
              <div className="main_description">
                {this.props.mainDescription}
              </div>
              <div className="sub_description">
                {this.props.originalHeadline}
              </div>
            </ModalBody>
            <ModalFooter
              onConfirm={this.props.onConfirm}
              onCancel={this.props.onCancel}
              confirmLabel={this.props.confirmLabel ? this.props.confirmLabel : "CONFIRM"}
              cancelLabel="CANCEL"
                />
          </ReactModal>
        );
    }
}

ConfirmDialogModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  originalHeadline: PropTypes.string,
  mainDescription: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired
}

ConfirmDialogModal.defaultProps = {
  confirmLabel: '',
  originalHeadline: ''
}
export default ConfirmDialogModal;
