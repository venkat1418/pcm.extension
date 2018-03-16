export default class DataLoadHelper {


  static prepareData = (data) => {
    const state = {
      data:
      {
        cmsData: data,
        modules : data.modules,
        opList: DataLoadHelper.getOpListAndPkgData(data.opList, data.modules),
        pkgList: [],
        overrides: [],
        pinup: data.pinups,
        noOfEmptyStories : 0,
        isPageDirty: false,
        proState: false,
        dataList: data.dataList
      }
    };
    return state;
  };

  static getOpListAndPkgData = (opList, modules) => {
    const newOpList = Object.assign([], opList);

    const moduleContent =  modules;
    let offset = 0;
    let pkgCount = 0;
    (moduleContent).forEach( (module)=>{
      if (module.source === 'self') {
        (module.blocks).forEach( (content)=>{
          if (content.type === 'package') {
            if (opList[offset].isCollection === true){
              offset+=1;
              newOpList[offset + pkgCount].offset = offset + pkgCount
            } else {
              newOpList.splice(offset + pkgCount, 0, {isCollection: true, pkgStories:[]});
              newOpList[offset + pkgCount].collectionId = `Col-${offset + pkgCount}`;
              pkgCount+=1;
            }
          } else {
            offset += content.noOfStories;
          }
        });
      }
    });
    return newOpList;
  }

  static cleanAndgetOpListAndPkgData(opList, modules) {
    const newOpList = [];
    opList.forEach((item) => {
      if (item.isCollection === true &&
        item.collectionId.includes && item.collectionId.includes('Col-') &&
        item.pkgStories.length === 0) {
          ;
      } else {
        newOpList.push(item);
      }
    });

    return DataLoadHelper.getOpListAndPkgData(newOpList, modules);
  }
}
