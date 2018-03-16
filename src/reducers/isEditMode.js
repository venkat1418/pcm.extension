import {NotificationManager} from 'react-notifications';
import messages from '../messages/notification';

const isEditMode = (state = false, action)=>{
    switch(action.type){
        case 'TOGGLE_EDIT_MODE':
            if(action.isEditMode){
                NotificationManager.success(messages.editButtonMsg_lock);
            }
            else{
                // NotificationManager.success('Successfully entered view mode and page unlocked');
            }
            return action.isEditMode
        default:
            return state
    }
}

export default isEditMode
