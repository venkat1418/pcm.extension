/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export class AssetsStatusService {

    static check(cmsAuthToken, assetId, userData, pageId){
      const { REACT_APP_PCM_API_BASE_URL } = process.env;
        const lockData = {
            lock: {
                status: null,
                lockedBy: {
                    name: userData.name,
                    email: userData.email
                },
            }
        }
        return axios({
            method: 'post',
            url: '/userlock/check',
            data: {
              'cmsAuthToken':cmsAuthToken,
              'assetId':assetId, 'userId':userData.uid,
              'pageId':pageId, 'lockData':lockData
            },
            baseURL: REACT_APP_PCM_API_BASE_URL
        })
    }

    static unlockThenLock(cmsAuthToken, assetId, userData, pageId){
      const { REACT_APP_PCM_API_BASE_URL } = process.env;
        const lockData = {
            lock: {
                status: null,
                lockedBy: {
                    name: userData.name,
                    email: userData.email
                },
            }
        }

        return axios({
            method: 'post',
            url: '/userlock/lock',
            data: {
              'cmsAuthToken':cmsAuthToken, 'assetId':assetId,
              'userId':userData.uid, 'pageId':pageId, 'lockData':lockData
            },
            baseURL: REACT_APP_PCM_API_BASE_URL
        })
    }

    static removeLock(cmsAuthToken, assetId, userId){
      const { REACT_APP_PCM_API_BASE_URL } = process.env;
        return axios({
            method: 'post',
            url: '/userlock/unlock',
            data: {'cmsAuthToken': cmsAuthToken, 'assetId':assetId, 'userId':userId},
            baseURL: REACT_APP_PCM_API_BASE_URL
        })
    }

}
