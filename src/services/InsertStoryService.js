/* eslint-disable import/prefer-default-export */

import axios from 'axios';

export class InsertStoryService {
    static SearchStory(query, isCollection){
      const { REACT_APP_PCM_API_BASE_URL } = process.env;
      if (isCollection) {
        return axios({
            method: 'get',
            url: `/search/collection?query=${query}`,
            baseURL: REACT_APP_PCM_API_BASE_URL
        })
      }
      return axios({
          method: 'get',
          url: `/search/story?query=${query}`,
          baseURL: REACT_APP_PCM_API_BASE_URL
      })

    }

    static UpdateStory(data, type) {
        const { REACT_APP_PCM_API_BASE_URL } = process.env;
        // let data1 = {
        //   id: "100746233",
        //   story: [data],
        //   updatedby: "100000902",
        //   relationid: 1,
        //   cookie:"l524c665f4872f1rticl76fhj1",
        //   type: "cnbcnewsstory"
        // }
        return axios({
            method: 'post',
            url: `/cms?action=${type}`,
            data,
            baseURL: REACT_APP_PCM_API_BASE_URL
        })
    }
}
