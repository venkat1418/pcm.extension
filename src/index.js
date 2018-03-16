/* eslint-disable import/prefer-default-export */
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger'
import App from './App';
import './index.scss';
import './App.scss';
import ImageModule from './webcontent/comps/simpleComp';
import headImage from "./webcontent/images/header.png"
import marketImage from "./webcontent/images/market.png"
import advImage from "./webcontent/images/adv.png"
import H1Comp from './webcontent/comps/h1Comp';
import H2Comp from './webcontent/comps/h2Comp';
import {DataLoadService} from './services/DataLoadService';
import webStore from './webcontent/redux/appStore';
import reducer from './reducers';
import DataLoadHelper from './helper/DataLoadHelper';

ReactDOM.render(<ImageModule image={headImage} />, document.getElementById('header'));
ReactDOM.render(<ImageModule  image={marketImage} />, document.getElementById('market-banner'));
ReactDOM.render(<ImageModule  image={advImage} />, document.getElementById('ad-top-banner'));
ReactDOM.render(<H1Comp />, document.getElementById('hero-module'));
ReactDOM.render(<H2Comp />, document.getElementById('hero2-module'));
ReactDOM.render(<ImageModule  image={advImage} />, document.getElementById('ad-module'));


const divTag = document.createElement("div");
divTag.id = 'top-menu';
const bodyTag = document.getElementsByTagName("body")[0];
bodyTag.insertBefore(divTag, bodyTag.firstChild);

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? // eslint-disable-line
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ // eslint-disable-line
    }) : compose;

DataLoadService.getData(12345, 'homepage').then(
  resp=>{
    const stateData = DataLoadHelper.prepareData(resp.data.data);
    const store = createStore(reducer, stateData, composeEnhancers(applyMiddleware(logger)));
    if (resp.data.data.opList) webStore.dispatch({type: 'LOAD_DATA', data : resp.data.data.opList})
    ReactDOM.render(<App pcmStore={store} />, document.getElementById('top-menu'));
  }
);
