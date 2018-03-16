import React from 'react';
import store from '../redux/appStore.js';
import '../css/homeDown.scss';
class H2Comp extends React.Component {

  getImages = (itemList) => {
    let rows = itemList.map( (row, index) => {
        return (
          <div key={index} id={'r_'+row.storyid}>
                <img src="images/stock.png" className="h2Img" alt=""/>
          </div>
        );
    });
    return rows;
  };

  getSpans = (itemList) => {
    let rows = itemList.map( (row, index) => {
        return (
          <div key={index} id={'r_'+row.storyid} className="h2MiddleStory">
            <div>
              <span className="storyHeadline">{row.headline}</span>
            </div>
            <div  className="storyFooter">
              <span className="storyFooterLeft">{row.author}</span><span className="storyFooterRight">{row.timeOfEntry}</span>
            </div>
          </div>
        );
    });
    return rows;
  };

  getTops = (itemList) => {
    let rows = itemList.map( (row, index) => {
        return (
          <div key={index} id={'r_'+row.storyid} className="h2RightStory">
            {row.headline}
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
        <div className="h2HomeScreen">
          <div className="h2Left">
            {this.getImages(store.getState().data.h2Left)}
          </div>
          <div className="h2Middle">
            {this.getSpans(store.getState().data.h2Left)}
          </div>
          <div className="h2Right">
            {this.getTops(store.getState().data.h2Right)}
          </div>
        </div>
    );
  }
};

export default H2Comp;
