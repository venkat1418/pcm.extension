import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {changeLayout} from '../../../actions';
import ConfirmDialogModal from '../../modals/ConfirmDialogModal';
import popupMessages from '../../../messages/popupMessages';
import Loading from '../../modals/Loading';

class SaveCancelBtns extends Component {
  constructor(props){
      super(props);
      this.state={
          showModal: false,
          selectedModule: {},
          updateBtn:false
      }
  }

  select = () =>{
    if(this.props.selected !== "") {
      const selected = this.props.selected.slice(12);
      const selectedModule = this.props.layoutData.filter((item) => item.moduleId === selected);
      if(selectedModule[0].noOfStories < this.props.layoutData[0].noOfStories) {
        this.setState({
          selectedModule: selectedModule[0],
          showModal: true
        });
      }
      else {
        this.updateLayout(selectedModule[0]);
      }
    }
  }

  updateLayout = (selectedLayout) => {
    this.setState({updateBtn:true});
    const payload = {
      currentModuleId: this.props.currentModule,
      selectedModule: selectedLayout,
      moduleIndex: this.props.moduleIndex
    }
    if(this.props.changeLayout(payload))
    {
      this.setState({updateBtn:false});
    }
    this.layoutClose();
  }

  modalClose = () =>{
    this.setState({showModal: false});
  }
  layoutClose = () =>{
    this.props.changeLayoutClose();
  }
  render() {
    const changeLayoutClose  =  this.props.changeLayoutClose;
    return (
      <div>
        <button className="closeButton" onClick={() => changeLayoutClose()}><span className="closeButtonSpan">CANCEL</span></button>
        <button className="selectButton" onClick={this.select} disabled={!this.props.selected}>SELECT</button>
        <Loading showLoadingModal={this.state.updateBtn} />
        <ConfirmDialogModal
          showModal={this.state.showModal}
          mainDescription={popupMessages.changeLayoutLessStory.mainDescription}
          originalHeadline={popupMessages.changeLayoutLessStory.originalHeadline}
          onConfirm={()=>{this.updateLayout(this.state.selectedModule); }}
          onCancel={this.modalClose}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=>bindActionCreators({
    changeLayout
  }, dispatch)

  SaveCancelBtns.propTypes = {
    selected: PropTypes.string.isRequired,
    currentModule: PropTypes.string.isRequired,
    moduleIndex: PropTypes.number.isRequired,
    layoutData: PropTypes.array.isRequired,
    changeLayout: PropTypes.func.isRequired,
    changeLayoutClose: PropTypes.func.isRequired
  }
export default connect(null, mapDispatchToProps)(SaveCancelBtns);
