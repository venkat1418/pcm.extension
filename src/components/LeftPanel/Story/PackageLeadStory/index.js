import React, { Component } from 'react';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import InsertStoryBtn from '../InsertStoryBtn';
import Headline from '../Headline';
import EditMenuBtnGroup from '../EditMenuBtnGroup';
import { removeStory, editHeadline } from '../../../../actions';

class PackageLeadStory extends Component{
    constructor(props){
        super(props);
        this.state={
            menuVisible: false,
            newContent: '',
            eyeBrowEdit: false,
            storiesHidden: false,
            editHeadline: false
        };
    }
    onEndEdit = (newContent)=>{
        this.setState({ newContent});
    }

    editHeadline = ()=>{
        this.setState({editHeadline: true});
        this.props.editMenuOpen(this.props.storyid);
    }

    getStoriesWords = ()=>{
        const numbers = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
        return numbers[this.props.noOfStories] || '';
    }

    handleEditableHeadline=(val)=>{
        this.setState({ editableHeadline: val });
    }
    handleChangedHeadline=(val)=>{
        this.setState({ changedHeadline: val });
    }

    render(){
        const newsLeadClass = this.props.menuVisible ? 'news_item_lead_with_menu' : 'news_item_lead';
        return(
          <div>
          <div id={this.props.storyid} className={`${newsLeadClass} ${this.props.className}`} >
            <InsertStoryBtn
              {...this.props}
              isCollection
              hideMenu={this.props.editMenuClose}
              storyIndex={this.props.index}
              pkgHeader={true}
              />
            <div className="news_action_w">
              <div className="news_action_icon">
                {!this.props.menuVisible ?
                  <div>
                    <Icon name="pencil" className="pencilIcon"  onClick={this.editHeadline} />
                    {
                      this.props.storiesHidden === true && <Icon name="bars" className="dragIcon" />
                    }
                  </div>
                  :
                  <Icon  name="times" onClick={() => this.props.editMenuClose(this.props.storyid)} />
                }
              </div>

            </div>

            <div className="item_body">
              <div className="item_header_package">
                <span className="item_title">  Package Header</span>
              </div>
              <Headline
                headline={this.props.eyebrow ? this.props.eyebrow : 'Add Eyebrow'}
                inlineEditable={this.state.editHeadline}
                onEndEdit={this.onEndEdit}
                editableHeadline={this.state.editHeadline}
                handleChangedHeadline={this.handleChangedHeadline}
                handleEditableHeadline={this.handleEditableHeadline}
                menuVisible={this.props.menuVisible}
                onClickCloseHeadline={this.props.editMenuClose}
                className="item_content_eyebrow"
                isPkgHeader
              />
              <EditMenuBtnGroup
                ref={menu => this.menu = menu}
                storyid={this.props.storyid}
                moduleName={this.props.moduleName}
                type={this.props.type}
                blockIndex={this.props.blockIndex}
                menuVisible={this.props.menuVisible}
                sameContent={this.props.headline === this.state.headline}
                hideMenu={this.props.editMenuClose}
                isPkgHeader
              />
              {   this.props.storiesHidden === true &&
                <div className="collapse_message"> {this.getStoriesWords()} Additional Stories </div>
              }
              <br />
            </div>
          </div>
          </div>
        )
    }
}

const mapStateToProps = (state)=>({

})

const mapDispatchToProps = (dispatch)=>bindActionCreators({
        removeStory,
        editHeadline
    }, dispatch)

  PackageLeadStory.propTypes = {
    eyebrow: PropTypes.string,
    storyid: PropTypes.string.isRequired,
    editMenuOpen: PropTypes.func.isRequired,
    noOfStories: PropTypes.number.isRequired,
    menuVisible: PropTypes.bool.isRequired,
    editMenuClose: PropTypes.func.isRequired,
    moduleName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    blockIndex: PropTypes.number,
    headline: PropTypes.string.isRequired,
    storiesHidden: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
  }

PackageLeadStory.defaultProps = {
  eyebrow: '',
  blockIndex: 1
}
export default connect(mapStateToProps, mapDispatchToProps)(PackageLeadStory);
