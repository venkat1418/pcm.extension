import { connect } from 'react-redux'
import LeftPanel from '../../components/LeftPanel'

let noOfEmptyStories = 0;
let noOfSTAdPositions = 0;

const appendEmpty = (source, toLength, bIndex, headline, moduleSource) => {
  const fullArray = source;
  const noToAdd = toLength - source.length;
  if (moduleSource === 'self')
    noOfEmptyStories+= noToAdd;

  for(let i=0; i<noToAdd; i+=1) {
    const sId = `EM_${ i  }_${  bIndex}`;
    fullArray.push({storyid: sId, headline, isEmpty: true});
  }

  return fullArray;
}

const getPkgData = (opList, offset, noOfStories, index, moduleSource) => {


  const curStory = opList[offset] || {};
  const res = {pkgStories: [], offset: 0};
  let data = [];

  if (curStory.isCollection === true && curStory.pkgStories.length > 0) {
    data = [...curStory.pkgStories];
    data[0].eyebrow = curStory.eyebrow;
  }
   res.offset = 1;
   res.pkgStories = (data.length < noOfStories) ?
                                appendEmpty(data, noOfStories, index, 'AddStory', moduleSource) :
                                  data.slice(0, noOfStories);
  data[0].collectionId = curStory.collectionId;
    (res.pkgStories).forEach((story) => {
      story.pkgId = curStory.collectionId;
    });
  return res;
}

const getOpListData = (opList, offset, noOfStories, index, moduleSource) => {
  let opStories = [];
  opStories = (opList.length < (offset + noOfStories)) ?
                                appendEmpty(opList.slice(offset), noOfStories, index, 'AddStory', moduleSource) :
                                  opList.slice(offset, offset + noOfStories);
  return opStories;
}


const applyPinUps = (data, pinups, source) => {
  const appliedList = Array.from(data);
    let noOfPinUps = 0;
  // eslint-disable-next-line
  pinups.map((pinup, index) => {
    const position = Number(pinup.position);

    if (pinup.type === 'sharethrough' && source === 'self' && noOfSTAdPositions < 2) {
      const sharethrough = {
        storyid: 'EM_pinup',
        headline: "Sharethrough Ad Position",
        type: "pinup"
      };
      appliedList.splice(position, 0, sharethrough);
      appliedList.splice((appliedList.length -1), 1);
      noOfPinUps+=1;
      noOfSTAdPositions+=1;
    }
  });

  const res = {
    noOfPinUps,
    data: appliedList
  };
  return res;
}
let noOfPinUps = 0;
const applyStoryPinUps = (data, pinups, moduleId) => {
  const appliedList = Array.from(data);
  appliedList.forEach((row) => {
    delete row.isPinned;
    delete row.pinModule;
  });

  pinups.forEach((pinup) => {
    if (pinup.moduleId === moduleId) {

      const index = appliedList.findIndex((element)=>element.storyid === pinup.storyid)

      if (index !== -1) {
        const [removed] = appliedList.splice(index, 1);
        removed.isPinned = true;
        removed.pinModule = moduleId;
        appliedList.splice(pinup.position, 0, removed);
        noOfPinUps += 1;
      }
    }
  });
  return appliedList;
}

const applyOverride = (opList, overrides) => {
    if (!opList) return [];
    const dataWithOverrides = Array.from(opList);
    if (!overrides) return dataWithOverrides;
    // eslint-disable-next-line
    (overrides).map((datum, index) => {
        const sId = datum.storyId;
        const startIndex = dataWithOverrides.findIndex((item) => item.storyid === sId);
        if (startIndex !== -1) {
          dataWithOverrides[startIndex].originalHeadline =
            datum.originalHeadline;
          dataWithOverrides[startIndex].headline = datum.headline;
          dataWithOverrides[startIndex].isOverride = true;
        }
    });
    return dataWithOverrides;
}

const getModulesData = (data, ownProps, proState) => {

  noOfEmptyStories = 0;
  noOfSTAdPositions = 0;
  const moduleContent =  data.modules;
  let opList = data.opList;
  opList = applyOverride(opList, data.overrides);
  let offset = 0;

  (moduleContent).forEach( (module)=>{
    (module.blocks).forEach( (content, index)=>{
      if (module.proUser === true && !proState) {
        content.data = [];
        module.display = false;
        return;
      }
      module.display = true;
      // if (module.proUser === true && proState) {
      //   content.data = appendEmpty([], content.noOfStories, index, 'AddVideo');
      //   return;
      // }
      if (module.source !== 'self') {
        const dataSet = (data.dataList).find((element) => element && element.source === module.source) || {};
        content.data = getOpListData((dataSet.data || []), 0, content.noOfStories, index, module.source);
        return;
      }
      if (content.type === 'package' ) {
        const res = getPkgData(opList, offset, content.noOfStories, index, module.source);
        offset++;
        content.data = applyOverride(res.pkgStories, data.overrides);
      } else {
        content.data = getOpListData(opList, offset, content.noOfStories, index, module.source);
        if (data.pinup) {
          content.data = applyStoryPinUps(content.data, data.pinup, module.moduleId);
        }
        let noOfPinups = 0;
        if (content.pinup) {
          const res = applyPinUps(content.data, content.pinup, module.source);
          noOfPinups = res.noOfPinUps;
          content.data = res.data;
        }

        offset += content.noOfStories - noOfPinups;
      }
    });
  });
  ownProps.setMsg(noOfEmptyStories);

  return moduleContent;
}

const mapStateToProps = (state, ownProps) => ({
    data: getModulesData(state.data, ownProps, state.data.proState)
  })

const mapDispatchToProps = dispatch => ({
    onReorder: (reorderData) => {
      dispatch({type: 'REORDER', reorderData})
    }
  })

const LeftPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftPanel)

export default LeftPanelContainer
