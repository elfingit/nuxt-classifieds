import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export const state = () => {
  return { categories: [] }
}

export const getters = {
  CATS: state => {
    return state.categories
  }
}

export const mutations = {

  add(state, payload) {
    state.categories.push(payload)
  },

  addList(state, payload) {
    state.categories = payload
  }

}

export const actions = {
  store({ dispatch, commit}, form) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/categories', form)
        .then((response) => {
          commit('add', response.data)
          return resolve(response)
        }).catch((error) => {
          return reject(error)
      })
    })
  },

  list({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/categories')
        .then((response) => {
          commit('addList', response.data)
        }).catch((error) => {
        return reject(error)
      })
    })
  }

}
