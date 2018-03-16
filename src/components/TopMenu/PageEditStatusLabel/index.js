import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PageEditStatusLabel extends Component {
  constructor(props){
    super(props);
    this.state={
      isLogin: this.props.isLogin,
      isEditMode: this.props.isEditMode
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      isLogin: nextProps.isLogin,
      isEditMode: nextProps.isEditMode
    })
  }
  getLabel = (isLogin, isEditMode)=>{
    if(!isLogin && !isEditMode){
      return (
        <div className="pageNameLabel">
          <span>YOU ARE CURRENTLY   <br />
            <b> LOGGED OUT HOMEPAGE</b></span>
        </div>
      );
    }
    else if(isLogin && !isEditMode){
      return (
        <div className="pageNameLabel">
          <span>YOU ARE CURRENTLY   </span><br />
          <span> PREVIEWING <span className="red">HOMEPAGE</span></span>
        </div>

      );
    }
    else if(isLogin && isEditMode){
      return (
        <div className="pageNameLabel">
          <span>YOU ARE CURRENTLY   </span><br />
          <span> EDITING <span className="red">HOMEPAGE</span></span>
        </div>
  );
    }
  }
  render() {
    return (
      <div className="editMsg_container">
        {this.getLabel(this.state.isLogin, this.state.isEditMode)}
        <div className="menuSeperator" />
      </div>
    );
  }
  };

  const mapStateToProps = (state)=>({
    isLogin: state.isLogin,
    isEditMode: state.isEditMode
  })
  const mapDispatchToProps = (dispatch)=>bindActionCreators({
    }, dispatch)

  PageEditStatusLabel.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired
  }
  export default connect(mapStateToProps, mapDispatchToProps)(PageEditStatusLabel);
