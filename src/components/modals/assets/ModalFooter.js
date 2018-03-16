import React from 'react';
import PropTypes from 'prop-types';

export default class ModalFooter extends React.Component{
  constructor(props){
      super(props);
      this.state={
      }
  }
    render(){
        return(
          <div className="modal_footer">
            <button className="footer_btn" onClick={this.props.onCancel}>{this.props.cancelLabel}</button>
            <button className="footer_btn_confirm" disabled={this.props.selectDisable}  onClick={this.props.onConfirm}>{this.props.confirmLabel}</button>
          </div>
        )
    }
}

ModalFooter.propTypes = {
  selectDisable: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  cancelLabel: PropTypes.string.isRequired,
}
