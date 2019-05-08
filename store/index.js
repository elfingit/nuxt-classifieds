import Vue from 'vue'
import Vuex from 'vuex'
import cookieparser from 'cookieparser'

Vue.use(Vuex)

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      console.dir(parsed)
      if (parsed.token) {
        commit('auth/SET_TOKEN', parsed.token)
      }

    }
  }
}
