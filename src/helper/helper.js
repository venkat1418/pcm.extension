export class DNDHelper {

    static reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    static getItemStyle = (isDragging, draggableStyle) => ({
        background: isDragging ? 'white' : '#f0f0f0',
        ...draggableStyle,
    });

    static getListStyle = isDraggingOver => ({
        background: isDraggingOver ? '#CCCCCC' : '#f0f0f0',
    });

    static getEndStoryid = (result, data) => {
      const destination = result.destination;
      let storyIndex = destination.index;
      const moduleInfo = destination.droppableId;
      let parts = moduleInfo.split('_');
      const destModuleName = parts[0];
      const destBlockIndex = parts[1];
      const destType = parts[2];
      const destModuleIndex = parts[3];

      parts = result.source.droppableId.split('_');
      const sourceModuleName = parts[0];
      const sourceBlockIndex = parts[1];
      const sourceType = parts[2];
      // let sourceModuleIndex = parts[3];

      const module = data[destModuleIndex];
      if (!module) return null;
      const section = module.blocks[destBlockIndex];
      if (section.data && section.data.length <= storyIndex) return null;

      if (section.pinup) {
        (section.pinup).forEach((pin) => {
          if (pin.position < storyIndex) storyIndex+=1;
        })
      }

      // const sM = data[destModuleIndex];
      let pkg = '';
      let storyId = section.data[storyIndex].storyid;
      pkg = section.data[storyIndex].pkgId;
      if (storyId === 'EM_pinup' ) {
        if (section.data[storyIndex + 1]){
          storyId = section.data[storyIndex + 1].storyid;
          pkg = section.data[storyIndex + 1].pkgId;
        }
        else{
            return null;
        }
      }
      return {
          start :{
            storyid: result.draggableId,
            module: sourceModuleName,
            moduleType: sourceType,
            blockIndex: sourceBlockIndex
          },
          end :{
            storyid: storyId,
            module:destModuleName,
            moduleType:destType,
            blockIndex: destBlockIndex,
            pkgId: pkg
          }
       };
    }
}

export class UserDataHelper{
    static hasEditRole(userData){
        if(!userData.roles) return false;
        return userData.roles.includes('admin')
    }
}
