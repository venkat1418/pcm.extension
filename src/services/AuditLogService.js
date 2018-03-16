/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export class AuditLogService {

    static logAuditLog(data){
      const { REACT_APP_PCM_API_BASE_URL } = process.env;
        return axios({
            method: 'post',
            url: '/auditlog',
            data,
            baseURL: REACT_APP_PCM_API_BASE_URL
        })
    }
}
