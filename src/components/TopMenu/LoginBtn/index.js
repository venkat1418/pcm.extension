// TODO: Move Logout logic to PCM server

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withCookies } from 'react-cookie';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import {toggleLogin, toggleEditMode, updateUserData, updateAuthToken} from '../../../actions';
import SetCookieModal from '../../modals/SetCookieModal';
import {GetUserDataService} from '../../../services/GetUserDataService';
import {AuditLogService} from '../../../services/AuditLogService';
import UserAvatar from '../UserAvatar';
import errHandler from '../../../helper/errHandler';


export class LoginBtn extends Component {
    constructor(props){
        super(props);
        this.onLoginWithCookie = this.onLoginWithCookie.bind(this);
        this.state={
            showLoginModal: false
        }
    }

    openLoginModal = ()=>{
        this.setState({ showLoginModal: true });
    }

    closeLoginModal = ()=>{
        this.setState({ showLoginModal: false });
    }

    componentDidMount(){
        if(this.props.cookies.get('toolbeltCookie')){
            const cookie = this.props.cookies.get('toolbeltCookie');
            GetUserDataService.getUser(cookie).then(resp=>{
                if(resp.data.error){
                    NotificationManager.error(`Login failed!`)
                    return false;
                }
                else if(resp.data.uid > 0){
                    const userData = resp.data;
                    this.props.updateUserData(userData);
                    this.props.toggleLogin(true);
                    this.props.updateAuthToken({ newToken: cookie })
                }
            })
            .catch(err=>{ errHandler.notification(err); })
        }
    }

    onLoginWithCookie(cookie, expires){
        if(cookie.trim() === '' || expires.trim() === '') return false;
        GetUserDataService.getUser(cookie).then(resp=>{
            if(resp.data.error){
                NotificationManager.error(`Login failed!`)
                return false;
            }
            else if(resp.data.uid > 0) {
                const userData = resp.data;
                this.props.updateUserData(userData);
                this.props.toggleLogin(true);
                this.props.updateAuthToken({ newToken: cookie })
                const logData = {
                    action: 'user_login',
                    user: userData,
                    updatedAt: new Date().getTime()
                }
                AuditLogService.logAuditLog(logData).then(resp=>{});
                this.onSetCookie(cookie, expires);
                this.closeLoginModal();
            }
        })
        .catch(err=>{ errHandler.notification(err); })
        return false;
    }

    onSetCookie(cookie, expires){
        if(expires){
            this.props.cookies.set('toolbeltCookie', cookie, { path: '/', expires: new Date(expires) });
        }
        else{
            this.props.cookies.set('toolbeltCookie', cookie, { path: '/' });
        }
    }

    render() {
        return (
          <div className="loginComp">
            {
              this.props.isLogin?
                <UserAvatar />
              :
                <div>
                  <button className="loginButton" onClick={this.openLoginModal}>LOGIN</button>
                </div>
          }
            <SetCookieModal
              showModal={this.state.showLoginModal}
              onConfirm={this.onLoginWithCookie}
              onCancel={this.closeLoginModal}
            />
          </div>
        );
    }
};

const mapStateToProps = (state)=>({
        isLogin: state.isLogin,
        isEditMode: state.isEditMode
    })
const mapDispatchToProps = (dispatch)=>bindActionCreators({
        toggleLogin,
        toggleEditMode,
        updateUserData,
        updateAuthToken
    }, dispatch)

LoginBtn.propTypes = {
  cookies: PropTypes.object.isRequired,
  updateUserData: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  updateAuthToken: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
}
export default withCookies(connect(mapStateToProps, mapDispatchToProps)(LoginBtn));
