import React, { Component } from 'react';
import {Icon} from 'react-fa';

class ActionPanel extends Component{

  render()
  {
    const bgClassNews= `news_action_w ${  this.props.bgClass}`;
    return ((this.props.isContentEditable === true && !this.props.isEmpty) ?
      (<div className={this.props.menuVisible?"editBg":bgClassNews}>
        <div className="news_action_icon">
          { !this.props.menuVisible ?
            <div>
              <Icon name="pencil"  className="pencilIcon"  onClick={this.props.onClickEditHeadline} />
              {(!this.props.isEmpty && !this.props.isPinned) && <Icon name="bars" className="dragIcon" />}
            </div>
            :
            <Icon name="times" onClick={this.props.onClickCloseHeadline} />
          }
        </div>
      </div>)
        :
      <div className={bgClassNews}><div className="news_action_icon" /></div>)
    ;
  }
}

export default ActionPanel;
