
import { shallow } from 'enzyme';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie'
import LoginBtn from "../../../components/TopMenu/LoginBtn";
import {AuditLogService} from '../../../services/AuditLogService';
import {GetUserDataService} from '../../../services/GetUserDataService';

let cookieHandler = {};

beforeAll(() => {
  cookieHandler = new Cookies({ myCookie: 'pcm' });
  cookieHandler.set('toolbeltCookie', 1234, { path: '/' });
  NotificationManager.error = jest.fn();
});

test('Test the renders of LoginBtn', () => {
   let props = {
      cookies: cookieHandler,
      isLogin: false
   }

   const loginBtnComponent = shallow(<LoginBtn {...props}/>);
   //Create a snapshot with the default render of the LoginBtn component
   expect(loginBtnComponent).toMatchSnapshot();

   //Now check if the name of loginBtn is "LOGIN"
   expect(loginBtnComponent.find('button').at(0).text()).toBe('LOGIN');

  // Simulating the click event on Button
   // at(0) is not actually required as we have only one button being rendered
   loginBtnComponent.find('button').simulate('click');

   /* With the above simulation , we can assert the openCookieModal() callback is triggered
      and state change is occured */
   expect(loginBtnComponent.state().showLoginModal).toBe(true);

   // We can also directly call the asynchrnous methods
   loginBtnComponent.instance().closeLoginModal();
   expect(loginBtnComponent.state().showLoginModal).toBe(false);

   //How ever we will take a snapshot when state has showCookieModal == true
   loginBtnComponent.instance().openLoginModal();
   expect(loginBtnComponent.state().showLoginModal).toBe(true);
   expect(loginBtnComponent).toMatchSnapshot();



   /* This is the final test in scope of this particular component when isLogin is true .
      This is actually passed from store to map the state with props for component , but
      we pass some mocked props to the component directly */
      props = {
         cookies: cookieHandler,
         isLogin: true
      }
    const loginBtnComponent_afterLogin = shallow(<LoginBtn {...props}/>);
    expect(loginBtnComponent_afterLogin).toMatchSnapshot();

});

test.skip('Test the functioning of onLogin callback with Localhost',() => {
  /* InsertCookieModal rendering is not in the scope of this particular as this is shallow
  component test testing . But if we rewiew the snapshot ,we can see the child component
  is accessed with the required props .
  */

  // We should also test the onLogin() which is invoked from the child component .

  // updateUserData and toggleLogin are the actions which
  const props = {
     updateUserData: jest.fn(),
     toggleLogin: jest.fn()
  }

  GetUserDataService.getUser = jest.fn();
  AuditLogService.logAuditLog = jest.fn();

  AuditLogService.logAuditLog
    .mockReturnValue(new Promise(function(resolve, reject){
         resolve({resp: ''});
   }));

   GetUserDataService.getUser
      .mockReturnValueOnce(new Promise(function(resolve, reject){
         resolve({'data' : {'uid' : '99'}});
      }))
      .mockReturnValueOnce(new Promise(function(resolve, reject){
         resolve({'data' : {'error' : '403 error'}});
      }))

  const loginBtnComponent = shallow(<LoginBtn {...props}/>);
  // manually setting the showCookieModal to true to observe the change in behavior futher
   loginBtnComponent.setState({showCookieModal:true});

  // onLogin is called with empty cookie
  loginBtnComponent.instance().onLogin('');

  // when called with empty cookie execution is just returned without invoking any actions
  expect(props.updateUserData.mock.calls.length).toBe(0)
  expect(props.toggleLogin.mock.calls.length).toBe(0)
 // Modal should be still open
  expect(loginBtnComponent.state().showCookieModal).toBe(true);

// Now use the test cookie (1234)
  loginBtnComponent.instance().onLogin("1234");

  // actions should be invoked
  expect(props.updateUserData.mock.calls.length).toBe(1)
  expect(props.toggleLogin.mock.calls.length).toBe(1)

// actions should be invoked with the expected data
  expect(props.updateUserData).toHaveBeenCalledWith({"email": "local.narenda@cnbc.com", "name": "local narenda", "roles": ["admin", "mpsadmin", "administrator"], "uid": 100000898})
  expect(props.toggleLogin).toHaveBeenCalledWith(true);
// Modal should close
  expect(loginBtnComponent.state().showCookieModal).toBe(false);


});

test('Test the functioning of onLoginWithCookie callback with mocked user', done => {
  const props = {
     updateUserData: jest.fn(),
     toggleLogin: jest.fn(),
     updateAuthToken: jest.fn(),
     cookies: cookieHandler,
  }

  GetUserDataService.getUser = jest.fn();
  AuditLogService.logAuditLog = jest.fn();

  AuditLogService.logAuditLog
    .mockReturnValue(new Promise(function(resolve, reject){
         resolve({resp: ''});
   }));

   GetUserDataService.getUser
      .mockReturnValue(new Promise(function(resolve, reject){
         resolve({'data' : {'uid' : '99'}});
      }))

  const loginBtnComponent = shallow(<LoginBtn {...props}/>);
  // manually setting the showCookieModal to true to observe the change in behavior futher
   loginBtnComponent.setState({showCookieModal:true});

// this shoudl return false
  loginBtnComponent.instance().onLoginWithCookie('','');
  // this should not return false

  loginBtnComponent.instance().onLoginWithCookie(cookieHandler.get('toolbeltCookie'),'false');

/* Implementing the asynchronous fashion onLogin() has promises execution test cases
should not execute as soon as onLogin return .
*/
  setTimeout(() => {
      expect(props.toggleLogin.mock.calls.length).toBe(2)
      expect(props.updateUserData.mock.calls.length).toBe(2)
      expect(props.updateAuthToken.mock.calls.length).toBe(2)
      done();
    }, 10);
});


test('Test the functioning of onLogin callback with login error', done => {
  const props = {
     updateUserData: jest.fn(),
     toggleLogin: jest.fn(),
     cookies: cookieHandler,
  }

  window.alert = jest.fn();

  GetUserDataService.getUser = jest.fn();
  AuditLogService.logAuditLog = jest.fn();

  AuditLogService.logAuditLog
    .mockReturnValue(new Promise(function(resolve, reject){
         resolve({resp: ''});
   }));

   GetUserDataService.getUser
      .mockReturnValue(new Promise(function(resolve, reject){
         resolve({'data' : {'error' : '403 error'}});
      }))

  const loginBtnComponent = shallow(<LoginBtn {...props}/>);
  // manually setting the showCookieModal to true to observe the change in behavior futher
   loginBtnComponent.setState({showCookieModal:true});

// Further to mock the GetUserDataService and write tests where a mocked non localtest should be retrieved
  loginBtnComponent.instance().onLoginWithCookie(cookieHandler.get('toolbeltCookie'),'false');

  setTimeout(() => {
      expect(props.toggleLogin.mock.calls.length).toBe(0)
      expect(props.updateUserData.mock.calls.length).toBe(0)
    //  expect(window.alert).toHaveBeenCalledWith("login failed!");
      expect(NotificationManager.error).toHaveBeenCalledWith("Login failed!")
      done();
    }, 10);

});
