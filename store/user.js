import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const actions = {
    register({dispatch, commit}, form) {
        return this.$axios.post('/users', form)
    }
}