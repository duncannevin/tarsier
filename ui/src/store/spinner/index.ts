import {Module} from 'vuex'
import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'
import {SpinnerState} from './types'
import {RootState} from '../types'

export const state: SpinnerState = {
  showing: false
}

const namespaced: boolean = true

export const spinnerState: Module<SpinnerState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
