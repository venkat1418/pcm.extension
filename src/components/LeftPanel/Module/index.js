import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModuleHeader from './ModuleHeader';
import StoryList from '../StoryList'

export default class Module extends Component {

    constructor(props){
        super(props);
        this.state={
          menuVisibleId: ""
        }
    }

    editMenuOpen = (id)=>{
      this.setState({
         menuVisibleId: id
      });
    }

    editMenuClose = ()=>{
      this.setState({
         menuVisibleId: ""
      });
    }

    getStoryListSections = (contentSectionList) => {

      const rows = contentSectionList.map( (row, index) => {
        const isContentEditable = (this.props.source === 'self');

        return ( <StoryList
          key={index}
          index={index}
          moduleName={this.props.name}
          label={row.label}
          isContentEditable={isContentEditable}
          editMenuOpen={this.editMenuOpen}
          editMenuClose={this.editMenuClose}
          menuVisibleId={this.state.menuVisibleId}
          {...row}
          {...this.props}
          />);
      });
      return rows;
    };

    render(){
      const moduleContent = this.props.content;
        return(
          this.props.display &&<div>
            <ModuleHeader
              title={this.props.name}
              zone={this.props.zone}
              source={this.props.source}
              moduleId={this.props.moduleId}
              moduleIndex={this.props.moduleIndex}
              details={this.props.details}
              editable={this.props.editable}
              sourceName={this.props.sourceName} />

            <div className="module_content_body">
              {this.getStoryListSections(moduleContent)}
            </div>
          </div>
        );
    }
}

Module.propTypes = {
  source: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  moduleId: PropTypes.string.isRequired,
  zone: PropTypes.string.isRequired,
  dndResult: PropTypes.string,
  moduleIndex: PropTypes.number.isRequired,
  proUser: PropTypes.bool,
  content: PropTypes.array.isRequired,
  display: PropTypes.bool.isRequired,
  details: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  sourceName: PropTypes.string
}
Module.defaultProps = {
  dndResult: '',
  proUser: false,
  sourceName: ''
}
