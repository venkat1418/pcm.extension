// TODO: Need to refactor to move the logic to PCM server.

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Loader } from 'react-overlay-loader';
import {NotificationManager} from 'react-notifications';
import 'react-overlay-loader/styles.css';
import PropTypes from 'prop-types';
import {PageStatusService} from '../../../services/PageStatusService';
import {AssetsStatusService} from '../../../services/AssetsStatusService';
import {toggleEditMode} from '../../../actions';
import {AuditLogService} from '../../../services/AuditLogService';
import errHandler from '../../../helper/errHandler';
import ConfirmDialogModal from '../../modals/ConfirmDialogModal';
import messages from '../../../messages/notification';
import popupMessages from '../../../messages/popupMessages';
import Loading from '../../modals/Loading';

export class EditPublishButton extends Component {

    constructor(props){
        super(props);
        this.onUnlockPage = this.onUnlockPage.bind(this);
        this.onUnlockAssets = this.onUnlockAssets.bind(this);
        this.state={
            assetsLockedBy: {},
            showAssetsStatusModal: false,
            pending: false,
            showCommonModal: false,
            showPublishModal: false
        }

    }

    openAssetsModal = ()=>{
        this.setState({ showAssetsStatusModal: true });
    }
    closeAssetsModal = ()=>{
        this.setState({ showAssetsStatusModal: false });
    }

    edit = () => {
        document.getElementById('pcmBody').style.marginLeft = "25%";
        document.getElementById('pcmBody').style.marginRight = "15%";
        if(this.state.pending) return false;
        this.setState({ pending: true });
            // AssetsStatusService.check(this.props.currentMetadata.cmsAuthToken, this.props.currentMetadata.assetsId, this.props.userData.uid).then(resp=>{
    AssetsStatusService.check(this.props.currentMetadata.cmsAuthToken, this.props.currentMetadata.assetsId, this.props.userData,this.props.currentMetadata.pageId).then(resp=>{
            this.setState({ pending: false });
            if(resp.status !== 200){
                NotificationManager.error(`Status is not 200!\n\nCurrent Status is ${resp.status}`)
                return false;
            }
            if(resp.data.error) {
                NotificationManager.error(`Error while checking asset status!`);
                return false;
            }
            if(resp.data.user.length>0){
               // this.onUnlockPage();
               this.setState({ pending: false });
               this.props.toggleEditMode(true);
               this.closeAssetsModal();
               document.getElementById("pcmBody").style.pointerEvents = "none";
            } else if(resp.data.concurrent.length>0){
                this.setState({ assetsLockedBy: resp.data.concurrent[0].user });
                this.openAssetsModal();
            }
        })
        .catch( err=>{ this.setState({ pending: false }); errHandler.notification(err); });
        return null;
    };

    onUnlockAssets(){
        this.setState({ pending: true });
        // AssetsStatusService.unlockThenLock(this.props.currentMetadata.cmsAuthToken, this.props.currentMetadata.assetsId, this.props.userData.uid).then(resp=>{
            AssetsStatusService.unlockThenLock(this.props.currentMetadata.cmsAuthToken, this.props.currentMetadata.assetsId, this.props.userData,this.props.currentMetadata.pageId).then(resp=>{
            this.setState({ pending: false });
            if(resp.status !== 200){
                NotificationManager.error(`Status is not 200!\n\nCurrent Status is ${resp.status}`)
                return false;
            }
            if(resp.data.error){
                NotificationManager.error(`Error while assets lock & unlock!`)
                return false;
            }
            if(resp.data.user.length>0){
               // this.onUnlockPage();
               this.setState({ pending: false });
               this.props.toggleEditMode(true);
               this.closeAssetsModal();
               document.getElementById("pcmBody").style.pointerEvents = "none";
            }
            else{
                NotificationManager.error(`Unlocking asset is failed!`)
            }
        })
        .catch( err=>{ this.setState({ pending: false }); errHandler.notification(err); });
    }

    onUnlockPage(){
        this.setState({ pending: true });
        PageStatusService.unlockPage(this.props.currentMetadata.pageId, this.props.userData).then(resp=>{
            this.setState({ pending: false });
            if(resp.data === 'yes'){
                const logData={
                    action: 'unlock_page',
                    pageId: this.props.currentMetadata.pageId,
                    user: this.props.userData,
                    updatedAt: new Date().getTime()
                }
                AuditLogService.logAuditLog(logData).then(resp=>{});
                this.setState({ pending: true });
                PageStatusService.lockPage(this.props.currentMetadata.pageId, this.props.userData).then(resp=>{
                    this.setState({ pending: false });
                    if(resp.data === 'yes'){
                        const logData={
                            action: 'lock_page',
                            pageId: this.props.currentMetadata.pageId,
                            user: this.props.userData,
                            updatedAt: new Date().getTime()
                        }
                        AuditLogService.logAuditLog(logData).then(resp=>{});
                        this.props.toggleEditMode(true);
                        this.closeAssetsModal();
                        document.getElementById("pcmBody").style.pointerEvents = "none";
                    }
                })
                .catch(err=>{ this.setState({ pending: false }); NotificationManager.error(`Error while locking page!`) })
            }
        })
        .catch(err=>{ this.setState({ pending: false }); NotificationManager.error(`Error while unlocking page!`) })
    }

    publish = () => {
        this.setState({ showPublishModal: true });
    };

    onPublish = () =>{
      if(this.state.pending) return false;
      this.setState({ pending: true, showPublishModal: false });
      Promise.all([
          PageStatusService.unlockPage(this.props.currentMetadata.pageId, this.props.userData),
          AssetsStatusService.removeLock(this.props.currentMetadata.cmsAuthToken, this.props.currentMetadata.assetsId, this.props.userData.uid)
      ]).then(resp=>{
          this.setState({ pending: false });
          if(resp[0].data !== 'yes'){
              NotificationManager.error(`Unlocking page is failed!`)
              return false;
          }
          if(resp[1].status !== 200){
              NotificationManager.error(`Status is not 200!\n\nCurrent Status is ${resp[1].status}!`)
              return false;
          }
          if(!resp[1].data){
              NotificationManager.error(`Unlocking asset is failed!`)
              return false;
          }
          const logData={
              action: 'unlock_page',
              pageId: this.props.currentMetadata.pageId,
              user: this.props.userData,
              updatedAt: new Date().getTime()
          }
          AuditLogService.logAuditLog(logData).then(resp=>{});
          this.props.toggleEditMode(false);
          NotificationManager.success(messages.publishMessage);
          document.getElementById("pcmBody").style.pointerEvents = "auto";
      })
      .catch(err=>{ this.setState({ pending: false }); })
    }

    onCancelPublish = () =>{
        this.setState({showPublishModal: false});
    }

    discard = (e)=>{
        if(this.state.pending) return false;
        if(this.props.isPageDirty) {
            e.preventDefault();
            this.setState({showCommonModal: true});
        } else {
            this.props.toggleEditMode(false);
            document.getElementById('pcmBody').style.marginLeft = '20%';
            document.getElementById('pcmBody').style.marginRight = '20%';
            NotificationManager.info(messages.discardButtonMsg_unlock);
        }
        return null;
    }

    onDiscard = (e) =>{
        this.setState({showCommonModal: false});
        this.props.toggleEditMode(false);
        NotificationManager.info(messages.discardButtonMsg_confirm);
        document.getElementById('pcmBody').style.marginLeft = '20%';
        document.getElementById('pcmBody').style.marginRight = '20%';
    }
    onCancelDiscard = () =>{
        this.setState({showCommonModal: false});
    }

    render() {
      const lockedBy = `${this.state.assetsLockedBy.name} is currently editing this page`;
        return (
          <div className="editPublishComp">
            {
                    /* <button className="edit_toggle_button" disabled={!this.props.isLogin} onClick={(this.props.isEditMode? this.discard:this.edit)}>{(this.props.isEditMode?"DISCARD":"EDIT")}</button> */

                    this.props.isEditMode?
                      <button className="edit_toggle_button" disabled={!this.props.isLogin} onClick={this.discard}>DISCARD</button>
                    :
                      <button className="edit_toggle_button" disabled={!this.props.isLogin} onClick={this.edit}>EDIT</button>

                }
            <button className="publishButton" disabled={!this.props.isEditMode || this.props.noOfOpenStories !== 0} onClick={this.publish}>PUBLISH</button>
            {/*
                    this.props.isEditMode?
                    <img alt="" className={"lock "+(this.props.isLogin ? "": "disabledItem")} height="40px" src="images/lock.png" onClick={this.props.isLogin? this.discard : ''} />
                    :
                    <img alt="" className={"lock "+(this.props.isLogin ? "": "disabledItem")} height="40px" src="images/unlock2.png" onClick={this.props.isLogin? this.edit : ''}/>
                */}
            <ConfirmDialogModal
              showModal={this.state.showAssetsStatusModal}
              mainDescription={popupMessages.editLocked.mainDescription}
              originalHeadline={lockedBy}
              onConfirm={this.onUnlockAssets}
              onCancel={this.closeAssetsModal}
              confirmLabel='UNLOCK'
                />
            <ConfirmDialogModal
              showModal={this.state.showCommonModal}
              mainDescription={popupMessages.discardPage.mainDescription}
              originalHeadline={popupMessages.discardPage.originalHeadline}
              onConfirm={this.onDiscard}
              onCancel={this.onCancelDiscard}
              confirmLabel='DISCARD'
                />
            <ConfirmDialogModal
              showModal={this.state.showPublishModal}
              mainDescription={popupMessages.publishPage.mainDescription}
              originalHeadline={popupMessages.publishPage.originalHeadline}
              onConfirm={this.onPublish}
              onCancel={this.onCancelPublish}
              confirmLabel='PUBLISH'
                />

                <Loading
                    showLoadingModal={this.state.pending}
                  />
          </div>
        );
    }
};

const mapStateToProps = (state)=>({
        isLogin: state.isLogin,
        isEditMode: state.isEditMode,
        userData: state.userData,
        currentMetadata: state.currentMetadata,
        isPageDirty: state.data.isPageDirty
    })
const mapDispatchToProps = (dispatch)=>bindActionCreators({
        toggleEditMode
    }, dispatch)

EditPublishButton.propTypes = {
  userData: PropTypes.object.isRequired,
  currentMetadata: PropTypes.object.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool.isRequired,
  noOfOpenStories: PropTypes.number,
  isPageDirty: PropTypes.bool.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPublishButton);
