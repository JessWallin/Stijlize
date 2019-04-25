const axios = require('axios');
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const SWTICH_ART = 'SWITCH_ART';
const SWITCH_LIST = 'SWITCH_LIST';

const initialState = {
  selected: {},
  currentList: {},
  query: '',
};

const switchArt = data => {
  return {
    type: SWTICH_ART,
    data,
  };
};

const switchList = data => {
  return {
    type: SWITCH_LIST,
    data,
  };
};

export const getArt = id => {
  return async dispatch => {
    console.log('**ID**', id);
    const { data } = await axios.post('/api', { id: id });
    dispatch(switchArt(data));
  };
};

export const getList = keyword => {
  return async dispatch => {
    const { data } = await axios.post('/api/keyword', { keyword: keyword });
    dispatch(switchList(data));
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SWTICH_ART: {
      return { ...state, selected: action.data };
    }
    case SWITCH_LIST: {
      return { ...state, list: action.data };
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
