import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginBtn from './LoginBtn';
import PageEditStatusLabel from './PageEditStatusLabel';
import EmptyStoryIndicator from './EmptyStoryIndicator';
import EditPublishBtn from './EditPublishBtn';
import ProUserToggle from './ProUserToggle';
import Preview from './Preview'
import LeftPanelContainer from '../../containers/LeftPanelContainer';
import { toggleLogin, toggleEditRole } from '../../actions';
import PCMErrorBoundary from '../PCMErrorBoundary'
import pino from '../../logger'

export class TopMenu extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    setEmptyStoryMesage = (noOfEmptyPositions) => {
        this.setState({noOfOpenStories: noOfEmptyPositions});
    }
    render() {
      pino.debug('in TOP MENU Render');
        const leftPanelComp = this.props.isEditMode? <LeftPanelContainer setMsg={this.setEmptyStoryMesage} /> : "";

        return(
          <div className="topLeftBanner">
            <div className="menu_container">
              <LoginBtn />
              <PageEditStatusLabel />
              <Preview />
              <ProUserToggle />
              <EmptyStoryIndicator noOfOpenStories={this.state.noOfOpenStories} isEditMode={this.props.isEditMode} />
              <EditPublishBtn noOfOpenStories={this.state.noOfOpenStories} />
            </div>

            <PCMErrorBoundary>
              {leftPanelComp}
            </PCMErrorBoundary>
          </div>
        );
    }
}

const mapStateToProps = (state)=>({
        isEditMode: state.isEditMode,
        isLogin: state.isLogin
    })
const mapDispatchToProps = (dispatch)=>bindActionCreators({
        toggleLogin,
        toggleEditRole
    }, dispatch)

TopMenu.propTypes = {
  isEditMode: PropTypes.bool.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
