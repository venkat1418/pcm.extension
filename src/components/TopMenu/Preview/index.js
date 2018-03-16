import React, { Component } from 'react';
import {connect} from 'react-redux';
import Toggle from 'react-toggle'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {togglePro} from '../../../actions';
/*
TODO:
HomePage has been hardcoded, need to retrieve from URL or Redux-store
*/
class Preview extends Component {
  constructor(props){
    super(props);
    this.state={
      isLogin: this.props.isLogin,
      isEditMode: this.props.isEditMode
    }
  }

  render() {
    return (
      <div className="preview_container">
        <select className="previewEdit" disabled={!this.props.isLogin}   onChange={this.channelChange}>
          <option value="Channel" >PREVIEW</option>
          <option value="TabletLarge" >Tablet Large</option>
          <option value="TabletSmall" >Tablet Small</option>
          <option value="MobileLarge" >Mobile Large</option>
          <option value="MobileSmall" >Mobile Small</option>
          <option value="DesktopLarge" >Desktop Large</option>
          <option value="DesktopSmall" >Desktop Small</option>
        </select>
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

Preview.propTypes = {
isLogin: PropTypes.bool.isRequired,
isEditMode: PropTypes.bool.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(Preview);
