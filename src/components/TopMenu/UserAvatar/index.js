// TODO: Move logout action to server
import React from 'react';
import DropdownMenu from 'react-dd-menu';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import 'react-dd-menu/dist/react-dd-menu.min.css';
import Avatar from 'react-avatar';
import { withCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import {toggleLogin, toggleEditMode, updateAuthToken} from '../../../actions';
import {PageStatusService} from '../../../services/PageStatusService';
import {AssetsStatusService} from '../../../services/AssetsStatusService';
import {AuditLogService} from '../../../services/AuditLogService';
import ConfirmDialogModal from '../../modals/ConfirmDialogModal';
import popupMessages from '../../../messages/popupMessages';

class UserAvatar extends React.Component{
    constructor() {
        super();
        this.state = {
            isMenuOpen: false,
            showCommonModal:false
        };
    }

    toggle = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    close = () => {
        this.setState({ isMenuOpen: false });
    }

    onLogout = ()=>{
        if(this.props.isPageDirty) {
            this.setState({showCommonModal: true});
        } else {
            this.logoutAction();
        }
    }

    onConfirmLogout = () =>{
        this.setState({showCommonModal: false});
        this.logoutAction();
    }

    onCancelLogout = () => {
        this.setState({showCommonModal: false});
    }

    logoutAction = () =>{
        this.props.toggleEditMode(false);
        Promise.all([
            PageStatusService.unlockPage(this.props.currentMetadata.pageId, this.props.userData),
            AssetsStatusService.removeLock(this.props.currentMetadata.cmsAuthToken, this.props.currentMetadata.assetsId, this.props.userData.uid)
        ]).then(resp=>{});
        const logData = {
            action: 'user_logout',
            user: this.props.userData,
            updatedAt: new Date().getTime()
        }
        AuditLogService.logAuditLog(logData).then(resp=>{});
        this.props.updateAuthToken({ newToken: '' })
        this.onRemoveCookie();
        setTimeout(()=>{this.props.toggleLogin(false)}, 100);
    }
    onRemoveCookie(){
        this.props.cookies.remove('toolbeltCookie');
    }

    render() {
        const menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.close,
            toggle: <Avatar round size={50} name={this.props.userData.name} onClick={this.toggle} color="#E72114" />,
            align: 'left',
            className: 'userInfoDropDown'
        };
        return (
          <div>
            <DropdownMenu {...menuOptions}>
              <li><button type="button" onClick={this.close}>{this.props.userData.name}</button></li>
              <li><button type="button" onClick={this.close}>{this.props.userData.email}</button></li>
              <li><button type="button" onClick={this.onLogout}>Logout</button></li>
            </DropdownMenu>
            <ConfirmDialogModal
              showModal={this.state.showCommonModal}
              mainDescription={popupMessages.logout.mainDescription}
              originalHeadline={popupMessages.logout.originalHeadline}
              onConfirm={this.onConfirmLogout}
              onCancel={this.onCancelLogout}
              confirmLabel='LOGOUT'
                />
          </div>
        );
    }

}
const mapStateToProps = (state)=>({
        userData: state.userData,
        currentMetadata: state.currentMetadata,
        isPageDirty: state.data.isPageDirty
    })
const mapDispatchToProps = (dispatch)=>bindActionCreators({
        toggleLogin,
        toggleEditMode,
        updateAuthToken
    }, dispatch)

UserAvatar.propTypes = {
  toggleLogin: PropTypes.func.isRequired,
  updateAuthToken: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  currentMetadata: PropTypes.object.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  isPageDirty: PropTypes.bool.isRequired
}
export default withCookies(connect(mapStateToProps, mapDispatchToProps)(UserAvatar));
