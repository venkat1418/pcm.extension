import React, { Component } from 'react';
import {connect} from 'react-redux';
import Toggle from 'react-toggle'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {togglePro} from '../../../actions';

class ProUserToggle extends Component {

  handleProChange = (e) => {
    this.props.togglePro(e.target.checked);
  }

  render() {
    return (<div className="pageNameLabel_container">
      <div className="proNameLabel">PRO USER: </div>
      <label>
        <Toggle
          defaultChecked={false}
          onChange={this.handleProChange}
          disabled={!this.props.isLogin}
          />
      </label>
      <div className="menuSeperator_label" /></div>
    );
  }
}

const mapStateToProps = (state)=>({
      isLogin: state.isLogin
  })
const mapDispatchToProps = (dispatch)=>bindActionCreators({
        togglePro
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProUserToggle)
