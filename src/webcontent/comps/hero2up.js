import React from 'react';
import store from '../redux/appStore.js';
import '../css/comps.scss';

class Hero2Up extends React.Component {

  getRows = (itemList) => {
    let rows = itemList.map( (row) => {
          return (
            <div id={row.storyid} >
                <div id={row.storyid} className="headline" story_id={row.storyid} draggable="true">
                        {row.headline}
                </div>
                <hr/>
            </div>
          );
    });
    return rows;
  };

  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  };
  render() {
    return (
          <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div className="iStyle">
                                <img src={store.getState().data.heroImage} alt="Hero" width="700" height="405"/>
                                  <div className="tStyle1">
                                    <div className="headline" >
                                      {store.getState().data.heroEyeBrow}
                                    </div>
                                    </div>
                                  <div className="tStyle2">
                                    <div className="headline" >
                                    {store.getState().data.heroHeadline}
                                  </div>
                                  </div>

                              </div>
                            </td>
                        <td>
                            <div className= "image">
                              <img src="images/hero1.png"/>
                            </div>
                            <hr/>
                            <div collection_id="cid1" id ="s123">
                              {this.getRows(store.getState().data.stories)}
                            </div>
                          </td>
                    </tr>
                </tbody>
            </table>
          </div>
    );
  }
};

export default Hero2Up;
