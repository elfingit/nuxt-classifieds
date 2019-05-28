import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => {
  return { users: [] }
}

export const getters = {
  USERS: state => {
    return state.users
  }
}

export const mutations = {
  addList(state, payload) {
    state.users = payload
  },
}

export const actions = {
  register({dispatch, commit}, form) {
    return this.$axios.post('/users', form)
  },

  list({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get('users')
        .then((response) => {
          commit('addList', response.data)
        }).catch((err) => {
          return reject(err)
      })
    })
  }

}
