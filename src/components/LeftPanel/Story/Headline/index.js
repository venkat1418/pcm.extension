import React, { Component } from 'react';
import ClickOutside from 'react-click-outside';
import PropTypes from 'prop-types';
import CustomTextarea from '../../CustomTextArea';

export default class Headline extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    onChangeTextarea = (value)=>{
        this.props.handleChangedHeadline(value);
    }

    clickedOutside = () => {
      this.props.onClickCloseHeadline();
    }
    render(){
        return(
          <div className={this.props.menuVisible ? "editBg" : ""}>
            <div className={this.props.className || "item_content"}>
              {   this.props.editableHeadline && this.props.menuVisible
                ?
                  <ClickOutside onClickOutside={this.clickedOutside} >
                    <CustomTextarea
                      onChangeTextarea={this.onChangeTextarea}
                      headline={this.props.headline}
                      changedHeadline={this.props.changedHeadline}
                      handleChangedHeadline={this.props.handleChangedHeadline}
                      onBlur={this.clickedOutside}
                      isPkgHeader={this.props.isPkgHeader}
                    />
                  </ClickOutside>
                :
                  <span>
                    {this.props.headline}
                  </span>
              }
            </div>
          </div>
        )
    }
}

Headline.propTypes = {
  headline: PropTypes.string,
  changedHeadline: PropTypes.string,
  onClickCloseHeadline: PropTypes.func.isRequired,
  handleChangedHeadline: PropTypes.func.isRequired,
  handleEditableHeadline: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  editableHeadline: PropTypes.bool,
  menuVisible: PropTypes.bool,
}

Headline.defaultProps = {
  changedHeadline: '',
  editableHeadline: false,
  menuVisible: false,
  headline: ''
}
