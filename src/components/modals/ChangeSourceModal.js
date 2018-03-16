import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Icon} from 'react-fa';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ModalHeader from './assets/ModalHeader';
import ModalFooter from './assets/ModalFooter';
import ModalBody from './assets/ModalBody';
import {changeModuleSource} from '../../actions';
import {ChangeModuleSourceService} from '../../services/ChangeModuleSourceService';
import popupMessages from '../../messages/popupMessages';


class ChangeSourceModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            result: {},
            searchEdited: false,
            pending: false
        }
    }
    componentWillMount(){
        ChangeModuleSourceService.searchSource()
          .then((res) => this.setState({options: res.data}))
          .catch(() => {});
    }

    componentDidMount(){
        ReactModal.setAppElement('body');
    }
    componentWillReceiveProps() {
       this.setState({ result: {}, searchEdited: false });
    }
    onAfterModalOpen = ()=>{
        window.$(this.searchDOM).keyup((e) => {
            if (e.keyCode === 13) {
              this.setState({pending:true});
              ChangeModuleSourceService.searchSource(e.target.value)
              .then((resp) => {
                if (resp.data.value) this.setState({ result: resp.data, searchEdited: true, pending:false })
                else this.setState({ result: {label: 'No Match Found'}, pending:false })
              })
              .catch(() => {this.setState({ result: {label: 'No Match Found'}, pending:false })})
            }
        }).focusout((e) => {
            ChangeModuleSourceService.searchSource(e.target.value)
            .then((resp) => {
                if (resp.data.value) this.setState({ result: resp.data, searchEdited: true, pending:false })
                else this.setState({ result: {label: 'No Match Found'}, pending:false })
            })
            .catch(() => {this.setState({ result: {label: 'No Match Found'}, pending:false })})
        });
    }

    onSave = ()=>{
        if(!_.isEmpty(this.state.result)){
          this.props.showLoading(true);
          ChangeModuleSourceService.getSourceData(this.state.result.value)
          .then((resp) => {
              const payload={
                  moduleIndex: this.props.moduleIndex,
                  newSource: this.state.result.value,
                  newSourceName: this.state.result.label,
                  newData: resp.data
              }
              this.props.changeModuleSource(payload);
              this.props.onCancel();
              this.props.showLoading(false);
              this.setState({ result: {} });})
          .catch(() => {
            this.props.showLoading(false);
          })
        }
    }

    searchChange = () =>{
       this.setState({searchEdited: false});
    }
    searchIconClick = () =>{
      this.setState({pending:true});
       const searchText = document.getElementById('searchText').value;
       if(searchText.length >0) {
         const result = ChangeModuleSourceService.searchSource(searchText).then((resp)=>{

            this.setState({pending:false});
         });
         this.setState({ result });
         if(result != null)
            this.setState({searchEdited: true});
       }
    }
    render () {
      const { selectedSource } = this.state;
      const value = selectedSource && selectedSource.value;
        return (
          <ReactModal
            isOpen={this.props.showModal}
            className="Modal"
            overlayClassName="Overlay"
            onAfterOpen={this.onAfterModalOpen}
            >
            <ModalHeader
              title="Change Section"
              closeClassName="closeModalIcon2"
              onCancel={this.props.onCancel}
                />
            <ModalBody>
              <div className="description">
                {popupMessages.changeSource.description}
              </div>
              <div >


              <div className="search_wrapper">
                <input id="searchText" autoFocus ref={(input) => { this.searchDOM = input; }} onChange={this.searchChange} className="search" placeholder="Search '10000108' for test" />
                 <Icon name={this.state.pending?"spinner":"search"} spin={this.state.pending} onClick={this.searchIconClick} />
              </div>

              </div>
              {   !_.isEmpty(this.state.result)?
                <div className="search_result">
                  <div className="result_heading">
                    <span className="result_title">{popupMessages.changeSource.matchingSource}</span>
                    <span className="result_id">{this.state.result.label}</span>
                  </div>
                </div>:<div />
                    }
            </ModalBody>
            <ModalFooter
              onConfirm={this.onSave}
              onCancel={this.props.onCancel}
              selectDisable={!this.state.searchEdited}
              confirmLabel="UPDATE"
              cancelLabel="CANCEL"
                />
          </ReactModal>
        );
    }
}
const mapStateToProps = (state)=>({

})

const mapDispatchToProps = (dispatch)=>bindActionCreators({
        changeModuleSource
    }, dispatch)

    ChangeSourceModal.propTypes = {
      showModal: PropTypes.bool.isRequired,
      onCancel: PropTypes.func.isRequired,
      moduleIndex: PropTypes.number.isRequired,
      changeModuleSource: PropTypes.func.isRequired
    }

export default connect(mapStateToProps, mapDispatchToProps)(ChangeSourceModal);
