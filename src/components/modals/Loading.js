import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import ModalBody from './assets/ModalBody';

ReactModal.setAppElement('body');

class Loading extends React.Component {
  constructor(props){
      super(props);
      this.state={
      }
  }
    render () {
        return (
          <ReactModal
            isOpen={this.props.showLoadingModal}
            className="Modal_Loading"
            overlayClassName="Overlay"
            >
            <ModalBody >
              <div className="updatePkgOrder">
                  Loading...
              </div>

            </ModalBody>
          </ReactModal>
        );
    }
}

Loading.propTypes = {
  showLoadingModal: PropTypes.bool.isRequired
}

export default Loading;
