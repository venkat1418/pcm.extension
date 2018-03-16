import React from 'react';
import store from '../redux/appStore.js';
import '../css/home.scss';
class H1Comp extends React.Component {

  getRows = (itemList) => {
    // eslint-disable-next-line
    let rows = itemList.map( (row, index) => {
      if(index !== 0) {
          return (
            <div key={index} id={'r_'+row.storyid} className="heroDiv">
              {row.headline}
            </div>
          );
      }
    });
    return rows;
  };

  getTops = (itemList) => {
    let rows = itemList.map( (row, index) => {
        return (
          <div key={index} id={'r_'+row.storyid} className="TopDiv">
            <a href="http://google.com"> {row.headline} </a>
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
          <div className="homeScreenLeft">
            <img src={store.getState().data.heroImage2} className="hero" alt="Hero" width="100%" height="405" />
            <div className="heroText1">
              <div className= "headline" >
                <span>APPLE STOCK</span>
              </div>
              </div>
            <div className="heroText2">
              <div id={'r_'+store.getState().data.leftHero[0].storyid} className="headline" >
                {store.getState().data.leftHero[0].headline}
              </div>
            </div>
            <div className="heroStoryOverlay">
              {this.getRows(store.getState().data.leftHero)}
            </div>
          </div>
          <div className="homeScreenRight">
            <span className="topHeaderSpan">TOP STORIES</span>
            {this.getTops(store.getState().data.leftTop)}
          </div>
        </div>
    );
  }
};

export default H1Comp;
