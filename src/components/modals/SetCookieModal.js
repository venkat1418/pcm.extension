import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import ModalHeader from './assets/ModalHeader';
import ModalFooter from './assets/ModalFooter';
import ModalBody from './assets/ModalBody';

class SetCookieModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            cookie: '',
            expires: ''
        }
    }
    componentDidMount(){
      ReactModal.setAppElement('body');
    }
    handleCookie = (e)=>{
        e.preventDefault();
        this.setState({ cookie: e.target.value });
    }
    handleExpires = (e)=>{
        e.preventDefault();
        this.setState({ expires: e.target.value });
    }
    render () {
        return (
          <ReactModal
            isOpen={this.props.showModal}
            className="Modal"
            overlayClassName="Overlay"
            >
            <ModalHeader
              title="Insert Cookie"
                />
            <ModalBody>
              <div className="form_group">
                <label>Cookie</label>
                <input value={this.state.cookie} placeholder="Insert Cookie" onChange={this.handleCookie} />
              </div>
              <div className="form_group">
                <label>Expires</label>
                <input value={this.state.expires} placeholder="Insert Expires" onChange={this.handleExpires} />
              </div>
            </ModalBody>
            <ModalFooter
              onConfirm={(e)=>this.props.onConfirm(this.state.cookie, this.state.expires)}
              onCancel={this.props.onCancel}
              confirmLabel="SET COOKIE"
              cancelLabel="CANCEL"
                />
          </ReactModal>
        );
    }
}

SetCookieModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}
export default SetCookieModal;
