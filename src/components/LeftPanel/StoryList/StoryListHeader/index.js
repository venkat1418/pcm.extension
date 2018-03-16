import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class StoryListHeader extends Component{
  constructor(props){
      super(props);
      this.state={
          storiesHidden: false
      }
  }

  render(){
      return(
        <div>
          <div className="panel_header">
            <span className="panel_title">{this.props.title}</span>
            {this.props.moduleType === 'package' &&
              <span
                className={this.props.storiesHidden ? "upArrow" : "downArrow"}
                onClick={this.props.accfun}  />
            }
          </div>
        </div>
      );
  }
}

StoryListHeader.propTypes = {
  title: PropTypes.string.isRequired,
  moduleType: PropTypes.string.isRequired,
  storiesHidden: PropTypes.bool.isRequired,
  accfun: PropTypes.func.isRequired,
}
