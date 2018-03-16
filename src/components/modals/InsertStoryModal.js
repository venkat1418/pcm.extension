import React from 'react';
import ReactModal from 'react-modal';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ModalHeader from './assets/ModalHeader';
import ModalFooter from './assets/ModalFooter';
import ModalBody from './assets/ModalBody';
import { replaceStory, insertStory, insertCollection } from '../../actions';
import {InsertStoryService} from '../../services/InsertStoryService';
import {DrawBorderService} from '../../services/DrawBorderService';
import popupMessages from '../../messages/popupMessages';
import Loading from './Loading';

class InsertStoryModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            result: {},
            searchEdited: false,
            pending:false,
            updateBtn:false
        }
    }
    componentWillReceiveProps() {
       this.setState({ result: {}, searchEdited: false,updateBtn:false });
    }
    componentDidMount(){
        ReactModal.setAppElement('body');
    }
    onAfterModalOpen = ()=>{
        window.$(this.searchDOM).keyup((e) => {
            if (e.keyCode === 13) {
               this.setState({pending:true});
                const result = InsertStoryService.SearchStory(e.target.value, this.props.isCollection);
                result.then((doc) => {

                  this.setState({ result: doc.data,pending:false });
                  this.setState({searchEdited: true});
                  }).catch(() => {

                    this.setState({ result: {headline:'No Match Found'},pending:false });
                  })
            }
        }).focusout((e) => {
            const result = InsertStoryService.SearchStory(e.target.value, this.props.isCollection);
            result.then((doc) => {
              this.setState({ result: doc.data });
              this.setState({searchEdited: true});
            }).catch(() => {
              this.setState({ result: {headline:'No Match Found'} });
            })

        });
        if (this.props.activeStoryid) DrawBorderService.Draw(this.props.activeStoryid, this.props.zone);
    }

    onSave = ()=>{
      if(this.state.result.headline !== 'No Match Found') {
          this.setState({updateBtn: true});
        if(!_.isEmpty(this.state.result)){

          const payload = {
              activeStoryid: this.props.activeStoryid,
              newStory:this.state.result,
              moduleName: this.props.moduleName,
              blockIndex: this.props.blockIndex,
              type: this.props.type,
              pkgId: this.props.pkgId
          }
          console.log(this.props.isCollection);
          const storyId = {
  	            id: this.state.result.storyid,
  	            ordinal: this.props.position ? this.props.position: ''
            }
  	          const insertData = {
  	            id: "100727362",
  	            story: [storyId],
  	            updatedby: this.props.userData.uid,
  	            relationid: 1,
   	            cookie:this.props.currentMetadata.cmsAuthToken,
               type: "cnbcnewsstory"
            }

          if (this.props.isCollection === true) {

              this.setState({updateBtn: false});
              this.props.insertCollection(payload);
              this.setState({ result: {}});
              this.props.closeInsertModal();

          } else {
              // const result = InsertStoryService.UpdateStory(insertData, 'add');
              // result.then((doc) => {
  	          //       this.setState({ result: doc.data });
   	          //     }).catch(() => {
   	          // })

              this.setState({updateBtn: false});
              this.props.insertStory(payload);
              this.setState({ result: {}});
              this.props.closeInsertModal();

            }
        }
      }
    }

    searchChange = () =>{
       this.setState({searchEdited: false});
    }
    searchIconClick = () =>{
       const searchText = document.getElementById('searchText').value;
       if(searchText.length >0) {
         this.setState({pending:true});
          const result = InsertStoryService.SearchStory(searchText, this.props.isCollection);
          result.then((doc) => {

            this.setState({ result: doc.data,pending:false });

            if(this.state.result.headline !== 'No Match Found')
              this.setState({searchEdited: true});
          }).catch(() => {
            this.setState({ result: {headline:'No Match Found'},pending:false });
          });
       }
    }
    render () {
        return (
          <ReactModal
            isOpen={this.props.showModal}
            className="Modal"
            overlayClassName="Overlay"
            onAfterOpen={this.onAfterModalOpen}
            >
            <ModalHeader
              title={(this.props.isCollection === false)?  "INSERT STORY"  : "INSERT COLLECTION"}
              closeClassName={(this.props.isCollection === false)?  "closeModalIcon"  : "closeModalIcon2"}
              onCancel={this.props.onCancel}
                />
            <ModalBody>
              <Loading
                    showLoadingModal={this.state.updateBtn}
                  />
              {(this.props.isCollection === false)?
                <div className="description">
                  {popupMessages.insert.insertDesc}
                </div>
                    :
                <div className="description">
                  {popupMessages.insert.insertColDesc}
                </div>
                }

              <div className="search_wrapper">
                <input id="searchText" autoFocus ref={(input) => { this.searchDOM = input; }} onChange={this.searchChange} className="search" placeholder="Search '104846707' for test" />
                <Icon name={this.state.pending?"spinner":"search"} spin={this.state.pending} onClick={this.searchIconClick} />
              </div>
              {   !_.isEmpty(this.state.result)?
                <div className="search_result">
                  <div className="result_heading">
                    <span className="result_title">{popupMessages.insert.matchingStry}</span>
                    <span className="result_id">{this.state.result.storyid}</span>
                  </div>
                  {
                            this.props.isCollection === true?
                              <div className="content_eyebrow">
                                {this.state.result.eyebrow}
                              </div>
                            :
                              <div />
                        }
                  <div className="result_body">
                    {this.state.result.headline}
                  </div>

                  <div className="result_heading">
                    <span className="result_title">Publish Date:</span>
                    <span className="result_id">{this.state.result.pubDate}</span>
                  </div>

                </div>:<div />
                }
            </ModalBody>
            <ModalFooter
              onConfirm={this.onSave}
              onCancel={this.props.onCancel}
              selectDisable={!this.state.searchEdited}
              // confirmLabel={this.props.isCollection ?  "SEARCH" : "INSERT"}
              confirmLabel="INSERT"
              cancelLabel="CANCEL"
                />
          </ReactModal>
        );
    }
}

const mapStateToProps = (state)=>({
  userData: state.userData,
  currentMetadata: state.currentMetadata
})

const mapDispatchToProps = (dispatch)=>bindActionCreators({
        insertStory,
        replaceStory,
        insertCollection
    }, dispatch)

    InsertStoryModal.propTypes = {
      onCancel: PropTypes.func,
      isCollection: PropTypes.bool,
      showModal: PropTypes.bool.isRequired,
      activeStoryid: PropTypes.string.isRequired,
      moduleName: PropTypes.string.isRequired,
      blockIndex: PropTypes.number,
      type: PropTypes.string.isRequired,
      insertStory: PropTypes.func.isRequired,
      zone: PropTypes.string.isRequired,
      closeInsertModal: PropTypes.func
    }

InsertStoryModal.defaultProps = {
  updateAction: '',
  isCollection: false,
  blockIndex: 1
}
export default connect(mapStateToProps, mapDispatchToProps)(InsertStoryModal);
