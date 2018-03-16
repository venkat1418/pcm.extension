/* eslint-disable import/prefer-default-export */

import axios from 'axios';

export class PageStatusService {

    static getStatus(nid){
      const { REACT_APP_PCM_API_BASE_URL } = process.env;
        return axios({
            method: 'get',
            url: `/pagestatus/${nid}`,
            baseURL: REACT_APP_PCM_API_BASE_URL
        })
    }

    static lockPage(nid, userData){
        const { REACT_APP_PCM_API_BASE_URL } = process.env;
        const data = {
            lock: {
                status: true,
                lockedBy: {
                    name: userData.name,
                    email: userData.email
                },
                lockedAt: new Date().getTime()
            }
        }
        return axios({
            method: 'post',
            url: `/pagestatus/${nid}`,
            data,
            baseURL: REACT_APP_PCM_API_BASE_URL
        })
    }

    static unlockPage(nid, userData){
      const { REACT_APP_PCM_API_BASE_URL } = process.env;
        const data = {
            lock: {
                status: false,
                unlockedBy: {
                    name: userData.name,
                    email: userData.email
                },
                unlockedAt: new Date().getTime()
            }
        }
        return axios({
            method: 'post',
            url: `/pagestatus/${nid}`,
            data,
            baseURL: REACT_APP_PCM_API_BASE_URL
        })
    }
}
