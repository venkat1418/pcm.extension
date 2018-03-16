/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export class GetUserDataService {

    static getUser(cookie){
      const { REACT_APP_PCM_API_BASE_URL } = process.env;
        return axios({
            method: 'post',
            url: '/user',
            data: {'sid': cookie},
            baseURL: REACT_APP_PCM_API_BASE_URL
        });
    }
}
