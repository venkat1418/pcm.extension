import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InsertStoryModal from '../../../modals/InsertStoryModal';
import {DrawBorderService} from '../../../../services/DrawBorderService';

class InsertStoryBtn extends Component{

  constructor(props){
      super(props);
      this.state={
          activeStoryid: '',
          showInsertModal: false
      }
  }

  openInsertModal = (e, storyid)=>{
      this.props.hideMenu(this.props.storyid);
      if (this.props.storyid) {
        document.getElementById(this.props.storyid).classList.add("main_story_boxing");
        DrawBorderService.Draw(this.props.storyid, this.props.zone);
      }

      this.setState({
          activeStoryid: storyid,
          showInsertModal: true,
          updateAction: 'Insert',
          isCollection: this.props.pkgHeader
      });
  }

  closeInsertModal = ()=>{
      document.getElementById(this.props.storyid).classList.remove("replaceSelectedStory");
      document.getElementById(this.props.storyid).classList.remove("main_story_boxing");
      if (this.props.storyid) DrawBorderService.Erase(this.props.storyid, this.props.zone);
      this.setState({ showInsertModal: false });
  }

  cancelInsertModal = ()=>{
      if (this.state.updateAction === 'Insert') {
          document.getElementById(this.props.storyid).classList.remove("main_story_boxing");
          if (this.props.storyid) DrawBorderService.Erase(this.props.storyid, this.props.zone);
      }
      document.getElementById(this.props.storyid).classList.remove("replaceSelectedStory");
      this.setState({ showInsertModal: false });
  }

  render() {
    const inserText = this.props.isCollection ? 'Insert Collection' : 'Insert';

    return (this.props.isContentEditable && <div className="inser_Hoverbutton">
      {/* TODO: Fix the button style to get the text as appropriate ie., Insert vs Insert Collection
        <button className="insert" onClick={e => this.openInsertModal(e, this.props.storyid)}> {inserText} </button>
      */}
      <button className="insert" onClick={e => this.openInsertModal(e, this.props.storyid)}> Insert </button>
      <InsertStoryModal
        showModal={this.state.showInsertModal}
        activeStoryid={this.state.activeStoryid}
        updateAction={this.state.updateAction}
        isCollection={this.state.isCollection}
        openInsertModal={this.openInsertModal}
        closeInsertModal={this.closeInsertModal}
        onCancel={this.cancelInsertModal}
        moduleName={this.props.moduleName}
        zone={this.props.zone}
        type={this.props.type}
        blockIndex={this.props.blockIndex}
        pkgId={this.props.pkgId}
        position={this.props.position}
      />
    </div>
    );
  }
}

export default InsertStoryBtn;
