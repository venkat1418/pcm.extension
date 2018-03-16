import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Headline from './Headline';
import {DrawBorderService} from '../../../services/DrawBorderService';
import {InsertStoryService} from '../../../services/InsertStoryService';
import EditMenuBtnGroup from './EditMenuBtnGroup';
import { removeStory, revertHeadlineEdit } from '../../../actions';
import ConfirmDialogModal from '../../modals/ConfirmDialogModal';
import InsertStoryBtn from './InsertStoryBtn';
import popupMessages from '../../../messages/popupMessages';
import ActionPanel from './ActionPanel';
import StoryHeader from './StoryHeader';


class Story extends Component{
    constructor(props){
        super(props);
        this.state={
            editableHeadline: false,
            showModal: false,
            changedHeadline: '',
            confirmOpen: false,
            onClickClose: false,
            insertBtnhover:false,
            showLoadingModal: false

        }
    }
    handleEditableHeadline=(val)=>{
        this.setState({ editableHeadline: val });
    }
    handleChangedHeadline=(val)=>{
        this.setState({ changedHeadline: val });
    }
    isSaveOn = (val) => {
      this.setState({ confirmOpen: val });
    }

    onClickEditHeadline = ()=>{
        this.handleEditableHeadline(true);
        this.props.editMenuOpen(this.props.storyid)
    }

    onClickCloseHeadline = ()=>{
      if (this.state.confirmOpen === true) return;
        if(this.state.changedHeadline) {
          this.setState({ onClickClose: true });
        }
        else{
            this.handleEditableHeadline(false);
            this.setState({ confirmOpen: false });
            this.props.editMenuClose(this.props.storyid)
        }
    }

    highlightText = () => {
        DrawBorderService.Draw(this.props.storyid, this.props.zone);
    }
    removeHighlight = () => {
        DrawBorderService.Erase(this.props.storyid);
    }
    removeStory = () => {
        DrawBorderService.Erase(this.props.storyid, this.props.zone);
        const payload = {
            storyid: this.props.storyid,
            moduleName: this.props.moduleName,
            blockIndex: this.props.blockIndex,
            type: this.props.type
        }
        const storyId = {
          id:this.props.storyid,
          ordinal: this.props.position ? this.props.position: ''
        }

        const removeData = {
          id: "100727362",
          story: [storyId],
          updatedby: this.props.userData.uid,
          relationid: 1,
          cookie:this.props.currentMetadata.cmsAuthToken,
          type: "cnbcnewsstory"
        }
        const result = InsertStoryService.UpdateStory(removeData, 'remove');
        result.then((doc) => {
          this.setState({ result: doc.data });
          }).catch(() => {
          })
        this.props.removeStory(payload);
    }

    showLoading = (val) =>{
      console.log(val);
      this.setState({ showLoadingModal: val});
    }

    onFocus = (e, val) => {
      this.isSaveOn(val);
    }

    closeModal = () => {
      this.setState({onClickClose: false});
    }

    confirmClose = () => {
      this.handleChangedHeadline('');
      this.handleEditableHeadline(false);
      this.setState({ onClickClose: false });
      this.props.editMenuClose(this.props.storyid)
    }

    editStory = () =>{
      this.handleEditableHeadline(true);
    }
    render(){
      const actionBarActions = {
        onClickEditHeadline: this.onClickEditHeadline,
        onClickCloseHeadline : this.onClickCloseHeadline,
        confirmClose : this.confirmClose,
        closeModal : this.closeModal
      }
      const headerBarActions = {
        isSaveOn: this.isSaveOn,
        handleEditableHeadline : this.handleEditableHeadline,
        handleChangedHeadline : this.handleChangedHeadline,
        onFocus : this.onFocus
      }

        return(
          <div>
            <div id={this.props.storyid} className={`news_item ${this.props.className}`} >
              <InsertStoryBtn {...this.props} hideMenu={this.props.editMenuClose} storyIndex={this.props.index} />

              <ActionPanel {...this.props} {...actionBarActions} />

              <div className={this.props.menuVisible?"item_body editBg": `item_body ${  this.props.bgClass}`}>
                <StoryHeader {...this.props} {...headerBarActions} position={this.props.index} />
                <Headline
                  {...this.props}
                  headline={this.props.headline}
                  editableHeadline={this.state.editableHeadline}
                  highlightText={this.highlightText}
                  removeHighlight={this.removeHighlight}
                  handleChangedHeadline={this.handleChangedHeadline}
                  handleEditableHeadline={this.handleEditableHeadline}
                  menuVisible={this.props.menuVisible}
                  onClickCloseHeadline={this.onClickCloseHeadline}
                  className="item_content"
                />
                <EditMenuBtnGroup
                  ref={menu => this.menu = menu}
                  {...this.props}
                  removeStory={this.removeStory}
                  storyIndex={this.props.index}
                  hideMenu={this.props.editMenuClose}
                  changedHeadline={this.state.changedHeadline}
                  handleChangedHeadline={this.handleChangedHeadline}
                  handleEditableHeadline={this.handleEditableHeadline}
                  isSaveOn={this.isSaveOn}
                  editStory={this.editStory}
                />
                <ConfirmDialogModal
                  showModal={this.state.onClickClose}
                  mainDescription={popupMessages.storyEditClose.mainDescription}
                  originalHeadline={popupMessages.storyEditClose.originalHeadline}
                  onConfirm={this.confirmClose}
                  onCancel={this.closeModal}
                  confirmLabel='DISCARD'
                />
              </div>

            </div>
          </div>
        )
    }
}

const mapStateToProps = (state)=>({
  userData: state.userData,
  currentMetadata: state.currentMetadata
})

const mapDispatchToProps = (dispatch)=>bindActionCreators({
  removeStory,
  revertHeadlineEdit
}, dispatch)

Story.propTypes = {
  storyid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isCollection: PropTypes.bool,
  showModal: PropTypes.bool,
  activeStoryid: PropTypes.string,
  updateAction: PropTypes.string,
  moduleName: PropTypes.string.isRequired,
  blockIndex: PropTypes.number,
  type: PropTypes.string.isRequired,
  originalHeadline: PropTypes.string,
  pinModule: PropTypes.string,
  isLastStory: PropTypes.bool.isRequired,
  headline: PropTypes.string,
  revertHeadlineEdit: PropTypes.func.isRequired,
  removeStory: PropTypes.func.isRequired,
  zone: PropTypes.string.isRequired,
  isContentEditable: PropTypes.bool.isRequired,
  menuVisible: PropTypes.bool.isRequired,
  isEmpty: PropTypes.bool,
  isPinned: PropTypes.bool,
  draggableHandle: PropTypes.string,
  index: PropTypes.number.isRequired,
  moduleId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  bgClass: PropTypes.string.isRequired,
  editMenuClose: PropTypes.func.isRequired,
  isOverride: PropTypes.bool,
  editMenuOpen: PropTypes.func.isRequired,
  hideMenu:PropTypes.func,
}

Story.defaultProps = {
  storyid: '',
  headline: '',
  isOverride: false,
  isEmpty: false,
  isPinned: false,
  draggableHandle: '',
  pinModule: '',
  originalHeadline: '',
  blockIndex: 0,
  updateAction: '',
  activeStoryid: '',
  showModal: false,
  isCollection: false
}
export default connect(mapStateToProps, mapDispatchToProps)(Story);
