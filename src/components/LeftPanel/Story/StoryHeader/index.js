import React, { Component } from 'react';

class StoryHeader extends Component{


  render() {
    return (
      <div className="item_header">
        <span className="item_title">{`Position ${  this.props.position + 1}`}</span>
        <div onMouseOver={e => this.props.onFocus(e, true)} onMouseOut={e => this.props.onFocus(e, false)}>
          { (this.props.isOverride === true) && <span className="item_Edited"> Edited </span> }
        </div>
        {
          (this.props.isCollection === true && this.props.type !== 'package'
            && this.props.collectionId.includes) ?
            <span>Unsaved Collection</span>
            :
            <span>{this.props.storyType}&nbsp;</span>
        }
        {
          (this.props.isPinned === true && this.props.moduleId === this.props.pinModule) &&
          <span> Pinned </span>
        }
      </div>
    )
  }
}

export default StoryHeader;
