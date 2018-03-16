
const defaultData = {
    pageId: 100727362,
    assetsId: 104848873,
    // assetsId: 104840000,
    cmsAuthToken: '',
}
const currentMetadata = (state = defaultData, action)=>{
    switch(action.type){
        case 'UPDATE_AUTH_TOKEN':
            return{
                ...state,
                cmsAuthToken: action.payload.newToken
            }
        default:
            return state
    }
}

export default currentMetadata;