const axios = require('axios');
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const SWTICH_ART = 'SWITCH_ART';
const SWITCH_LIST = 'SWITCH_LIST';
const SET_DAILY = 'SET_DAILY';

const initialState = {
  selected: {},
  currentList: [],
  query: '',
  today: {},
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

const setDaily = data => {
  return {
    type: SET_DAILY,
    data,
  };
};

export const getList = keyword => {
  return async dispatch => {
    const { data } = await axios.post('/api/keyword', { keyword: keyword });
    dispatch(switchList(data));
  };
};

export const getArt = (id = 228650) => {
  return async dispatch => {
    const { data } = await axios.post('/api', { id: id });
    dispatch(switchArt(data));
  };
};

export const getByColor = color => {
  return async dispatch => {
    const { data } = await axios.post('/api/color', { color: color });
    dispatch(switchList(data));
  };
};

export const getByArtist = artist => {
  return async dispatch => {
    const { data } = await axios.post('/api/person', { person: artist });
    dispatch(switchList(data));
  };
};

export const getByDate = date => {
  return async dispatch => {
    const { data } = await axios.post('/api/year', { year: date });
    dispatch(switchList(data));
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SWTICH_ART: {
      return { ...state, selected: action.data };
    }
    case SWITCH_LIST: {
      return { ...state, currentList: action.data };
    }
    case SET_DAILY: {
      return { ...state, today: action.data };
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
