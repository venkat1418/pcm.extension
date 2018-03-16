/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export class ChangeModuleSourceService {

    static searchSource(sId){
      const { REACT_APP_PCM_API_BASE_URL } = process.env;
        return axios({
            method: 'get',
            url: `/search/section?nodeId=100746233&query=${sId}`,
            baseURL: REACT_APP_PCM_API_BASE_URL
        })
    }

    static getSourceData(nid){
      const { REACT_APP_PCM_API_BASE_URL } = process.env;

      return  axios({
            method: 'get',
            url: `/capi?nid=${nid}`,
            baseURL: REACT_APP_PCM_API_BASE_URL
        });
    }
}
