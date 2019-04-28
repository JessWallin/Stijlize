const axios = require('axios');
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { load } from '@amcharts/amcharts4/.internal/core/utils/Net';

const SWTICH_ART = 'SWITCH_ART';
const SWITCH_LIST = 'SWITCH_LIST';
const SET_LOADING = 'SET_LOADING';

const initialState = {
  selected: {},
  currentList: [{ id: 0 }],
  loading: true,
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

const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const getList = keyword => {
  return async dispatch => {
    dispatch(setLoading());
    const { data } = await axios.post('/api/keyword', { keyword: keyword });
    dispatch(switchList(data));
  };
};

export const getArt = (id = 228650) => {
  return async dispatch => {
    dispatch(setLoading);
    const { data } = await axios.post('/api', { id: id });
    dispatch(switchArt(data));
  };
};

export const getByColor = color => {
  return async dispatch => {
    dispatch(setLoading);
    const { data } = await axios.post('/api/color', { color: color });
    dispatch(switchList(data));
  };
};

export const getByArtist = artist => {
  return async dispatch => {
    dispatch(setLoading);
    const { data } = await axios.post('/api/person', { person: artist });
    dispatch(switchList(data));
  };
};

export const getByDate = date => {
  return async dispatch => {
    dispatch(setLoading);
    const { data } = await axios.post('/api/year', { year: date });
    dispatch(switchList(data));
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SWTICH_ART: {
      return { ...state, selected: action.data, loading: false };
    }
    case SWITCH_LIST: {
      return { ...state, currentList: action.data, loading: false };
    }

    case SET_LOADING: {
      return { ...state, loading: true };
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
