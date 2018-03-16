
const userData = (state = {}, action)=>{
    switch(action.type){
        case 'UPDATE_USER_DATA':
            return action.userData
        default:
            return state
    }
}

export default userData