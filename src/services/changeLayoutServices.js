/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export class changeLayoutServices {

    static getLayoutData(zone){
      const { REACT_APP_PCM_API_BASE_URL } = process.env;
        return axios({
            method: 'get',
            url: `/moduleinfo?zone=${zone}`,
            baseURL: REACT_APP_PCM_API_BASE_URL
        })
    }

}
