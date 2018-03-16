
const isEditRole = (state = false, action)=>{
    switch(action.type){
        case 'TOGGLE_EDIT_ROLE':
            return action.isEditRole
        default:
            return state
    }
}

export default isEditRole