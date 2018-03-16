//import axios from 'axios';
const pino = require('pino')({
  name: 'PCM Web',
  level: process.env.LOG_LEVEL || 'debug',
  prettyPrint: process.env.NODE_ENV !== 'production',
  browser: {
    transmit: {
      send: function (level, logEvent) {
        if (logEvent.level.value >= 50 ||logEvent.level.value < 50) { // covers error and fatal
            // send the logEvent somewhere

        }
      }
    }
  }

});

// let getSrc = (level, logEvent) => {
//  let BASE_URL = 'http://localhost:8080/v1/logger';
//   return axios({
//      method: 'post',
//      url: '',
//      data: {"level":level,"message":logEvent},
//      baseURL: BASE_URL
//  });
// };

export default pino;
