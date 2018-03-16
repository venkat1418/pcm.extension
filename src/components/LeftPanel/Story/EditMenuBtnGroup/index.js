import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NotificationManager} from 'react-notifications';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import {Icon} from 'react-fa';
import _ from 'lodash';
import { pinStory, unPinStory, editHeadline } from '../../../../actions';
import InsertStoryModal from '../../../modals/InsertStoryModal';
import {DrawBorderService} from '../../../../services/DrawBorderService';
import ConfirmDialogModal from '../../../modals/ConfirmDialogModal';
import messages from '../../../../messages/notification';
import popupMessages from '../../../../messages/popupMessages';


function EditButtonBar(props){
  return (<div
    className="edit_menu_btn_group"
    style={props.menuVisible === false ? {display: 'none'} : {}}
    onMouseOver={e => props.onFocus(e, true)}
    onMouseOut={e => props.onFocus(e, false)}>
    {props.children}
  </div>);
}

function PkgEditButtons(props){
  return (<EditButtonBar {...props}>
    <div className="trash_position">
      <Icon name="trash trash_insert" className="trashIcon"  onClick={e => props.remove(e, props.storyid)} />
    </div>
    <button
      className="btn_menu_action_save"
      disabled={!props.changedHeadline}
      onMouseOver={e => props.onFocus(e, true)}
      onMouseOut={e => props.onFocus(e, false)}
      onClick={() => props.saveHeadline()}>SAVE EYEBROW</button>
  </EditButtonBar>);
}

function StoryEditButtons(props){
  return (!props.isEmpty && <EditButtonBar {...props}>
    <div className="trash_position">
      <Icon name="trash trash_insert" className="trashIcon"  onClick={e => props.remove(e, props.storyid)} />
      <Icon name="thumb-tack" className="trashIcon"  />
    </div>
    <div className="btn_menugroup">
      {
      props.isOverride ?
      <button
        className="pcm_label"
        onClick={props.revert}><Icon name="undo"  /> REVERT</button>:<button
          className="pcm_label_disable"
          disabled="disabled"><Icon name="undo"  /> REVERT</button>
   }
      {!props.editActivate ?
        <button
          className="btn_menu_action"
          onMouseOver={e => props.onFocus(e, true)}
          onMouseOut={e => props.onFocus(e, false)}
          onClick={() => props.editStory()}>
          <Icon name="pencil-square" className="pencilSquareIcon" />EDIT STORY</button> :
        <button
          className="btn_menu_action_save"
          disabled={!props.changedHeadline}
          onMouseOver={e => props.onFocus(e, true)}
          onMouseOut={e => props.onFocus(e, false)}
          onClick={() => props.saveHeadline()}>SAVE HEADLINE</button> }
    </div>
  </EditButtonBar>);
}

class EditMenuBtnGroup extends Component{

    constructor(props){
        super(props);
        this.state={
            activeStoryid: '',
            disableSaveBtn: true,
            showInsertModal: false,
            showCommonModal: false,
            editActivate:true,
            showModal: false,
            confirmOpen: false,
        }
    }
    componentDidMount(){
        this.setState({disableSaveBtn: this.props.sameContent});
    }

    componentWillReceiveProps(nextProps){
        this.setState({disableSaveBtn: nextProps.sameContent});
    }

    replace = (e, storyid) => {
        e.preventDefault();
        this.props.hideMenu(this.props.storyid);
        document.getElementById(storyid).classList.add("replaceSelectedStory");
        this.setState(
            {activeStoryid: storyid, showInsertModal: true, updateAction: 'Replace' }
        );
    }

    revert = () => {
      this.setState({ confirmOpen: true });
      this.setState({showModal: true});
      this.props.isSaveOn(true);
    }

    confirmRevert = () => {
        const payload = {
            storyid: this.props.storyid,
            moduleName: this.props.moduleName,
            blockIndex: this.props.blockIndex,
            type: this.props.type
        }
        this.props.revertHeadlineEdit(payload);

        this.props.handleEditableHeadline(false);
        this.props.handleChangedHeadline('');
        this.setState({showModal: false});
        NotificationManager.info(messages.revertAction);
        this.setState({ confirmOpen: false });
        this.props.isSaveOn(false);
        this.props.editMenuClose(this.props.storyid);
    }
    closeRevertModal = () => {
      this.setState({showModal: false});
      this.setState({ confirmOpen: false });
      this.props.editMenuClose(this.props.storyid);
    }

    remove = (e) => {
        e.preventDefault();
        this.setState({showCommonModal:true});
    };

    confirmRemove = () => {
        this.props.removeStory();
        this.setState({showCommonModal:false});
    }

    closeRemove = () =>{
        this.setState({showCommonModal:false});
    }

    unPinStory = (e, storyid) => {
        e.preventDefault();
        if (this.props.storyid) DrawBorderService.Erase(this.props.storyid, this.props.zone);
        this.props.hideMenu(this.props.storyid);
        swal(`Story with id ${this.props.storyid} will be un pinned`).then((value) => {
            if (value === true) {
            const payload = {
                storyid,
                moduleId: this.props.moduleId
            };
            this.props.unPinStory(payload);
            }
        });
    };

    pinStory = (e, storyid) => {
        e.preventDefault();
        if (this.props.storyid) DrawBorderService.Erase(this.props.storyid, this.props.zone);
        this.props.hideMenu(this.props.storyid);
        swal(`Story with id ${this.props.storyid} will be pinned to the current position`).then((value) => {
            if (value === true) {
                const payload = {
                    storyid,
                    moduleId: this.props.moduleId,
                    position: this.props.storyIndex
                };
                this.props.pinStory(payload);
            }
        });
    };

    saveHeadline = () => {
        this.props.hideMenu(this.props.storyid);
        const payload = {
            storyid: this.props.storyid,
            moduleName: this.props.moduleName,
            blockIndex: this.props.blockIndex,
            type: this.props.type,
            newHeadline: this.props.changedHeadline
        }
        this.props.editHeadline(payload);
        this.props.handleEditableHeadline(false);
        this.props.handleChangedHeadline('');
        this.props.isSaveOn && this.props.isSaveOn(false);
        NotificationManager.info(`${messages.saveHeadlineMsg}${this.props.changedHeadline}`);
       }

    onFocus = (e, val) => {
      this.props.isSaveOn && this.props.isSaveOn(val);
    }

    editStory = () =>{
      this.props.editStory();
      this.setState({editActivate:true});
    }
    render(){
      const editBarActions = {
        onFocus: this.onFocus,
        openColInsertModal : this.openColInsertModal,
        openInsertModal : this.openInsertModal,
        remove : this.remove,
        saveHeadline : this.saveHeadline,
        editStory: this.editStory,
        revert: this.revert
      }

      const instStoryProps = _.pick(this.props, ['moduleName', 'zone', 'type', 'blockIndex']);
      const instStoryState = _.pick(this.state, ['showInsertModal', 'activeStoryid', 'updateAction', 'isCollection']);

      return(
        <div >
          {this.props.isPkgHeader && <PkgEditButtons {...this.props} {...editBarActions} /> }

          {!this.props.isPkgHeader && <StoryEditButtons {...this.props} {...this.state} {...editBarActions} /> }

          <InsertStoryModal
            showModal={this.state.showInsertModal}
            {...instStoryState}
            openInsertModal={this.openInsertModal}
            closeInsertModal={this.closeInsertModal}
            onCancel={this.cancelInsertModal}
            {...instStoryProps}
          />

          <ConfirmDialogModal
            showModal={this.state.showCommonModal}
            mainDescription={this.props.isPkgHeader ? popupMessages.removePopup.mainDescription1 : popupMessages.removePopup.mainDescription}
            originalHeadline={this.props.isPkgHeader ? popupMessages.removePopup.originalHeadline1 : popupMessages.removePopup.originalHeadline}
            onConfirm={this.props.isPkgHeader ? this.closeRemove : this.confirmRemove}
            onCancel={this.closeRemove}
            confirmLabel='REMOVE'
          />

          <ConfirmDialogModal
            showModal={this.state.showModal}
            mainDescription={popupMessages.revertPopup.mainDescription}
            originalHeadline={this.props.originalHeadline}
            onConfirm={this.confirmRevert}
            onCancel={this.closeRevertModal}
          />

        </div>
      )
    }
}

const mapStateToProps = (state)=>({

})

const mapDispatchToProps = (dispatch)=>bindActionCreators({
        pinStory,
        unPinStory,
        editHeadline
    }, dispatch)

EditMenuBtnGroup.propTypes = {
  sameContent: PropTypes.bool,
  storyid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  zone: PropTypes.string,
  moduleId: PropTypes.string,
  storyIndex: PropTypes.number,
  moduleName: PropTypes.string.isRequired,
  blockIndex: PropTypes.number,
  type: PropTypes.string.isRequired,
  changedHeadline: PropTypes.string,
  editHeadline: PropTypes.func.isRequired,
  handleEditableHeadline: PropTypes.func,
  handleChangedHeadline: PropTypes.func,
  hideMenu: PropTypes.func.isRequired,
  removeStory: PropTypes.func,
  unPinStory: PropTypes.func.isRequired,
  pinStory:  PropTypes.func.isRequired,
  isEmpty: PropTypes.bool,
  isPkgHeader: PropTypes.bool,
  isSaveOn: PropTypes.func,
  menuVisible: PropTypes.bool.isRequired,
  editStory: PropTypes.func
}

EditMenuBtnGroup.defaultProps = {
  zone: '',
  moduleId: '',
  storyIndex: 0,
  changedHeadline: '',
  isEmpty: false,
  blockIndex: 0,
  storyid: '',
  isPkgHeader: false,
  sameContent: false
}
export default connect(mapStateToProps, mapDispatchToProps)(EditMenuBtnGroup);
