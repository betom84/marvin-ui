import axios from 'axios';

const apiClient = axios.create({
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
   },
});

const state = {
   lines: [],
   canFetchMore: true,
   offset: 0,
   limit: 100,
   websocket: undefined,
};

const actions = {
   fetch({ state, commit }) {
      commit('CAN_FETCH_MORE', false);

      apiClient
         .get(`/api/log?limit=${state.limit}&offset=${state.offset}`)
         .then((response) => {
            let lines = response.data.lines.reverse();
            if (lines.length > 0) {
               commit('APPEND_LINES', lines);
               commit('CAN_FETCH_MORE', true);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   },

   listen({ state, commit }) {
      if (state.websocket != undefined) {
         state.websocket.close();
      }

      state.websocket = new WebSocket(`ws://${location.host}/api/log/socket`);
      state.websocket.onerror = (event) => {
         console.log('onerror:', event);
      };
      state.websocket.onopen = (event) => {
         console.log('onopen:', event);
      };
      state.websocket.onclose = (event) => {
         console.log('onclose:', event);
      };
      state.websocket.onmessage = (event) => {
         commit('INSERT_LINE', event.data);
      };
   },

   stopListen({ state }) {
      if (state.websocket != undefined) {
         state.websocket.close();
      }
   },
};

const mutations = {
   CAN_FETCH_MORE: (state, canFetchMore) => {
      state.canFetchMore = canFetchMore;
   },

   APPEND_LINES: (state, lines) => {
      state.lines = [...state.lines, ...lines];
      state.offset = state.lines.length;
   },

   INSERT_LINE: (state, line) => {
      state.lines = [line, ...state.lines];
      state.offset = state.lines.length;
   },
};

export default {
   namespaced: true,
   state,
   actions,
   mutations,
   getters: {},
   modules: {},
};
