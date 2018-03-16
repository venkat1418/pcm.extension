/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export class DataLoadService {
    static getData(nid, template){
      const { REACT_APP_PCM_API_BASE_URL } = process.env;
        return axios({
            method: 'get',
            url: `/config/leftmenu?nid=${nid}&template=${template}`,
            baseURL: REACT_APP_PCM_API_BASE_URL
        })
    }
}
