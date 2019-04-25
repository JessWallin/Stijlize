const axios = require('axios');
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const SWTICH_ART = 'SWITCH_ART';

const switchArt = data => {
  return {
    type: SWTICH_ART,
    data,
  };
};

export const getArt = id => {
  return async dispatch => {
    const { data } = await axios.get('/api');
    dispatch(switchArt(data));
  };
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SWTICH_ART: {
      return action.data;
    }
    default:
      return state;
  }
};

const Store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default Store;
