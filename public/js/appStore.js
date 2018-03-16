import { createStore } from 'redux';

function reducer(state, action) {
  if (action.type === 'ENABLE_PRO') {
    return {
      pro: true
    };
  } else if (action.type === 'DISABLE_PRO') {
    return {
      pro: true
    };
  } else {
    return state;
  }
}

const initialState = { pro: false };

const store = createStore(reducer, initialState);

exports = {
  reducer,
  store,
  initialState
};
