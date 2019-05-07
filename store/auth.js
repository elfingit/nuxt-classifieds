import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//require('whatwg-fetch')

  export const state = () => {
    return { authUser: null }
  }

  export const mutations = {
    SET_USER: (state, user) => {
      state.authUser = user
    }
  }

  export const actions = {
    login({dispatch, commit}, form) {
      return this.$axios.post('/auth', form)
    }
  }
