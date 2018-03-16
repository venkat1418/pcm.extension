
import { shallow } from 'enzyme';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import {AssetsStatusService} from '../../../services/AssetsStatusService';
import {PageStatusService} from '../../../services/PageStatusService';
import {AuditLogService} from '../../../services/AuditLogService';
import EditPublishBtn from "../../../components/TopMenu/EditPublishBtn";

beforeAll(() => {
  NotificationManager.error = jest.fn();
  NotificationManager.info = jest.fn();
  NotificationManager.success = jest.fn();


});

test('Test the renders of EditPublishBtn', () => {

   let isLogin = false ;
   let isEditMode = false;


   let wrapper = shallow(<EditPublishBtn isLogin={isLogin} isEditMode={isEditMode}/>);
   //Create a snapshot with the default render of the component
   expect(wrapper).toMatchSnapshot();

   // check the button rendered , they will be in disable state however when isLogin = false
   expect(wrapper.find('button').at(0).text()).toBe('EDIT');
   expect(wrapper.find('button').at(1).text()).toBe('PUBLISH');

   expect(wrapper.find('button').at(0).prop('disabled')).toBe(true);
   expect(wrapper.find('button').at(1).prop('disabled')).toBe(true);

   isLogin = true ;
   isEditMode = false ;

   wrapper = shallow(<EditPublishBtn isLogin={isLogin} isEditMode={isEditMode}/>);

   expect(wrapper.find('button').at(0).text()).toBe('EDIT');
   expect(wrapper.find('button').at(1).text()).toBe('PUBLISH');

   expect(wrapper.find('button').at(0).prop('disabled')).toBe(false);
   expect(wrapper.find('button').at(1).prop('disabled')).toBe(true);


   isLogin = true ;
   isEditMode = true ;

   wrapper = shallow(< EditPublishBtn isLogin={isLogin} isEditMode={isEditMode}/>);

   expect(wrapper.find('button').at(0).text()).toBe('DISCARD');
   expect(wrapper.find('button').at(1).text()).toBe('PUBLISH');

   expect(wrapper.find('button').at(0).prop('disabled')).toBe(false);
   expect(wrapper.find('button').at(1).prop('disabled')).toBe(true);

   // no test few methods
   wrapper.instance().openAssetsModal();
   expect(wrapper.state().showAssetsStatusModal).toBe(true);

   wrapper.instance().closeAssetsModal();
   expect(wrapper.state().showAssetsStatusModal).toBe(false);

});

test('Test the edit() callback of EditPublishBtn with non 200 status', done => {
  expect.assertions(1);
  const props = {
     toggleLogin: jest.fn(),
     toggleEditMode: jest.fn(),
     currentMetadata : {
       assetsId : 99
     },
     userData : {
       uid : 99
     }
  }
  AssetsStatusService.check = jest.fn();
  AssetsStatusService.check
 .mockReturnValueOnce(new Promise(function(resolve, reject){
         resolve({status: 502});
   }))

 let wrapper = shallow(< EditPublishBtn {...props}/>);
  wrapper.instance().edit();

   setTimeout(() => {
       expect(NotificationManager.error).toHaveBeenCalledWith("Status is not 200!\n\nCurrent Status is 502")
       done();
     }, 10);
});

test('Test the edit() callback of EditPublishBtn with error in resp', done => {
  expect.assertions(1);
  const props = {
     toggleLogin: jest.fn(),
     toggleEditMode: jest.fn(),
     currentMetadata : {
       assetsId : 99
     },
     userData : {
       uid : 99
     }
  }
  AssetsStatusService.check = jest.fn();
  AssetsStatusService.check
   .mockReturnValueOnce(new Promise(function(resolve, reject){
        resolve({status: 200,
                  data: {
                    error: "Failed!!"
                  } });
  }))

 let wrapper = shallow(< EditPublishBtn {...props}/>);

  wrapper.instance().edit();
  setTimeout(() => {
       expect(NotificationManager.error).toHaveBeenCalledWith("Error while checking asset status!")
       done();
  }, 10);

});

test('Test the edit() callback of EditPublishBtn , successfully entered edit mode', done => {
  expect.assertions(1);
  const props = {
     toggleLogin: jest.fn(),
     toggleEditMode: jest.fn(),
     currentMetadata : {
       assetsId : 99
     },
     userData : {
       uid : 99
     }
  }

  var dummyElement = document.createElement('pcmBody');
  var dummyElement2 = document.createElement('top-menu');
  document.getElementById = jest.fn();
  document.getElementById
      .mockReturnValueOnce(dummyElement)
      .mockReturnValueOnce(dummyElement2)


  AssetsStatusService.check = jest.fn();
  AssetsStatusService.check
  .mockReturnValueOnce(new Promise(function(resolve, reject){
       resolve({status: 200,
                 data: {
                   user: [{uid:99}],
                 }});
   }))


 let wrapper = shallow(< EditPublishBtn {...props}/>);

 wrapper.instance().onUnlockPage = jest.fn();

  wrapper.instance().edit();
  setTimeout(() => {
      // expect(NotificationManager.success).toHaveBeenCalledWith("Successfully entered to edit mode")
      expect(wrapper.instance().onUnlockPage.mock.calls.length).toBe(1);
       done();
  }, 10);

});

test('Test the edit() callback of EditPublishBtn, enter locking ', done => {
  expect.assertions(2);
  const props = {
     toggleLogin: jest.fn(),
     toggleEditMode: jest.fn(),
     currentMetadata : {
       assetsId : 99
     },
     userData : {
       uid : 99
     }
  }


  var dummyElement = document.createElement('pcmBody');
  var dummyElement2 = document.createElement('top-menu');
  document.getElementById = jest.fn();
  document.getElementById
      .mockReturnValueOnce(dummyElement)
      .mockReturnValueOnce(dummyElement2)

  AssetsStatusService.check = jest.fn();
  AssetsStatusService.check
   .mockReturnValueOnce(new Promise(function(resolve, reject){
        resolve({status: 200,
                  data: {
                    user: [],
                    concurrent : [{user : [{uid:99}]}]
                  }});
    }))

 let wrapper = shallow(< EditPublishBtn {...props}/>);
  wrapper.instance().edit();
  setTimeout(() => {
       expect(wrapper.state().showAssetsStatusModal).toBe(true);
       expect(wrapper.state().assetsLockedBy).toEqual([ { uid: 99 } ]);
       done();
  }, 10);


});


test('Test the publish() callback of EditPublishBtn, with unlocking page failed', done => {
      const props = {
                 currentMetadata : {
                   assetsId : 99,
                   pageId : 99
                 },
                 userData : {
                   uid : 99
                 }
              }

      AssetsStatusService.removeLock = jest.fn();
      AssetsStatusService.removeLock
       .mockReturnValueOnce(new Promise(function(resolve, reject){
            resolve({});
        }))

      PageStatusService.unlockPage = jest.fn();
      PageStatusService.unlockPage
      .mockReturnValueOnce(new Promise(function(resolve, reject){
            resolve({data: "no"});
        }))


     let wrapper = shallow(< EditPublishBtn {...props} />);
     wrapper.instance().publish();

     expect.assertions(1);

          setTimeout(() => {
              expect(NotificationManager.error).toHaveBeenCalledWith("Unlocking page is failed!")
               done();
          }, 10);

});

test('Test the publish() callback of EditPublishBtn, with status not 200', done => {
   const props = {
        currentMetadata : {
          assetsId : 99,
          pageId : 99
        },
        userData : {
          uid : 99
        }
    }

  AssetsStatusService.removeLock = jest.fn();
  AssetsStatusService.removeLock
    .mockReturnValueOnce(new Promise(function(resolve, reject){
        resolve({status: 502});
     }))

  PageStatusService.unlockPage = jest.fn();
  PageStatusService.unlockPage
    .mockReturnValueOnce(new Promise(function(resolve, reject){
        resolve({data: "yes"});
     }))


  let wrapper = shallow(< EditPublishBtn {...props} />);
  wrapper.instance().publish();

  expect.assertions(1);

  setTimeout(() => {
      expect(NotificationManager.error).toHaveBeenCalledWith("Status is not 200!\n\nCurrent Status is 502!")
        done();
  }, 10);

});

test('Test the publish() callback of EditPublishBtn, no data', done => {
       const props = {
            currentMetadata : {
              assetsId : 99,
              pageId : 99
            },
            userData : {
              uid : 99
            }
        }

      AssetsStatusService.removeLock = jest.fn();
      AssetsStatusService.removeLock
        .mockReturnValueOnce(new Promise(function(resolve, reject){
            resolve({status: 200});
         }))

      PageStatusService.unlockPage = jest.fn();
      PageStatusService.unlockPage
        .mockReturnValueOnce(new Promise(function(resolve, reject){
            resolve({data: "yes"});
         }))


      let wrapper = shallow(< EditPublishBtn {...props} />);
      wrapper.instance().publish();

      expect.assertions(1);

      setTimeout(() => {
          expect(NotificationManager.error).toHaveBeenCalledWith("Unlocking asset is failed!")
            done();
      }, 10);

});

test('Test the publish() callback of EditPublishBtn, publish sucessfully', done => {

   AuditLogService.logAuditLog = jest.fn();

   AuditLogService.logAuditLog
      .mockReturnValue(new Promise(function(resolve, reject){
           resolve({resp: ''});
       }));

    const props = {
        currentMetadata : {
          assetsId : 99,
          pageId : 99
        },
        userData : {
          uid : 99
        },
        toggleEditMode: jest.fn(),
    }


  var dummyElement = document.createElement('pcmBody');
  document.getElementById = jest.fn();
  document.getElementById
      .mockReturnValueOnce(dummyElement)

    AssetsStatusService.removeLock = jest.fn();
    AssetsStatusService.removeLock
      .mockReturnValueOnce(new Promise(function(resolve, reject){
         resolve({status: 200,data: {
             user: [{uid:99}],
         }});
      }))

    PageStatusService.unlockPage = jest.fn();
    PageStatusService.unlockPage
        .mockReturnValueOnce(new Promise(function(resolve, reject){
            resolve({data: "yes"});
         }))


    let wrapper = shallow(< EditPublishBtn {...props} />);
     wrapper.instance().publish();

     expect.assertions(2);

    setTimeout(() => {
        expect(NotificationManager.success).toHaveBeenCalledWith("Published successfully!")
        expect(props.toggleEditMode).toHaveBeenCalledWith(false);
        done();
        }, 10);

});

test('Test the onUnlockPage', done => {
  AuditLogService.logAuditLog = jest.fn();

  AuditLogService.logAuditLog
     .mockReturnValue(new Promise(function(resolve, reject){
          resolve({resp: ''});
      }));
  const props = {
          currentMetadata : {
            assetsId : 99,
            pageId : 99
          },
          userData : {
            uid : 99
          },
          toggleEditMode: jest.fn(),
      }

  PageStatusService.unlockPage = jest.fn();
  PageStatusService.lockPage = jest.fn();

  PageStatusService.unlockPage.mockReturnValueOnce(new Promise(function(resolve, reject){
     resolve({data: 'yes'});
  }))

  PageStatusService.lockPage.mockReturnValueOnce(new Promise(function(resolve, reject){
     resolve({data: 'yes'});
  }))
  let wrapper = shallow(< EditPublishBtn {...props} />);
  wrapper.instance().onUnlockPage();

  expect.assertions(2);

 setTimeout(() => {
     expect(props.toggleEditMode).toHaveBeenCalledWith(true);
     expect(wrapper.state().showAssetsStatusModal).toBe(false);
     done();
     }, 10);
})

test('Test the onUnlockPage, catch the unlocking error ', done => {
  AuditLogService.logAuditLog = jest.fn();

  AuditLogService.logAuditLog
     .mockReturnValue(new Promise(function(resolve, reject){
          resolve({resp: ''});
      }));
  const props = {
          currentMetadata : {
            assetsId : 99,
            pageId : 99
          },
          userData : {
            uid : 99
          },
      }

  PageStatusService.unlockPage = jest.fn();
  PageStatusService.lockPage = jest.fn();

  PageStatusService.unlockPage.mockReturnValueOnce(new Promise(function(resolve, reject){
     reject({});
  }))


  let wrapper = shallow(< EditPublishBtn {...props} />);
  wrapper.instance().onUnlockPage();

  expect.assertions(1);

 setTimeout(() => {
     expect(NotificationManager.error).toHaveBeenCalledWith("Error while unlocking page!")
     done();
     }, 10);
})

test('Test the onUnlockPage, catch the locking error ', done => {
  AuditLogService.logAuditLog = jest.fn();

  AuditLogService.logAuditLog
     .mockReturnValue(new Promise(function(resolve, reject){
          resolve({resp: ''});
      }));
  const props = {
          currentMetadata : {
            assetsId : 99,
            pageId : 99
          },
          userData : {
            uid : 99
          },
      }

  PageStatusService.unlockPage = jest.fn();
  PageStatusService.lockPage = jest.fn();

  PageStatusService.unlockPage.mockReturnValueOnce(new Promise(function(resolve, reject){
     resolve({data: 'yes'});
  }))

  PageStatusService.lockPage.mockReturnValueOnce(new Promise(function(resolve, reject){
     reject({});
  }))


  let wrapper = shallow(< EditPublishBtn {...props} />);
  wrapper.instance().onUnlockPage();

  expect.assertions(1);

 setTimeout(() => {
     expect(NotificationManager.error).toHaveBeenCalledWith("Error while locking page!")
     done();
     }, 10);
})

test('Test the edit, catch the Authentication error ', done => {
  const props = {
     toggleLogin: jest.fn(),
     toggleEditMode: jest.fn(),
     currentMetadata : {
       assetsId : 99
     },
     userData : {
       uid : 99
     }
  }
  AssetsStatusService.check = jest.fn();
  AssetsStatusService.check
 .mockReturnValueOnce(new Promise(function(resolve, reject){
         reject({response: {status : 403}});
   }))

 let wrapper = shallow(< EditPublishBtn {...props}/>);
  wrapper.instance().edit();

   setTimeout(() => {
       expect(NotificationManager.error).toHaveBeenCalledWith("Authentication Error! 403")
       done();
     }, 10);

})

test('Test the edit, catch the CMS server error ', done => {
  const props = {
     toggleLogin: jest.fn(),
     toggleEditMode: jest.fn(),
     currentMetadata : {
       assetsId : 99
     },
     userData : {
       uid : 99
     }
  }
  AssetsStatusService.check = jest.fn();
  AssetsStatusService.check
 .mockReturnValueOnce(new Promise(function(resolve, reject){
         reject({response: {status : 503}});
   }))

 let wrapper = shallow(< EditPublishBtn {...props}/>);
  wrapper.instance().edit();

   setTimeout(() => {
       expect(NotificationManager.error).toHaveBeenCalledWith("CMS Server Error! 503")
       done();
     }, 10);

})

test('Test the onUnlockAssets() callback of EditPublishBtn with non 200 status', done => {
  expect.assertions(1);
  const props = {
     currentMetadata : {
       assetsId : 99,
       cmsAuthToken:99
     },
     userData : {
       uid : 99
     },
  }
  AssetsStatusService.unlockThenLock = jest.fn();
  AssetsStatusService.unlockThenLock
 .mockReturnValueOnce(new Promise(function(resolve, reject){
         resolve({status: 502});
   }))

 let wrapper = shallow(< EditPublishBtn {...props}/>);
  wrapper.instance().onUnlockAssets();

   setTimeout(() => {
       expect(NotificationManager.error).toHaveBeenCalledWith("Status is not 200!\n\nCurrent Status is 502")
       done();
     }, 10);
})


test('Test the onUnlockAssets() callback of EditPublishBtn with error in resp', done => {
  expect.assertions(1);
  const props = {
     currentMetadata : {
       assetsId : 99,
       cmsAuthToken : 99
     },
     userData : {
       uid : 99
     }
  }
  AssetsStatusService.unlockThenLock = jest.fn();
  AssetsStatusService.unlockThenLock
   .mockReturnValueOnce(new Promise(function(resolve, reject){
        resolve({status: 200,
                  data: {
                    error: "Failed!!"
                  } });
  }))

 let wrapper = shallow(< EditPublishBtn {...props}/>);

  wrapper.instance().onUnlockAssets();
  setTimeout(() => {
       expect(NotificationManager.error).toHaveBeenCalledWith("Error while assets lock & unlock!")
       done();
  }, 10);

})

test('Test the onUnlockAssets() callback of EditPublishBtn , successfully entered edit mode', done => {
  expect.assertions(1);
  const props = {
     currentMetadata : {
       assetsId : 99,
       cmsAuthToken : 99
     },
     userData : {
       uid : 99
     }
  }

  AssetsStatusService.unlockThenLock = jest.fn();
  AssetsStatusService.unlockThenLock
  .mockReturnValueOnce(new Promise(function(resolve, reject){
       resolve({status: 200,
                 data: {
                   user: [{uid:99}],
                 }});
   }))


 let wrapper = shallow(< EditPublishBtn {...props}/>);

 wrapper.instance().onUnlockPage = jest.fn();

  wrapper.instance().onUnlockAssets();
  setTimeout(() => {
      // expect(NotificationManager.success).toHaveBeenCalledWith("Successfully entered to edit mode")
      expect(wrapper.instance().onUnlockPage.mock.calls.length).toBe(1);
       done();
  }, 10);

})

test('Test the onUnlockAssets() callback of EditPublishBtn , unlocking asset failed', done => {
  expect.assertions(1);
  const props = {
     currentMetadata : {
       assetsId : 99,
       cmsAuthToken : 99
     },
     userData : {
       uid : 99
     }
  }

  AssetsStatusService.unlockThenLock = jest.fn();
  AssetsStatusService.unlockThenLock
  .mockReturnValueOnce(new Promise(function(resolve, reject){
       resolve({status: 200,
                 data: {
                   user: [],
                 }});
   }))


 let wrapper = shallow(< EditPublishBtn {...props}/>);

 wrapper.instance().onUnlockPage = jest.fn();

  wrapper.instance().onUnlockAssets();
  setTimeout(() => {
       expect(NotificationManager.error).toHaveBeenCalledWith("Unlocking asset is failed!")
       done();
  }, 10);

})

test('Test the onUnlockAssets(), catch the Authentication error ', done => {
  const props = {
     currentMetadata : {
       assetsId : 99
     },
     userData : {
       uid : 99
     }
  }
  AssetsStatusService.unlockThenLock = jest.fn();
  AssetsStatusService.unlockThenLock
 .mockReturnValueOnce(new Promise(function(resolve, reject){
         reject({response: {status : 403}});
   }))

 let wrapper = shallow(< EditPublishBtn {...props}/>);
  wrapper.instance().onUnlockAssets();

   setTimeout(() => {
       expect(NotificationManager.error).toHaveBeenCalledWith("Authentication Error! 403")
       done();
     }, 10);

})

test('Test the onUnlockAssets, catch the CMS server error ', done => {
  const props = {
     currentMetadata : {
       assetsId : 99
     },
     userData : {
       uid : 99
     }
  }
  AssetsStatusService.unlockThenLock = jest.fn();
  AssetsStatusService.unlockThenLock
 .mockReturnValueOnce(new Promise(function(resolve, reject){
         reject({response: {status : 503}});
   }))

 let wrapper = shallow(< EditPublishBtn {...props}/>);
  wrapper.instance().onUnlockAssets();

   setTimeout(() => {
       expect(NotificationManager.error).toHaveBeenCalledWith("CMS Server Error! 503")
       done();
     }, 10);

})


test('Test the discard() callback of EditPublishBtn', () => {
  let props = {
    toggleEditMode: jest.fn()
}

  let wrapper = shallow(< EditPublishBtn {...props}/>);
  wrapper.instance().discard();
  expect(props.toggleEditMode).toHaveBeenCalledWith(false);
  expect(NotificationManager.info).toHaveBeenCalledWith('Successfully entered view mode and page unlocked!')

  props = {
    toggleEditMode: jest.fn(),
    isPageDirty : true
  }
  const event = { preventDefault: () => {} };

  wrapper = shallow(< EditPublishBtn {...props}/>);
  wrapper.instance().discard(event);
});
