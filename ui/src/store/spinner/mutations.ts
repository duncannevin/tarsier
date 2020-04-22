import {MutationTree} from 'vuex'
import {SpinnerState} from '@/store/spinner/types'

export const mutations: MutationTree<SpinnerState> = {
  show(state) {
    state.showing = true
  },
  hide(state) {
    state.showing = false
  }
}
