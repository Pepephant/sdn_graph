import Vuex from 'vuex'
export default new Vuex.Store({
    state: {
      time: 0
    },
    mutations: {
      INCREMENT_TIME(state) {
        state.time++;
        // console.log(state.time);
      }
    },
    actions: {
      startTimer({ commit }) {
        setInterval(() => {
          commit('INCREMENT_TIME')
        }, 1000)
      }
    }
})