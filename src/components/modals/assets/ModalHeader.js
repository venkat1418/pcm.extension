import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'react-fa';

export default class ModalHeader extends React.Component{
  constructor(props){
      super(props);
      this.state={
      }
  }
    render(){
        return(
          <div className="modal_header">
            {this.props.title}
            <div className={this.props.closeClassName}>
              <Icon name="times" onClick={this.props.onCancel} />
              <Icon className="icon-login" name="times" onClick={this.props.onCancel} />
            </div>
          </div>
        )
    }
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  closeClassName: PropTypes.string,
  onCancel: PropTypes.func
}
