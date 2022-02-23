import * as types from './mutations-types';
import { setStore } from '@/util/storage';
import { encode } from 'js-base64';

const mutations = {
  [types.SET_USER](state, payload) {
    state = payload;
    setStore('admin', encode(JSON.stringify(payload)));
  }
};

export default mutations;
