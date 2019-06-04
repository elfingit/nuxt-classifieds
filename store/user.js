import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => {
  return { users: [], roles: [] }
}

export const getters = {
  USERS: state => {
    return state.users
  },

  ROLES: state => {
    return state.roles
  }
}

export const mutations = {
  addList(state, payload) {
    state.users = payload
  },

  addRoles(state, payload) {
    state.roles = payload
  }
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
          return resolve()
        }).catch((err) => {
          return reject(err)
      })
    })
  },

  rolesList({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get('user_roles')
        .then((response) => {
          commit('addRoles', response.data)
          return resolve()
        }).catch((err) => {
          return reject(err)
      })
    })
  }

}
