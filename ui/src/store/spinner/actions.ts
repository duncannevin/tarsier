import {ActionTree} from 'vuex'
import {RootState} from '@/store/types'
import {SpinnerState} from '@/store/spinner/types'

export const actions: ActionTree<SpinnerState, RootState> = {
  show({commit}): any {
    commit('show')
  },
  hide({commit}): any {
    commit('hide')
  }
}
