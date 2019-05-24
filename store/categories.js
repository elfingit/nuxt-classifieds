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

    payload.children = payload.children || []

    let index = _.findIndex(state.categories, { id: payload.id })

    if (index > -1) {
      payload.children = state.categories[index].children || []
      state.categories.splice(index, 1, payload)
    }

    if (payload.parent_id) {

      new Promise((resolve, reject) => {
        state.categories = _.forEach(state.categories, (value) => {
          if (value.id == payload.parent_id) {
            value.children.push(payload)
          }
        })

        return resolve()
      })

      new Promise((resolve, reject) => {
        state.categories = _.forEach(state.categories, (value) => {

          let childIndex = _.findIndex(value.children, { id: payload.id })

          if (childIndex > -1) {
            if (value.children[childIndex].parent_id != payload.parent_id) {
              value.children.splice(childIndex, 1)
            }
          }
        })
      })

    } else {
      state.categories.push(payload)
    }
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
