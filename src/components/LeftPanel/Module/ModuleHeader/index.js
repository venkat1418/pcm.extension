import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip'
import {Icon} from 'react-fa';
import ChangeLayoutBtn from '../ChangeLayoutBtn';
import ChangeSectionModal from '../../../modals/ChangeSourceModal';
import Loading from '../../../modals/Loading';

export default class ModuleHeader extends Component{
  constructor(props){
    super(props);
    this.state={
      showChangeSectionModal: false,
      showLoadingModal: false
    }
  }

  openChangeSectionModal = ()=>{
    this.setState({ showChangeSectionModal: true });
  }

  closeChangeSectionModal = ()=>{
    this.setState({ showChangeSectionModal: false });
  }

  showLoading = (val) =>{
    this.setState({ showLoadingModal: val});
  }

  render(){

    const sName = (this.props.sourceName !== '') ? ` - ${this.props.sourceName}` :''
    const infoMsg = ` ${this.props.source} ${sName}`
    return(
      <div className="left_header">
        <div className="left_header_title">
          <div className="zone_title">
            ZONE: {this.props.zone}
          </div>
          <div className="left_header_title">
            {this.props.title.toLowerCase()}<br />
            {this.props.details.toLowerCase()}
          </div>
          <div data-tip={infoMsg}> &nbsp;<Icon  name="info-circle" /> </div>
          <ReactTooltip />
        </div>
        <div className="left_header_button">
          {
            this.props.editable===true &&
            <div className="wrapper">
              <ChangeLayoutBtn
                zone={this.props.zone}
                source={this.props.source}
                moduleId={this.props.moduleId}
                moduleIndex={this.props.moduleIndex}
              />

                {
                this.props.source !== 'self' &&
                <div>
                  <button
                    className="cus_btn"
                    onClick={this.openChangeSectionModal} >
                      CHANGE SECTION
                  </button>
                  <ChangeSectionModal
                    moduleIndex={this.props.moduleIndex}
                    showModal={this.state.showChangeSectionModal}
                    showLoading={this.showLoading}
                    onCancel={this.closeChangeSectionModal}
                  />
                  <Loading
                    showLoadingModal={this.state.showLoadingModal}
                  />
                </div>
                }
              </div>
          }
          { this.props.editable===false && <img alt="" height="40px" src="images/lock.png" /> }
        </div>
      </div>
    )
  }
}

ModuleHeader.propTypes = {
  zone: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  moduleId: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  moduleIndex: PropTypes.number.isRequired,
  sourceName: PropTypes.string
}

ModuleHeader.defaultProps = {
  sourceName: ''
}
