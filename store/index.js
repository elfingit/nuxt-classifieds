import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    console.dir(req.session.authUser)
    if (req.session && req.session.authUser) {
      commit('auth/SET_USER', req.session.authUser)
    }
  }
}
