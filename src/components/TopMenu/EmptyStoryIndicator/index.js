import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContentStatusLabel extends Component {
  constructor(props){
      super(props);
      this.state={
      }
  }

    render() {

        const message = (this.props.noOfOpenStories > 0 && this.props.isEditMode) ?
          (<div className="horizontal_flex">There are <span className="currentEmptyCount">
            <span className="red_count">{this.props.noOfOpenStories}</span> empty positions</span> on this page</div>) :
          <div className="horizontal_flex">Status of the page</div>;
        return (
          <div className="statusLabelComp">
            <div className="contentStatusLabel">
              {message}
            </div>
          </div>
        );
    }
};


ContentStatusLabel.propTypes = {
  noOfOpenStories: PropTypes.number,
  isEditMode: PropTypes.bool.isRequired
}

export default ContentStatusLabel;
