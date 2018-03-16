/* eslint-disable import/prefer-default-export, consistent-return */
import {NotificationManager} from 'react-notifications';

export default class errHandler {
    static notification = (err) => {
        if(!err.response){
            NotificationManager.error(`Unkown Error`);
            return false;
        }
        switch(err.response.status){
            case 401:
                NotificationManager.error(`Authentication Error! 401`);
                break;
            case 403:
                NotificationManager.error(`Authentication Error! 403`);
                break;
            case 500:
                NotificationManager.error(`CMS Server Error! 500`);
                break;
            case 503:
                NotificationManager.error(`CMS Server Error! 503`);
                break;
            default:
                NotificationManager.error(`Unkown Error!`);
                break;
        }
    }
}
