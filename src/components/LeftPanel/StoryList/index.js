import React, { Component } from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Story from '../Story';
import StoryListHeader from './StoryListHeader';
import {DNDHelper} from '../../../helper/helper'
import PackageLeadStory from '../Story/PackageLeadStory';

function DragabbleComp(props) {
  return (<Draggable key={props.dragId} draggableId={props.dragId} index={props.index}>
    {(provided, snapshot) => (
      <div>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={DNDHelper.getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style,
              )}
         >
          {props.children}
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>);
}

function DroppableComp(props) {
  return (<Droppable droppableId={props.droppableId} >
    {(provided, snapshot) => (
      <div
        className="panel_body"
        ref={provided.innerRef}
        style={DNDHelper.getListStyle(snapshot.isDraggingOver)}>
        {props.children}
      </div>
    )}
  </Droppable>);
}

class StoryList extends Component{

  constructor(props){
      super(props);
      this.state={
          pkgStoriesHidden: false
      }
  }
  accordionOpen = ()=>{
      this.setState({ pkgStoriesHidden: !this.state.pkgStoriesHidden  });
  };

  getPkgHeader = (row)=>{
    const isPkgStory = true;

    let headerMenuVisible = false;
    if(row.storyid && this.props.menuVisibleId === `p_${row.collectionId}`) {
        headerMenuVisible = true;
    }
    return (
      <div >
        <DragabbleComp dragId={`p_${row.collectionId}`} index={1}>
          <PackageLeadStory
            {...row}
            {...this.props}
            index={1}
            blockIndex={this.props.index}
            storyid={`p_${row.collectionId}`}
            className={isPkgStory ? "pkg_item" : ""}
            storiesHidden={this.state.pkgStoriesHidden}
            menuVisible={headerMenuVisible}
          />
        </DragabbleComp>
      </div>
    );
  };

  getStories = (itemList)=>{
      const isPkgStory = (this.props.type === 'package');
      let count =0;
      const rows = (itemList).map( (row, index)=>{
        count+=1;
        let menuVisible = false;
        if(row.storyid && this.props.menuVisibleId === row.storyid) {
            menuVisible = true;
        }
        const lastStory = (count===itemList.length);
        const bgClass = (row.type === 'pinup' ? "ad_pos" : (row.isCollection && !isPkgStory ? 'colBg' : '' ));
        const showStory = !(this.props.type === 'package' && this.state.pkgStoriesHidden);

        return (
          <div key={index}>
            <DragabbleComp dragId={row.isEmpty? '' : row.storyid} index={index}>
              {showStory &&
                <Story
                  {...row}
                  {...this.props}
                  blockIndex={this.props.index}
                  menuVisible={menuVisible}
                  isLastStory={lastStory}
                  bgClass={bgClass}
                  isContentEditable={row.type === 'pinup' ? false : this.props.isContentEditable}
                  className={isPkgStory ? `pkg_item_${this.props.index}` : ""}
                  accfun={(isPkgStory && index === 0) ? this.accordionOpen : ''}
                  index={index}
                />
              }
            </DragabbleComp>
          </div>
        );
    });
    return rows;
  };

  getStoriesNoDND = (itemList)=>{
    const isPkgStory = (this.props.type === 'package');
    let count =0;
    const rows = (itemList).map( (row, index)=>{
      count+=1;
      let menuVisible = false;
      if(row.storyid && this.props.menuVisibleId === row.storyid) {
          menuVisible = true;
      }
      const lastStory = (count===itemList.length);
      const bgClass = (row.type === 'pinup' ? "ad_pos" : (row.isCollection && !isPkgStory ? 'colBg' : '' ));
      const showStory = !(this.props.type === 'package' && this.state.pkgStoriesHidden);

      return (
        <div key={index}>
          {showStory &&
            <Story
              {...row}
              {...this.props}
              blockIndex={this.props.index}
              className={isPkgStory ? `pkg_item_${this.props.index}` : ""}
              accfun={(isPkgStory && index === 0) ? this.accordionOpen : ''}
              menuVisible={menuVisible}
              isContentEditable={row.type === 'pinup' ? false : this.props.isContentEditable}
              isLastStory={lastStory}
              bgClass={bgClass}
              index={index}
            />
          }
        </div>
      );
    });
    return rows;
  };

  getPinup = (row, index, lastStory) => (<Story
    key={index}
    bgClass={"ad_pos"}
    menuVisible={false}
    blockIndex={this.props.index}
    isCollection={false}
    isContentEditable={false}
    isLastStory={lastStory}
    {...row}
    {...this.props}
    index={index}
    />);

    render(){
      const {moduleName, index, type, moduleIndex} = this.props;
        return(
          <div>
            <div className="module_panel">
              <StoryListHeader
                title={this.props.label || ''}
                moduleType={this.props.type}
                accfun={this.accordionOpen}
                storiesHidden={this.state.pkgStoriesHidden}
             />
              { this.props.type === 'package' &&
                <DroppableComp droppableId={`${moduleName}_${index}_${type}_${moduleIndex}_header`} >
                  { this.getPkgHeader(this.props.data[0] || {})}
                </DroppableComp>
              }
              { this.props.isContentEditable &&
                <DroppableComp droppableId={`${moduleName}_${index}_${type}_${moduleIndex}`} >
                    {this.getStories(this.props.data)}
                </DroppableComp>
              }
              { !this.props.isContentEditable &&
                <div>
                  {this.getStoriesNoDND(this.props.data)}
                </div>
              }
            </div>
          </div>
        )
    }
}

StoryList.propTypes = {
  type: PropTypes.string.isRequired,
  zone: PropTypes.string.isRequired,
  menuVisibleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  moduleName: PropTypes.string.isRequired,
  noOfStories: PropTypes.number.isRequired,
  editMenuOpen: PropTypes.func.isRequired,
  editMenuClose: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isContentEditable: PropTypes.bool.isRequired,
  moduleId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  moduleIndex: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  proUser: PropTypes.bool,
}

StoryList.defaultProps = {
  proUser: false
}
export default StoryList;
