import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => {
  return { categories: [], parents: [] }
}


export const actions = {
  store({ dispatch, commit}, form) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/categories', form)
        .then((data) => {

        }).catch((error) => {
          return reject(error)
      })
    })
  },

  parents({ dispatch, commit }) {

  }

}
