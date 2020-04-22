import {Module} from 'vuex'
import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'
import {TodoState} from './types'
import {RootState} from '../types'

export const state: TodoState = {
  todos: []
}

const namespaced: boolean = true

export const todoState: Module<TodoState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
