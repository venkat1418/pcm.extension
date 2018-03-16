import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import LayoutImages from './LayoutImages';
import LeftNavBtn from './LeftNavBtn';
import SaveCancelBtns from './SaveCancelBtns';
import RightNavBtn from './RightNavBtn';
import {changeLayoutServices} from '../../services/changeLayoutServices';

class ChangeLayoutOverlay extends Component {

    componentWillMount() {
      const recsPerPage = 8; // to be calculated baded on page size
      this.setState({
        pageNumber: 1,
        layoutSelected:"",
        layoutData: [],
        totalPageCount: 1,
        recsPerPage
      });
      changeLayoutServices.getLayoutData(this.props.zone).then(
          resp=>{
            const count = Math.ceil(resp.data/recsPerPage);
            this.setState({ layoutData: resp.data, totalPageCount: count });
          }
      );
    };

    changePage = (row) =>{
        this.setState({ pageNumber: row });
        const elements = document.getElementsByClassName("currentLayout");
        elements.forEach((element) => {element.classList.remove("currentLayout");})
        setTimeout(() => { this.layoutSelectionPageChange()} ,100 );
    }

    layoutSelectionPageChange = () => {
      const {pageNumber, recsPerPage, layoutData, layoutSelected } = this.state;

      const pageStartIndex = (pageNumber-1) *(recsPerPage);
      const pageEndIndex = (pageStartIndex + recsPerPage) < layoutData.length
          ? pageStartIndex + recsPerPage : layoutData.length;

      _.range(pageStartIndex, pageEndIndex).forEach((count) => {
        if(this.props.moduleId === layoutData[count].moduleId && layoutSelected !== "") {
            document.getElementById(`layoutSelect${this.props.moduleId}`).classList.remove("currentLayout");
        }
        else {
          document.getElementById(layoutData[count].moduleId).classList.add("layoutRowsNonSelect");
        }
        if(layoutSelected === `layoutSelect${layoutData[count].moduleId}`){
            document.getElementById(layoutSelected).classList.add("currentLayout");
            document.getElementById(layoutData[count].moduleId).classList.remove("layoutRowsNonSelect");
            document.getElementById(layoutData[count].moduleId).classList.add("layoutRows");
        }
      });
    }

    layoutIdSelected = (id) => {
        this.setState({ layoutSelected: id });
    }

    render() {
        if(this.props.showOverlay) {
            return (
              <div className='changeLayout'>
                <div id="cl_container" className='changeLayout_Container'>
                  <SaveCancelBtns
                    moduleIndex={this.props.moduleIndex}
                    currentModule={this.props.moduleId}
                    layoutData={this.state.layoutData}
                    changeLayoutClose={this.props.changeLayoutClose}
                    selected={this.state.layoutSelected}
                        />
                  <span className="changeLayoutSpan">CHANGE LAYOUT</span>
                  <LeftNavBtn pageNumber={this.state.pageNumber} changePage={this.changePage} />
                  <LayoutImages
                    moduleId={this.props.moduleId}
                    layoutData={this.state.layoutData}
                    pageNumber={this.state.pageNumber}
                    totalPageCount={this.state.totalPageCount}
                    layoutIdSelected={this.layoutIdSelected}
                    recsPerPage={this.state.recsPerPage} />
                  <RightNavBtn
                    pageNumber={this.state.pageNumber}
                    changePage={this.changePage}
                    totalPageCount={this.state.totalPageCount} />
                </div>
              </div>
            );
        }
        return null;
    }
};

ChangeLayoutOverlay.propTypes = {
  moduleId: PropTypes.string.isRequired,
  zone: PropTypes.string.isRequired,
  moduleIndex: PropTypes.number.isRequired,
  showOverlay: PropTypes.bool.isRequired,
  changeLayoutClose: PropTypes.func.isRequired
}

export default ChangeLayoutOverlay;
