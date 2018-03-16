
const isLogin = (state = false, action)=>{
    switch(action.type){
        case 'TOGGLE_LOGIN':
            return action.isLogin
        default:
            return state
    }
}

export default isLogin