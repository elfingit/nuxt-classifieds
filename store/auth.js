import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//require('whatwg-fetch')

export const state = () => {
  return { authToken: null }
}

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.authToken = token
  }
}

export const actions = {
  login({ dispatch, commit }, form) {
    return this.$axios.post('/auth', form)
  }
}
