import { NotificationManager } from 'react-notifications';
import DataLoadHelper from '../helper/DataLoadHelper';
import messages from '../messages/notification.js';

const data = (state = {}, action) => {
  switch (action.type) {
    case 'REORDER':
      const newList = reOrder(state.opList, action.reorderData);

      return {
        cmsData: state.cmsData,
        modules: [...state.modules],
        opList: [
          ...newList.opList,
        ],
        pinup: state.pinup,
        isPageDirty: true,
        overrides: state.overrides,
        proState: state.proState,
        dataList:state.dataList
      };
    case 'INSERT_STORY':
      let newInsState = insertStory(state, action);
      newInsState.isPageDirty = true;
      NotificationManager.success(messages.storyInserted);
      return newInsState;
      case 'INSERT_COLLECTION':
        newInsState = insertCollection(state, action);
        newInsState.isPageDirty = true;
        NotificationManager.success(messages.storyInserted);
        return newInsState;
    case 'REMOVE_STORY':
      newInsState = removeStory(state, action);
      newInsState.isPageDirty = true;
      NotificationManager.success(messages.storyRemoved);
      return newInsState;
    case 'EDIT_HEADLINE':
      newInsState = editHeadline(state, action);
      newInsState.isPageDirty = true;
      return newInsState;
    case 'REVERT_HEADLINE_EDIT':
      newInsState = revertEditHeadline(state, action);
      newInsState.isPageDirty = true;
      return newInsState;
    case 'REPLACE_STORY':
      let newOpList = Array.from(state.opList);
      const existIndex = newOpList.findIndex(element => element.storyid === action.payload.newStory.storyid);
      if (existIndex) {
        newOpList.splice(existIndex, 1);
      }
      const activeStoryInd = newOpList.findIndex(element => element.storyid === action.payload.activeStoryid);
      newOpList.splice(activeStoryInd, 1);
      newOpList.splice(activeStoryInd, 0, action.payload.newStory);

      return {
        modules: [...state.modules],
        opList: [
          ...newOpList,
        ],
      };
    case 'CHANGE_LAYOUT':
      const tempModules = Array.from(state.modules);
            // let index = tempModules.findIndex((element)=>{
            //     return element.moduleId === action.payload.currentModuleId
            // })
      tempModules[action.payload.moduleIndex] = { ...tempModules[action.payload.moduleIndex], ...action.payload.selectedModule };
      newOpList = DataLoadHelper.cleanAndgetOpListAndPkgData(state.opList, tempModules);
      // const newData = {
      //   opList: newOpList,
      //   modules: tempModules,
      //   overrides: state.overrides,
      // };
      // const curCmsData = state.cmsData;
      // curCmsData.modules = [...tempModules];
      // const oldOpList = Object.assign([], state.cmsData.opList);
      // const stateData = DataLoadHelper.getOpListAndPkgData(state.cmsData);

      NotificationManager.success('Layout changed!');
      return {
        cmsData: state.cmsData,
        modules: [...tempModules],
        opList: [
          ...newOpList,
        ],
        pinup: state.pinup,
        isPageDirty: true,
        overrides: state.overrides,
        proState: state.proState,
        dataList:state.dataList
      };
    case 'PIN_STORY':
      let newPinUps = pinStory(state.pinup, action);
      return {
        cmsData: state.cmsData,
        modules: [...state.modules],
        opList: [
          ...state.opList,
        ],
        pinup: newPinUps,
        isPageDirty: true,
        overrides: state.overrides,
        proState: state.proState,
        dataList:state.dataList
      };
    case 'UN_PIN_STORY':
      newPinUps = unPinStory(state.pinup, action);
      return {
        cmsData: state.cmsData,
        modules: [...state.modules],
        opList: [
          ...state.opList,
        ],
        pinup: newPinUps,
        isPageDirty: true,
        overrides: state.overrides,
        proState: state.proState,
        dataList:state.dataList
      };
    case 'CAHNGE_MODULE_SOURCE':
      newInsState = changeModuleSource(state, action);
      newInsState.isPageDirty = true;
      NotificationManager.success(messages.changeSource+`${action.payload.newSource}`);
      return newInsState;
      case 'TOGGLE_PRO':
        return {
          cmsData: state.cmsData,
          modules: [...state.modules],
          opList: [
            ...state.opList,
          ],
          pinup: state.pinup,
          isPageDirty: true,
          overrides: state.overrides,
          proState: action.proState,
          dataList:state.dataList
        };
    default:
      return state;
  }
};

export default data;

function findPkgStory(storyList, startStoryid) {
  let fStory = {};
  storyList.forEach((story, colIndex) => {
    if (story.isCollection === true){
      (story.pkgStories).forEach((pStory, storyIndex) => {
        if (pStory.storyid === startStoryid){
          fStory = {pkgIndex: colIndex, storyIndex: storyIndex, story: pStory};
        }
      })
    }
  });

  return fStory;
}

function changeModuleSource(state, action) {
  const tempModules = Array.from(state.modules);
  tempModules[action.payload.moduleIndex].source = action.payload.newSource;
  tempModules[action.payload.moduleIndex].sourceName = action.payload.newSourceName;
  const newData = [...state.dataList];
  newData.push({source:action.payload.newSource, data: action.payload.newData});
  return {
    cmsData: state.cmsData,
    modules: [...tempModules],
    opList: [
      ...state.opList,
    ],
    pinup: state.pinup,
    overrides: state.overrides,
    proState: state.proState,
    dataList:newData
  };
}

function pinStory(pinups, action) {
  let newPinups = [];
  if (pinups) newPinups = Array.from(pinups);

  const pin = {
    type: 'story',
    storyid: action.payload.storyid,
    moduleId: action.payload.moduleId,
    position: action.payload.position,
  };

  newPinups.splice(0, 0, pin);
  return newPinups;
}

function unPinStory(pinups, action) {
  if (!pinups) return pinups;
  let newPinups = [];
  if (pinups) newPinups = Array.from(pinups);

  const pinIndex = newPinups.findIndex(element => element.storyid === action.payload.storyid
        && element.moduleId === action.payload.moduleId);

  if (pinIndex !== -1) {
    newPinups.splice(pinIndex, 1);
  }

  return newPinups;
}


function insertStory(state, action) {
  const tempOpList = Array.from(state.opList);

  if (action.payload.type === 'package') {

    const pkgStory = findPkgStory(tempOpList, action.payload.activeStoryid);
    if (!pkgStory.pkgIndex && pkgStory.pkgIndex !== 0) {
      const pkgId = action.payload.pkgId;
      const pkgIndex = tempOpList.findIndex((item) => item.collectionId === pkgId
                                || item.collectionId === parseInt(pkgId || 0, 10));
      const pkg = tempOpList[pkgIndex];
      const storyIndex = pkg.pkgStories.length;
      (pkg).pkgStories.splice(storyIndex, 0, action.payload.newStory);
    } else {
      (tempOpList[pkgStory.pkgIndex]).pkgStories.splice(pkgStory.storyIndex, 0, action.payload.newStory);
    }

  } else {
    const currentStoryIndex = tempOpList.findIndex(element => element.storyid === action.payload.activeStoryid);

    tempOpList.splice(currentStoryIndex, 0, action.payload.newStory);
  }

  return {
    cmsData: state.cmsData,
    modules: [...state.modules],
    opList: [
      ...tempOpList,
    ],
    pinup: state.pinup,
    overrides: state.overrides,
    proState: state.proState,
    dataList:state.dataList
  };
}

function insertCollection(state, action) {
    const tempOpList = Array.from(state.opList);

    const parts = action.payload.activeStoryid.split('_');
    const pkgId = parts[1];
    const pkgIndex = tempOpList.findIndex((item) => item.collectionId === pkgId
                              || item.collectionId === parseInt(pkgId || 0, 10));
    const pkg = tempOpList[pkgIndex];

    const stories = action.payload.newStory.stories;
    if (stories && stories.length > 0) {
      stories[0].collectionId = action.payload.newStory.storyid;
      stories[0].isCollection = true;
      stories[0].eyebrow = action.payload.newStory.eyebrow;
    }

   const newPkg = {
     isCollection: true,
     collectionId: action.payload.newStory.storyid,
     storyId: action.payload.newStory.storyid,
     headline: stories[0].headline,
     eyebrow: action.payload.newStory.eyebrow,
     pkgStories: stories
   }

    if (pkg.collectionId.includes && pkg.collectionId.includes('Col-') &&
      pkg.pkgStories.length === 0) {
        tempOpList[pkgIndex] = newPkg;
      } else {
        const pkg = tempOpList[pkgIndex];
        if (!pkg.storyid) {
          pkg.storyid = pkg.collectionId;
          pkg.headline = pkg.pkgStories[0].headline;
        }
        tempOpList.splice(pkgIndex, 0, newPkg);
      }



  return {
    cmsData: state.cmsData,
    modules: [...state.modules],
    opList: [
      ...tempOpList,
    ],
    pinup: state.pinup,
    overrides: state.overrides,
    proState: state.proState,
    dataList:state.dataList
  };
}


function removeStory(state, action) {
  const tempOpList = Array.from(state.opList);

  if (action.payload.type === 'package') {

    const pkgStory = findPkgStory(tempOpList, action.payload.storyid);
    (tempOpList[pkgStory.pkgIndex]).pkgStories.splice(pkgStory.storyIndex, 1);

  } else {
    const currentStoryIndex = tempOpList.findIndex(element => element.storyid === action.payload.storyid);

    tempOpList.splice(currentStoryIndex, 1);
  }

  const newOverride = (state.overrides).filter((item) => item.storyId !== action.payload.storyid);


  return {
    cmsData: state.cmsData,
    modules: [...state.modules],
    opList: [
      ...tempOpList,
    ],
    pinup: state.pinup,
    overrides: newOverride,
    proState: state.proState,
    dataList:state.dataList
  };
}

function editHeadline(state, action) {
  const tempOpList = Array.from(state.opList);

  let story = {};
  if (action.payload.type === 'package') {
    const pkgStory = findPkgStory(tempOpList, action.payload.storyid);

    story = pkgStory.story;
  } else {
    const currentStoryIndex = tempOpList.findIndex(element => element.storyid === action.payload.storyid);
    story = tempOpList[currentStoryIndex];
  }
  const overrideIndex = (state.overrides).findIndex(element => element.storyId === action.payload.storyid);
  const newOverrides = Array.from(state.overrides);


  if (overrideIndex !== -1) {
      newOverrides[overrideIndex].headline = action.payload.newHeadline;
      if (!newOverrides[overrideIndex].originalHeadline) {
        newOverrides[overrideIndex].originalHeadline = story.headline;
      }
  } else {
    const newOverride = {
      storyId: action.payload.storyid,
      headline: action.payload.newHeadline,
      originalHeadline: story.headline
    };
    newOverrides.splice(0, 0, newOverride);
  }

  return {
    cmsData: state.cmsData,
    modules: [...state.modules],
    opList: [
      ...tempOpList,
    ],
    pinup: state.pinup,
    overrides: newOverrides,
    proState: state.proState,
    dataList:state.dataList
  };
}

function revertEditHeadline(state, action) {
  const tempOpList = Array.from(state.opList);

  if (action.payload.type === 'package') {
    const pkgStory = findPkgStory(tempOpList, action.payload.storyid);

    const story = (tempOpList[pkgStory.pkgIndex]).pkgStories[pkgStory.storyIndex];
    story.headline = story.originalHeadline;
    delete story.isOverride;
    (tempOpList[pkgStory.pkgIndex]).pkgStories[pkgStory.storyIndex] = story;

  } else {
    const currentStoryIndex = tempOpList.findIndex(element => element.storyid === action.payload.storyid);
    const story = tempOpList[currentStoryIndex];
    story.headline = story.originalHeadline;
    delete story.isOverride;

    tempOpList[currentStoryIndex] = story;
  }

  const overrideIndex = (state.overrides).findIndex(element => element.storyId === action.payload.storyid);
  const newOverrides = Array.from(state.overrides);
  newOverrides.splice(overrideIndex, 1);

  return {
    cmsData: state.cmsData,
    modules: [...state.modules],
    opList: [
      ...tempOpList,
    ],
    pinup: state.pinup,
    overrides: newOverrides,
    proState: state.proState,
    dataList:state.dataList
  };
}

function reOrder(storyList, reorderData) {
  if (reorderData.start.moduleType === 'storylist'
            && reorderData.end.moduleType === 'storylist') {
    return reOrderOPList(storyList,
                reorderData.start.storyid,
            reorderData.end.storyid);
  } else if (reorderData.start.moduleType === 'storylist'
            && reorderData.end.moduleType === 'package') {
    return moveSLtoPkg(storyList,
                    reorderData);
  } else if (reorderData.start.moduleType === 'package'
            && reorderData.end.moduleType === 'storylist') {
    return movePkgtoSL(storyList,
                    reorderData);
  } else if (reorderData.start.moduleType === 'package'
            && reorderData.end.moduleType === 'package') {
    return movePkgtoPkg(storyList,
                    reorderData);
  }
}

function reOrderOPList(storyList, startStoryid, endStoryid) {
  const startIndex = storyList.findIndex((item, i) => item.storyid === startStoryid);
  const endIndex = storyList.findIndex((item, i) => item.storyid === endStoryid);
  const result = Array.from(storyList);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  const res = {
    opList: result
  };
  return res;
}

function moveSLtoPkg(storyList, reorderData) {
  const startStoryid = reorderData.start.storyid;
  const startIndex = storyList.findIndex((item, i) => item.storyid === startStoryid);
  const result = Array.from(storyList);
  const [removed] = result.splice(startIndex, 1);

  const endPkgId = reorderData.end.pkgId;
  const endIndex = storyList.findIndex((item) => item.collectionId === endPkgId);

  const endPkg = storyList[endIndex];

  if (removed.isCollection === true) {
    if (!endPkg.pkgStories || endPkg.pkgStories.length === 0) {
      result[endIndex] = removed;
    } else {
      const pkgCur = result[endIndex];
      if (!pkgCur.storyid) {
        pkgCur.storyid = pkgCur.collectionId;
        pkgCur.headline = pkgCur.pkgStories[0].headline;
      }
      result.splice(endIndex, 0, removed);
    }
  } else {
    let endStIndex = (endPkg.pkgStories).findIndex((item, i) => item.storyid === reorderData.end.storyid);
    endStIndex = (endStIndex === -1 && endPkg.pkgStories) ? (endPkg.pkgStories).length : endStIndex;
    (endPkg.pkgStories).splice(endStIndex, 0, removed);
    result[endIndex] = endPkg;
  }

  const res = {
    opList: result
  };

  return res;
}

function movePkgtoSL(storyList, reorderData) {

  const startStoryid = reorderData.start.storyid;
  const endStoryid = reorderData.end.storyid;

  if (startStoryid.includes && startStoryid.includes('p_')) {
    const parts = startStoryid.split('_');
    const pkgId = parts[1];
    let pkgIndex = storyList.findIndex((item) => item.collectionId === pkgId
                                        || item.collectionId === parseInt(pkgId || 0, 10));

    const pkg = storyList[pkgIndex]
    if (pkg.pkgStories.length === 0) {
      const res = {
        opList: storyList
      };
      return res;
    }

    const endIndex = storyList.findIndex((item) => item.storyid === endStoryid);

    const result = Array.from(storyList);
    if (result[pkgIndex + 1] && result[pkgIndex + 1].isCollection !== true) {
      result.splice(pkgIndex, 0, {isCollection: true, pkgStories:[]});
      result[pkgIndex].collectionId = `Col-${pkgIndex}`;
      pkgIndex += 1;
    }

    const [removed] = result.splice(pkgIndex, 1);
    if (!removed.storyid) {
      removed.storyid = removed.collectionId;
      removed.headline = removed.pkgStories[0].headline;
    }
    result.splice(endIndex, 0, removed);


    const res = {
      opList: result
    };
    return res;
  }

  let fStory = {};
  storyList.forEach((story, colIndex) => {
    if (story.isCollection === true){
      (story.pkgStories).forEach((pStory, storyIndex) => {
        if (pStory.storyid === startStoryid){
          fStory = {pkgIndex: colIndex, storyIndex: storyIndex, story: pStory};
        }
      })
    }
  });

  const result = Array.from(storyList);
  const [removed] = (result[fStory.pkgIndex]).pkgStories.splice(fStory.storyIndex, 1);
  const endIndex = storyList.findIndex((item) => item.storyid === endStoryid);
  result.splice(endIndex, 0, removed);

  const res = {
    opList: result
  };
  return res;
}


function movePkgtoPkg(storyList, reorderData) {
  const startStoryid = reorderData.start.storyid;
  const endStoryid = reorderData.end.storyid;

  if (startStoryid.includes && startStoryid.includes('p_')) {
    const parts = startStoryid.split('_');
    const pkgId = parts[1];
    const startPkgIndex = storyList.findIndex((item) => item.collectionId === pkgId
                                || item.collectionId === parseInt(pkgId || 0, 10));

    const endPkgIndex = storyList.findIndex((item) => item.collectionId === reorderData.end.pkgId);
    const result = Array.from(storyList);
    const [removed] = result.splice(startPkgIndex, 1);
    result.splice(endPkgIndex, 0, removed);

    const res = {
      opList: result
    };
    return res;
  }

  let fStory = {};
  storyList.forEach((story, colIndex) => {
    if (story.isCollection === true){
      (story.pkgStories).forEach((pStory, storyIndex) => {
        if (pStory.storyid === startStoryid){
          fStory = {pkgIndex: colIndex, storyIndex: storyIndex, story: pStory};
        }
      })
    }
  });

  const startPkgIndex = fStory.pkgIndex;
  const endPkgIndex = storyList.findIndex((item) => item.collectionId === reorderData.end.pkgId);
  const startStoryIndex = (storyList[startPkgIndex].pkgStories).findIndex((item) => item.storyid === startStoryid);
  const endStoryIndex = (storyList[endPkgIndex].pkgStories).findIndex((item) => item.storyid === endStoryid);

  const result = Array.from(storyList);
  const [removed] = (result[startPkgIndex].pkgStories).splice(startStoryIndex, 1);
  (result[endPkgIndex].pkgStories).splice(endStoryIndex, 0, removed);

  const res = {
    opList: result,
  };
  return res;
}
