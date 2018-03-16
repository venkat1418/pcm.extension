import React from 'react';
import PropTypes from 'prop-types';

export default class ModalBody extends React.Component{
  constructor(props){
      super(props);
      this.state={
      }
  }
    render(){
        return(
          <div className="modal_body">
            {this.props.children}
          </div>
        )
    }
}

ModalBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}
