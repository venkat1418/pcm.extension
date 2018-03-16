import React, { Component } from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {NotificationManager} from 'react-notifications';
import PropTypes from 'prop-types';
import Module from './Module';
import {DNDHelper} from '../../helper/helper';
import messages from '../../messages/notification';


class LeftPanel extends Component {
    constructor(props){
        super(props);
        this.state={
            dndResult: {}
        }
    }
    onDragStart = ()=>{
      (document.getElementsByTagName("body")[0]).classList.add('body_no_scroll');
    }

    onDragEnd = (result)=>{
        (document.getElementsByTagName("body")[0]).classList.remove('body_no_scroll');
        if(!result.destination){
            return;
        }
        if (!result.draggableId ){
          return;
        }
        // let startStoryId = result.draggableId;
        const reorderData = DNDHelper.getEndStoryid(result, this.props.data);
        if (!reorderData) return;
        this.props.onReorder(reorderData);
        NotificationManager.success(messages.reOrder);
    }

    getModules = (moduleList) => {
        const rows = moduleList.map( (row, index) => (
          <Module
            key={index}
            name={row.name}
            zone={row.zone}
            content={row.blocks}
            source={row.source}
            sourceName={row.sourceName? row.sourceName:''}
            moduleId={row.moduleId}
            moduleIndex={index}
            details={row.details}
            editable={row.editable}
            display={row.display}
            proUser={row.proUser}
            />
          ));
        return rows;
    };

    render(){
        return (
          <div className="left_nav_panel">
            <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
              <div className="left_nav_body">
                {this.getModules(this.props.data)}
              </div>
            </DragDropContext>
          </div>
        );
    };
  }

LeftPanel.propTypes = {
  data: PropTypes.array.isRequired,
  onReorder: PropTypes.func.isRequired,
}

export default LeftPanel;
